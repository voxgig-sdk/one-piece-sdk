# OnePiece SDK utility: make_context
require_relative '../core/context'
module OnePieceUtilities
  MakeContext = ->(ctxmap, basectx) {
    OnePieceContext.new(ctxmap, basectx)
  }
end
