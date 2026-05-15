-- ProjectName SDK exists test

local sdk = require("one-piece_sdk")

describe("OnePieceSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
