<?php
declare(strict_types=1);

// Saga entity test

require_once __DIR__ . '/../onepiece_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class SagaEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OnePieceSDK::test(null, null);
        $ent = $testsdk->Saga(null);
        $this->assertNotNull($ent);
    }

    // Feature #4: the entity stream(action, ...) method runs the op pipeline
    // and yields result items. With the streaming feature active it yields the
    // feature's incremental output; otherwise it falls back to the materialised
    // list so stream always yields.
    public function test_stream(): void
    {
        $seed = [
            "entity" => [
                "saga" => [
                    "s1" => ["id" => "s1"],
                    "s2" => ["id" => "s2"],
                    "s3" => ["id" => "s3"],
                ],
            ],
        ];

        // Fallback: streaming inactive -> yields the materialised list items.
        $base = OnePieceSDK::test($seed, null);
        $seen = iterator_to_array($base->Saga(null)->stream("list", null, null), false);
        $this->assertCount(3, $seen);

        // Inbound: streaming active -> yields each item from the feature.
        $cfg = OnePieceConfig::make_config();
        if (isset($cfg["feature"]) && is_array($cfg["feature"]) && isset($cfg["feature"]["streaming"])) {
            $sdk = OnePieceSDK::test($seed, ["feature" => ["streaming" => ["active" => true]]]);
            $got = [];
            foreach ($sdk->Saga(null)->stream("list", null, null) as $item) {
                if (is_array($item) && array_is_list($item)) {
                    foreach ($item as $sub) {
                        $got[] = $sub;
                    }
                } else {
                    $got[] = $item;
                }
            }
            $this->assertCount(3, $got);
        }
    }

    public function test_basic_flow(): void
    {
        $setup = saga_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "saga." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ONE_PIECE_TEST_SAGA_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $saga_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.saga")));
        $saga_ref01_data = null;
        if (count($saga_ref01_data_raw) > 0) {
            $saga_ref01_data = Helpers::to_map($saga_ref01_data_raw[0][1]);
        }

        // LIST
        $saga_ref01_ent = $client->Saga(null);
        $saga_ref01_match = [];

        $saga_ref01_list_result = $saga_ref01_ent->list($saga_ref01_match, null);
        $this->assertIsArray($saga_ref01_list_result);

        // LOAD
        $saga_ref01_match_dt0 = [
            "id" => $saga_ref01_data["id"],
        ];
        $saga_ref01_data_dt0_loaded = $saga_ref01_ent->load($saga_ref01_match_dt0, null);
        $saga_ref01_data_dt0_load_result = Helpers::to_map(is_object($saga_ref01_data_dt0_loaded) && method_exists($saga_ref01_data_dt0_loaded, 'data_get') ? $saga_ref01_data_dt0_loaded->data_get() : $saga_ref01_data_dt0_loaded);
        $this->assertNotNull($saga_ref01_data_dt0_load_result);
        $this->assertEquals($saga_ref01_data_dt0_load_result["id"], $saga_ref01_data["id"]);

    }
}

function saga_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/saga/SagaTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OnePieceSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["saga01", "saga02", "saga03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ONE_PIECE_TEST_SAGA_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ONE_PIECE_TEST_SAGA_ENTID" => $idmap,
        "ONE_PIECE_TEST_LIVE" => "FALSE",
        "ONE_PIECE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ONE_PIECE_TEST_SAGA_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ONE_PIECE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new OnePieceSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ONE_PIECE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ONE_PIECE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
