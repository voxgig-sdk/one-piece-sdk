# OnePiece SDK exists test

require "minitest/autorun"
require_relative "../OnePiece_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OnePieceSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
