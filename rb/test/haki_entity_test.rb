# Haki entity test

require "minitest/autorun"
require "json"
require_relative "../OnePiece_sdk"
require_relative "runner"

class HakiEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OnePieceSDK.test(nil, nil)
    ent = testsdk.Haki(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = haki_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "haki." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set ONEPIECE_TEST_HAKI_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    haki_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.haki")))
    haki_ref01_data = nil
    if haki_ref01_data_raw.length > 0
      haki_ref01_data = Helpers.to_map(haki_ref01_data_raw[0][1])
    end

    # LIST
    haki_ref01_ent = client.Haki(nil)
    haki_ref01_match = {}

    haki_ref01_list_result = haki_ref01_ent.list(haki_ref01_match, nil)
    assert haki_ref01_list_result.is_a?(Array)

    # LOAD
    haki_ref01_match_dt0 = {
      "id" => haki_ref01_data["id"],
    }
    haki_ref01_data_dt0_loaded = haki_ref01_ent.load(haki_ref01_match_dt0, nil)
    haki_ref01_data_dt0_load_result = Helpers.to_map(haki_ref01_data_dt0_loaded)
    assert !haki_ref01_data_dt0_load_result.nil?
    assert_equal haki_ref01_data_dt0_load_result["id"], haki_ref01_data["id"]

  end
end

def haki_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "haki", "HakiTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OnePieceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["haki01", "haki02", "haki03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["ONEPIECE_TEST_HAKI_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ONEPIECE_TEST_HAKI_ENTID" => idmap,
    "ONEPIECE_TEST_LIVE" => "FALSE",
    "ONEPIECE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["ONEPIECE_TEST_HAKI_ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["ONEPIECE_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = OnePieceSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["ONEPIECE_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["ONEPIECE_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
