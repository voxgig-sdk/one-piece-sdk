<?php
declare(strict_types=1);

// OnePiece SDK base feature

class OnePieceBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OnePieceContext $ctx, array $options): void {}
    public function PostConstruct(OnePieceContext $ctx): void {}
    public function PostConstructEntity(OnePieceContext $ctx): void {}
    public function SetData(OnePieceContext $ctx): void {}
    public function GetData(OnePieceContext $ctx): void {}
    public function GetMatch(OnePieceContext $ctx): void {}
    public function SetMatch(OnePieceContext $ctx): void {}
    public function PrePoint(OnePieceContext $ctx): void {}
    public function PreSpec(OnePieceContext $ctx): void {}
    public function PreRequest(OnePieceContext $ctx): void {}
    public function PreResponse(OnePieceContext $ctx): void {}
    public function PreResult(OnePieceContext $ctx): void {}
    public function PreDone(OnePieceContext $ctx): void {}
    public function PreUnexpected(OnePieceContext $ctx): void {}
}
