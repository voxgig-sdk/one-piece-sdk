# OnePiece SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OnePieceFeatures
  def self.make_feature(name)
    case name
    when "base"
      OnePieceBaseFeature.new
    when "test"
      OnePieceTestFeature.new
    else
      OnePieceBaseFeature.new
    end
  end
end
