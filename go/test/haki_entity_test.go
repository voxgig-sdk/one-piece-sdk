package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/one-piece-sdk"
	"github.com/voxgig-sdk/one-piece-sdk/core"

	vs "github.com/voxgig/struct"
)

func TestHakiEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Haki(nil)
		if ent == nil {
			t.Fatal("expected non-nil HakiEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := hakiBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "haki." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set ONEPIECE_TEST_HAKI_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		hakiRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.haki", setup.data)))
		var hakiRef01Data map[string]any
		if len(hakiRef01DataRaw) > 0 {
			hakiRef01Data = core.ToMapAny(hakiRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = hakiRef01Data

		// LIST
		hakiRef01Ent := client.Haki(nil)
		hakiRef01Match := map[string]any{}

		hakiRef01ListResult, err := hakiRef01Ent.List(hakiRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, hakiRef01ListOk := hakiRef01ListResult.([]any)
		if !hakiRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", hakiRef01ListResult)
		}

		// LOAD
		hakiRef01MatchDt0 := map[string]any{
			"id": hakiRef01Data["id"],
		}
		hakiRef01DataDt0Loaded, err := hakiRef01Ent.Load(hakiRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		hakiRef01DataDt0LoadResult := core.ToMapAny(hakiRef01DataDt0Loaded)
		if hakiRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if hakiRef01DataDt0LoadResult["id"] != hakiRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func hakiBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "haki", "HakiTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read haki test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse haki test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"haki01", "haki02", "haki03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("ONEPIECE_TEST_HAKI_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ONEPIECE_TEST_HAKI_ENTID": idmap,
		"ONEPIECE_TEST_LIVE":      "FALSE",
		"ONEPIECE_TEST_EXPLAIN":   "FALSE",
		"ONEPIECE_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["ONEPIECE_TEST_HAKI_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ONEPIECE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["ONEPIECE_APIKEY"],
			},
			extra,
		})
		client = sdk.NewOnePieceSDK(core.ToMapAny(mergedOpts))
	}

	live := env["ONEPIECE_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["ONEPIECE_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
