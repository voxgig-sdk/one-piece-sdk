<?php
declare(strict_types=1);

// Gear entity test

require_once __DIR__ . '/../onepiece_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class GearEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OnePieceSDK::test(null, null);
        $ent = $testsdk->Gear(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = gear_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "gear." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ONEPIECE_TEST_GEAR_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $gear_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.gear")));
        $gear_ref01_data = null;
        if (count($gear_ref01_data_raw) > 0) {
            $gear_ref01_data = Helpers::to_map($gear_ref01_data_raw[0][1]);
        }

        // LIST
        $gear_ref01_ent = $client->Gear(null);
        $gear_ref01_match = [];

        [$gear_ref01_list_result, $err] = $gear_ref01_ent->list($gear_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($gear_ref01_list_result);

        // LOAD
        $gear_ref01_match_dt0 = [
            "id" => $gear_ref01_data["id"],
        ];
        [$gear_ref01_data_dt0_loaded, $err] = $gear_ref01_ent->load($gear_ref01_match_dt0, null);
        $this->assertNull($err);
        $gear_ref01_data_dt0_load_result = Helpers::to_map($gear_ref01_data_dt0_loaded);
        $this->assertNotNull($gear_ref01_data_dt0_load_result);
        $this->assertEquals($gear_ref01_data_dt0_load_result["id"], $gear_ref01_data["id"]);

    }
}

function gear_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/gear/GearTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OnePieceSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["gear01", "gear02", "gear03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ONEPIECE_TEST_GEAR_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ONEPIECE_TEST_GEAR_ENTID" => $idmap,
        "ONEPIECE_TEST_LIVE" => "FALSE",
        "ONEPIECE_TEST_EXPLAIN" => "FALSE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ONEPIECE_TEST_GEAR_ENTID"]);
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
