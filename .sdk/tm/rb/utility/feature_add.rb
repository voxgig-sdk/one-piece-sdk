# OnePiece SDK utility: feature_add
module OnePieceUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
