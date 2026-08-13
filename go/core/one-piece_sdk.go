package core

import (
	"fmt"
	"strings"

	vs "github.com/voxgig-sdk/one-piece-sdk/go/utility/struct"
)

type OnePieceSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewOnePieceSDK(options map[string]any) *OnePieceSDK {
	sdk := &OnePieceSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features in the resolved order (MakeOptions puts an explicit array
	// order first, else defaults to test-first). Ordering matters: the `test`
	// feature installs the base mock transport and the transport features
	// (retry/cache/netsim/proxy/ratelimit) wrap whatever is current, so `test`
	// must be added before them to sit at the base of the chain.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		if fo, ok := vs.GetPath([]any{"__derived__", "featureorder"}, sdk.options).([]any); ok {
			for _, n := range fo {
				fname, _ := n.(string)
				fopts := ToMapAny(featureOpts[fname])
				if fopts != nil {
					if active, ok := fopts["active"]; ok {
						if ab, ok := active.(bool); ok && ab {
							sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
						}
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *OnePieceSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *OnePieceSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *OnePieceSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *OnePieceSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

// Raw endpoint access is operator-controllable, like every entity op.
// Blocking it means denying BOTH the 'direct' and 'graphql' tokens, since
// either one reaches the same endpoint.
func (sdk *OnePieceSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	if !sdk.opAllowed("direct") {
		return sdk.opDenied("direct"), nil
	}

	return sdk.rawRequest(fetchargs)
}

// Is this raw-access op permitted by the SDK's allow.op option?
func (sdk *OnePieceSDK) opAllowed(op string) bool {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return strings.Contains(allowOp, op)
}

func (sdk *OnePieceSDK) opDenied(op string) map[string]any {
	allowOp, _ := vs.GetPath([]any{"allow", "op"}, sdk.options).(string)
	return map[string]any{
		"ok": false,
		"err": fmt.Errorf("OnePieceSDK: %s: operation not allowed by"+
			" SDK option allow.op value: \"%s\"", op, allowOp),
	}
}

// Ungated request path shared by Direct and Graphql, each of which checks
// its own allow.op token first. Unexported, rather than a flag on fetchargs:
// a caller-supplied marker would let anyone opt straight back out of the
// gate by passing it.
func (sdk *OnePieceSDK) rawRequest(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}

// Raw GraphQL access: the pressure valve that makes the generated surface's
// deliberate omissions (per-call selection sets, typed filter builders,
// batching, subscriptions) livable — the whole schema stays reachable.
//
// Thin wrapper over the same prepare/fetch path Direct uses, with the one
// thing raw Direct cannot do for GraphQL: a GraphQL failure rides HTTP 200
// as a top-level `errors` array, so status alone would report a failed query
// as ok.
//
// NOTE: like Direct, this bypasses the feature pipeline — no retry,
// ratelimit or paging features apply.
func (sdk *OnePieceSDK) Graphql(
	query string, variables map[string]any, ctrl map[string]any,
) (map[string]any, error) {
	if !sdk.opAllowed("graphql") {
		return sdk.opDenied("graphql"), nil
	}

	if variables == nil {
		variables = map[string]any{}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	res, err := sdk.rawRequest(map[string]any{
		"method":  "POST",
		"headers": map[string]any{"content-type": "application/json"},
		"body":    map[string]any{"query": query, "variables": variables},
		"ctrl":    ctrl,
	})

	if err != nil {
		return res, err
	}

	// Errors are read BEFORE any status check: a GraphQL parse or validation
	// failure comes back as HTTP 400 carrying the standard { errors: [...] }
	// body, and the raw path represents a non-2xx as ok:false with no err —
	// so returning early on status would discard the server's own
	// diagnostics, which are the only useful part of that response.
	errors, _ := vs.GetPath([]any{"data", "errors"}, res).([]any)

	if 0 < len(errors) {
		msg, _ := vs.GetProp(errors[0], "message").(string)
		if msg == "" {
			msg = "graphql error"
		}
		res["ok"] = false
		res["err"] = fmt.Errorf("OnePieceSDK: graphql: %s", msg)
		res["graphql"] = errors
	}

	return res, nil
}


// Boat returns a Boat entity bound to this client.
// Idiomatic usage: client.Boat(nil).List(nil, nil) or
// client.Boat(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Boat(data map[string]any) OnePieceEntity {
	return NewBoatEntityFunc(sdk, data)
}


// Bow returns a Bow entity bound to this client.
// Idiomatic usage: client.Bow(nil).List(nil, nil) or
// client.Bow(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Bow(data map[string]any) OnePieceEntity {
	return NewBowEntityFunc(sdk, data)
}


// Chapter returns a Chapter entity bound to this client.
// Idiomatic usage: client.Chapter(nil).List(nil, nil) or
// client.Chapter(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Chapter(data map[string]any) OnePieceEntity {
	return NewChapterEntityFunc(sdk, data)
}


// Character returns a Character entity bound to this client.
// Idiomatic usage: client.Character(nil).List(nil, nil) or
// client.Character(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Character(data map[string]any) OnePieceEntity {
	return NewCharacterEntityFunc(sdk, data)
}


// Crew returns a Crew entity bound to this client.
// Idiomatic usage: client.Crew(nil).List(nil, nil) or
// client.Crew(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Crew(data map[string]any) OnePieceEntity {
	return NewCrewEntityFunc(sdk, data)
}


// Dial returns a Dial entity bound to this client.
// Idiomatic usage: client.Dial(nil).List(nil, nil) or
// client.Dial(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Dial(data map[string]any) OnePieceEntity {
	return NewDialEntityFunc(sdk, data)
}


