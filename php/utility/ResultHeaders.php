<?php
declare(strict_types=1);

// OnePiece SDK utility: result_headers

class OnePieceResultHeaders
{
    public static function call(OnePieceContext $ctx): ?OnePieceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
