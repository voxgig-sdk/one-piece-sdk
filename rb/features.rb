# OnePiece SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OnePieceFeatures
  def self.make_feature(name)
    case name
    when "base"
      OnePieceBaseFeature.new
    when "ratelimit"
      OnePieceRatelimitFeature.new
    when "retry"
      OnePieceRetryFeature.new
    when "test"
      OnePieceTestFeature.new
    when "timeout"
      OnePieceTimeoutFeature.new
    else
      OnePieceBaseFeature.new
    end
  end
end