// Episode returns a Episode entity bound to this client.
// Idiomatic usage: client.Episode(nil).List(nil, nil) or
// client.Episode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Episode(data map[string]any) OnePieceEntity {
	return NewEpisodeEntityFunc(sdk, data)
}


// Film returns a Film entity bound to this client.
// Idiomatic usage: client.Film(nil).List(nil, nil) or
// client.Film(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Film(data map[string]any) OnePieceEntity {
	return NewFilmEntityFunc(sdk, data)
}


// Fruit returns a Fruit entity bound to this client.
// Idiomatic usage: client.Fruit(nil).List(nil, nil) or
// client.Fruit(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Fruit(data map[string]any) OnePieceEntity {
	return NewFruitEntityFunc(sdk, data)
}


// Gear returns a Gear entity bound to this client.
// Idiomatic usage: client.Gear(nil).List(nil, nil) or
// client.Gear(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Gear(data map[string]any) OnePieceEntity {
	return NewGearEntityFunc(sdk, data)
}


// Haki returns a Haki entity bound to this client.
// Idiomatic usage: client.Haki(nil).List(nil, nil) or
// client.Haki(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Haki(data map[string]any) OnePieceEntity {
	return NewHakiEntityFunc(sdk, data)
}


// Location returns a Location entity bound to this client.
// Idiomatic usage: client.Location(nil).List(nil, nil) or
// client.Location(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Location(data map[string]any) OnePieceEntity {
	return NewLocationEntityFunc(sdk, data)
}


// Saga returns a Saga entity bound to this client.
// Idiomatic usage: client.Saga(nil).List(nil, nil) or
// client.Saga(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Saga(data map[string]any) OnePieceEntity {
	return NewSagaEntityFunc(sdk, data)
}


// Sword returns a Sword entity bound to this client.
// Idiomatic usage: client.Sword(nil).List(nil, nil) or
// client.Sword(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Sword(data map[string]any) OnePieceEntity {
	return NewSwordEntityFunc(sdk, data)
}


// Technique returns a Technique entity bound to this client.
// Idiomatic usage: client.Technique(nil).List(nil, nil) or
// client.Technique(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Technique(data map[string]any) OnePieceEntity {
	return NewTechniqueEntityFunc(sdk, data)
}


// Volume returns a Volume entity bound to this client.
// Idiomatic usage: client.Volume(nil).List(nil, nil) or
// client.Volume(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *OnePieceSDK) Volume(data map[string]any) OnePieceEntity {
	return NewVolumeEntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *OnePieceSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewOnePieceSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
