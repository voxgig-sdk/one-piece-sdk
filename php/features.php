<?php
declare(strict_types=1);

// OnePiece SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class OnePieceFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new OnePieceBaseFeature();
            case "test":
                return new OnePieceTestFeature();
            default:
                return new OnePieceBaseFeature();
        }
    }
}
