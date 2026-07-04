# Dial entity test

require "minitest/autorun"
require "json"
require_relative "../OnePiece_sdk"
require_relative "runner"

class DialEntityTest < Minitest::Test
  def test_create_instance
    testsdk = OnePieceSDK.test(nil, nil)
    ent = testsdk.Dial(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = dial_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "dial." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set ONEPIECE_TEST_DIAL_ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    dial_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.dial")))
    dial_ref01_data = nil
    if dial_ref01_data_raw.length > 0
      dial_ref01_data = Helpers.to_map(dial_ref01_data_raw[0][1])
    end

    # LIST
    dial_ref01_ent = client.Dial(nil)
    dial_ref01_match = {}

    dial_ref01_list_result = dial_ref01_ent.list(dial_ref01_match, nil)
    assert dial_ref01_list_result.is_a?(Array)

    # LOAD
    dial_ref01_match_dt0 = {
      "id" => dial_ref01_data["id"],
    }
    dial_ref01_data_dt0_loaded = dial_ref01_ent.load(dial_ref01_match_dt0, nil)
    dial_ref01_data_dt0_load_result = Helpers.to_map(dial_ref01_data_dt0_loaded)
    assert !dial_ref01_data_dt0_load_result.nil?
    assert_equal dial_ref01_data_dt0_load_result["id"], dial_ref01_data["id"]

  end
end

def dial_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "dial", "DialTestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = OnePieceSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["dial01", "dial02", "dial03"],
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
  entid_env_raw = ENV["ONEPIECE_TEST_DIAL_ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "ONEPIECE_TEST_DIAL_ENTID" => idmap,
    "ONEPIECE_TEST_LIVE" => "FALSE",
    "ONEPIECE_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["ONEPIECE_TEST_DIAL_ENTID"])
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
