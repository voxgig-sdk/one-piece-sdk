<?php
declare(strict_types=1);

// OnePiece SDK utility: result_body

class OnePieceResultBody
{
    public static function call(OnePieceContext $ctx): ?OnePieceResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
