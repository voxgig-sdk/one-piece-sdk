# OnePiece SDK utility: prepare_body
require_relative 'media'
module OnePieceUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return OnePieceUtilities.raw_body(ctx.reqdata) if OnePieceUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
