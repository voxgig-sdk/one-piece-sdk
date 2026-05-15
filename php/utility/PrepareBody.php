<?php
declare(strict_types=1);

// OnePiece SDK utility: prepare_body

class OnePiecePrepareBody
{
    public static function call(OnePieceContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
