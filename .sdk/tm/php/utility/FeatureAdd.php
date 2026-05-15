<?php
declare(strict_types=1);

// OnePiece SDK utility: feature_add

class OnePieceFeatureAdd
{
    public static function call(OnePieceContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
