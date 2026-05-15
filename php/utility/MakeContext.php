<?php
declare(strict_types=1);

// OnePiece SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class OnePieceMakeContext
{
    public static function call(array $ctxmap, ?OnePieceContext $basectx): OnePieceContext
    {
        return new OnePieceContext($ctxmap, $basectx);
    }
}
