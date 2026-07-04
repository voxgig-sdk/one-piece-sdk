package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/one-piece-sdk/go"
	"github.com/voxgig-sdk/one-piece-sdk/go/core"

	vs "github.com/voxgig-sdk/one-piece-sdk/go/utility/struct"
)

func TestChapterEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Chapter(nil)
		if ent == nil {
			t.Fatal("expected non-nil ChapterEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := chapterBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"list", "load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "chapter." + _op, _mode); _shouldSkip {
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
			t.Skip("live entity test uses synthetic IDs from fixture — set ONEPIECE_TEST_CHAPTER_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		chapterRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.chapter", setup.data)))
		var chapterRef01Data map[string]any
		if len(chapterRef01DataRaw) > 0 {
			chapterRef01Data = core.ToMapAny(chapterRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = chapterRef01Data

		// LIST
		chapterRef01Ent := client.Chapter(nil)
		chapterRef01Match := map[string]any{}

		chapterRef01ListResult, err := chapterRef01Ent.List(chapterRef01Match, nil)
		if err != nil {
			t.Fatalf("list failed: %v", err)
		}
		_, chapterRef01ListOk := chapterRef01ListResult.([]any)
		if !chapterRef01ListOk {
			t.Fatalf("expected list result to be an array, got %T", chapterRef01ListResult)
		}

		// LOAD
		chapterRef01MatchDt0 := map[string]any{
			"id": chapterRef01Data["id"],
		}
		chapterRef01DataDt0Loaded, err := chapterRef01Ent.Load(chapterRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		chapterRef01DataDt0LoadResult := core.ToMapAny(chapterRef01DataDt0Loaded)
		if chapterRef01DataDt0LoadResult == nil {
			t.Fatal("expected load result to be a map")
		}
		if chapterRef01DataDt0LoadResult["id"] != chapterRef01Data["id"] {
			t.Fatal("expected load result id to match")
		}

	})
}

func chapterBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "chapter", "ChapterTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read chapter test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse chapter test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"chapter01", "chapter02", "chapter03"},
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
	entidEnvRaw := os.Getenv("ONEPIECE_TEST_CHAPTER_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"ONEPIECE_TEST_CHAPTER_ENTID": idmap,
		"ONEPIECE_TEST_LIVE":      "FALSE",
		"ONEPIECE_TEST_EXPLAIN":   "FALSE",
	})

	idmapResolved := core.ToMapAny(env["ONEPIECE_TEST_CHAPTER_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["ONEPIECE_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
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
