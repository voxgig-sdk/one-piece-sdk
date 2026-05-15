<?php
declare(strict_types=1);

// Bow entity test

require_once __DIR__ . '/../onepiece_sdk.php';
require_once __DIR__ . '/Runner.php';

use PHPUnit\Framework\TestCase;
use Voxgig\Struct\Struct as Vs;

class BowEntityTest extends TestCase
{
    public function test_create_instance(): void
    {
        $testsdk = OnePieceSDK::test(null, null);
        $ent = $testsdk->Bow(null);
        $this->assertNotNull($ent);
    }

    public function test_basic_flow(): void
    {
        $setup = bow_basic_setup(null);
        // Per-op sdk-test-control.json skip.
        $_live = !empty($setup["live"]);
        foreach (["list", "load"] as $_op) {
            [$_shouldSkip, $_reason] = Runner::is_control_skipped("entityOp", "bow." . $_op, $_live ? "live" : "unit");
            if ($_shouldSkip) {
                $this->markTestSkipped($_reason ?? "skipped via sdk-test-control.json");
                return;
            }
        }
        // The basic flow consumes synthetic IDs from the fixture. In live mode
        // without an *_ENTID env override, those IDs hit the live API and 4xx.
        if (!empty($setup["synthetic_only"])) {
            $this->markTestSkipped("live entity test uses synthetic IDs from fixture — set ONEPIECE_TEST_BOW_ENTID JSON to run live");
            return;
        }
        $client = $setup["client"];

        // Bootstrap entity data from existing test data.
        $bow_ref01_data_raw = Vs::items(Helpers::to_map(
            Vs::getpath($setup["data"], "existing.bow")));
        $bow_ref01_data = null;
        if (count($bow_ref01_data_raw) > 0) {
            $bow_ref01_data = Helpers::to_map($bow_ref01_data_raw[0][1]);
        }

        // LIST
        $bow_ref01_ent = $client->Bow(null);
        $bow_ref01_match = [];

        [$bow_ref01_list_result, $err] = $bow_ref01_ent->list($bow_ref01_match, null);
        $this->assertNull($err);
        $this->assertIsArray($bow_ref01_list_result);

        // LOAD
        $bow_ref01_match_dt0 = [
            "id" => $bow_ref01_data["id"],
        ];
        [$bow_ref01_data_dt0_loaded, $err] = $bow_ref01_ent->load($bow_ref01_match_dt0, null);
        $this->assertNull($err);
        $bow_ref01_data_dt0_load_result = Helpers::to_map($bow_ref01_data_dt0_loaded);
        $this->assertNotNull($bow_ref01_data_dt0_load_result);
        $this->assertEquals($bow_ref01_data_dt0_load_result["id"], $bow_ref01_data["id"]);

    }
}

function bow_basic_setup($extra)
{
    Runner::load_env_local();

    $entity_data_file = __DIR__ . '/../../.sdk/test/entity/bow/BowTestData.json';
    $entity_data_source = file_get_contents($entity_data_file);
    $entity_data = json_decode($entity_data_source, true);

    $options = [];
    $options["entity"] = $entity_data["existing"];

    $client = OnePieceSDK::test($options, $extra);

    // Generate idmap.
    $idmap = [];
    foreach (["bow01", "bow02", "bow03"] as $k) {
        $idmap[$k] = strtoupper($k);
    }

    // Detect ENTID env override before envOverride consumes it. When live
    // mode is on without a real override, the basic test runs against synthetic
    // IDs from the fixture and 4xx's. Surface this so the test can skip.
    $entid_env_raw = getenv("ONEPIECE_TEST_BOW_ENTID");
    $idmap_overridden = $entid_env_raw !== false && str_starts_with(trim($entid_env_raw), "{");

    $env = Runner::env_override([
        "ONEPIECE_TEST_BOW_ENTID" => $idmap,
        "ONEPIECE_TEST_LIVE" => "FALSE",
        "ONEPIECE_TEST_EXPLAIN" => "FALSE",
        "ONEPIECE_APIKEY" => "NONE",
    ]);

    $idmap_resolved = Helpers::to_map(
        $env["ONEPIECE_TEST_BOW_ENTID"]);
    if ($idmap_resolved === null) {
        $idmap_resolved = Helpers::to_map($idmap);
    }

    if ($env["ONEPIECE_TEST_LIVE"] === "TRUE") {
        $merged_opts = Vs::merge([
            [
                "apikey" => $env["ONEPIECE_APIKEY"],
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
