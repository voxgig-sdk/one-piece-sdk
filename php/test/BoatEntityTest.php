<?php
declare(strict_types=1);

// Boat entity test

require_once __DIR__ . '/../onepiece_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BoatEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OnePieceSDK::test(null, null);
        $ent = $testsdk->Boat(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = boat_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "boat." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ONEPIECE_TEST_BOAT_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $boat_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.boat")));
        $boat_ref01_data = null;
        if (count($boat_ref01_data_raw) > 0) {
            $boat_ref01_data = Helpers::to_map($boat_ref01_data_raw[0][1]);
        }

        // LIST
        $boat_ref01_ent = $client->Boat(null);
        $boat_ref01_match = [];

        $boat_ref01_list_result = $boat_ref01_ent->list($boat_ref01_match, null);
        $this->assertIsArray($boat_ref01_list_result);

        // LOAD
        $boat_ref01_match_dt0 = [
            "id" => $boat_ref01_data["id"],
        ];
        $boat_ref01_data_dt0_loaded = $boat_ref01_ent->load($boat_ref01_match_dt0, null);
        $boat_ref01_data_dt0_load_result = Helpers::to_map($boat_ref01_data_dt0_loaded);
        $this->assertNotNull($boat_ref01_data_dt0_load_result);
        $this->assertEquals($boat_ref01_data_dt0_load_result["id"], $boat_ref01_data["id"]);

    }
}

function boat_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/boat/BoatTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OnePieceSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["boat01", "boat02", "boat03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ONEPIECE_TEST_BOAT_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ONEPIECE_TEST_BOAT_ENTID" => $idmap,
        "ONEPIECE_TEST_LIVE" => "FALSE",
        "ONEPIECE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ONEPIECE_TEST_BOAT_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ONEPIECE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
            ],
            $extra ?? [],
        ]);
        $client = new OnePieceSDK(Helpers::to_map($merged_opts));
    }

    $live = $env["ONEPIECE_TEST_LIVE"] === "TRUE";
    return [
        "client" => $client,
        "data" => $entity_data,
        "idmap" => $idmap_resolved,
        "env" => $env,
        "explain" => $env["ONEPIECE_TEST_EXPLAIN"] === "TRUE",
        "live" => $live,
        "synthetic_only" => $live && !$idmap_overridden,
        "now" => (int)(microtime(true) * 1000),
    ];
}
