<?php
declare(strict_types=1);

// OnePiece SDK

require_once __DIR__ . '/utility/struct/Struct.php';
require_once __DIR__ . '/core/UtilityType.php';
require_once __DIR__ . '/core/Spec.php';
require_once __DIR__ . '/core/Helpers.php';

// Load utility registration
require_once __DIR__ . '/utility/Register.php';

// Load config and features
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/features.php';

use Voxgig\Struct\Struct;

class OnePieceSDK
{
    public string $mode;
    public array $features;
    public ?array $options;

    private $_utility;
    private $_rootctx;

    public function __construct(array $options = [])
    {
        $this->mode = "live";
        $this->features = [];
        $this->options = null;

        $utility = new OnePieceUtility();
        $this->_utility = $utility;

        $config = OnePieceConfig::make_config();

        $this->_rootctx = ($utility->make_context)([
            "client" => $this,
            "utility" => $utility,
            "config" => $config,
            "options" => $options ?? [],
            "shared" => [],
        ], null);

        $this->options = ($utility->make_options)($this->_rootctx);

        if (Struct::getpath($this->options, "feature.test.active") === true) {
            $this->mode = "test";
        }

        $this->_rootctx->options = $this->options;

        // Add features from config.
        $feature_opts = OnePieceHelpers::to_map(Struct::getprop($this->options, "feature"));
        if ($feature_opts) {
            $items = Struct::items($feature_opts);
            if ($items) {
                foreach ($items as $item) {
                    $fname = $item[0];
                    $fopts = OnePieceHelpers::to_map($item[1]);
                    if ($fopts && isset($fopts["active"]) && $fopts["active"] === true) {
                        ($utility->feature_add)($this->_rootctx, OnePieceFeatures::make_feature($fname));
                    }
                }
            }
        }

        // Add extension features.
        $extend_val = Struct::getprop($this->options, "extend");
        if (is_array($extend_val)) {
            foreach ($extend_val as $f) {
                if (is_object($f) && method_exists($f, 'get_name')) {
                    ($utility->feature_add)($this->_rootctx, $f);
                }
            }
        }

        // Initialize features.
        foreach ($this->features as $f) {
            ($utility->feature_init)($this->_rootctx, $f);
        }

        ($utility->feature_hook)($this->_rootctx, "PostConstruct");
    }

    public function options_map(): array
    {
        $out = Struct::clone($this->options);
        return is_array($out) ? $out : [];
    }

    public function get_utility()
    {
        return OnePieceUtility::copy($this->_utility);
    }

    public function get_root_ctx()
    {
        return $this->_rootctx;
    }

    public function prepare(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;
        $fetchargs = $fetchargs ?? [];

        $ctrl = OnePieceHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "prepare",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $opts = $this->options;
        $path = Struct::getprop($fetchargs, "path") ?? "";
        $path = is_string($path) ? $path : "";
        $method_val = Struct::getprop($fetchargs, "method") ?? "GET";
        $method_val = is_string($method_val) ? $method_val : "GET";
        $params = OnePieceHelpers::to_map(Struct::getprop($fetchargs, "params")) ?? [];
        $query = OnePieceHelpers::to_map(Struct::getprop($fetchargs, "query")) ?? [];
        $headers = ($utility->prepare_headers)($ctx);

        $base = Struct::getprop($opts, "base") ?? "";
        $base = is_string($base) ? $base : "";
        $prefix = Struct::getprop($opts, "prefix") ?? "";
        $prefix = is_string($prefix) ? $prefix : "";
        $suffix = Struct::getprop($opts, "suffix") ?? "";
        $suffix = is_string($suffix) ? $suffix : "";

        $ctx->spec = new OnePieceSpec([
            "base" => $base, "prefix" => $prefix, "suffix" => $suffix,
            "path" => $path, "method" => $method_val,
            "params" => $params, "query" => $query, "headers" => $headers,
            "body" => Struct::getprop($fetchargs, "body"),
            "step" => "start",
        ]);

        // Merge user-provided headers.
        $uh = Struct::getprop($fetchargs, "headers");
        if (is_array($uh)) {
            foreach ($uh as $k => $v) {
                $ctx->spec->headers[$k] = $v;
            }
        }

        [$_, $err] = ($utility->prepare_auth)($ctx);
        if ($err) {
            return ($utility->make_error)($ctx, $err);
        }

        [$fetchdef, $fd_err] = ($utility->make_fetch_def)($ctx);
        if ($fd_err) {
            return ($utility->make_error)($ctx, $fd_err);
        }
        return $fetchdef;
    }

    public function direct(array $fetchargs = []): mixed
    {
        $utility = $this->_utility;

        // direct() is the raw-HTTP escape hatch: it never throws, it returns
        // an {ok, err, ...} dict. prepare() now raises on error, so catch it
        // and surface the failure through the dict instead.
        try {
            $fetchdef = $this->prepare($fetchargs);
        } catch (\Throwable $err) {
            return ["ok" => false, "err" => $err];
        }

        $fetchargs = $fetchargs ?? [];
        $ctrl = OnePieceHelpers::to_map(Struct::getprop($fetchargs, "ctrl")) ?? [];

        $ctx = ($utility->make_context)([
            "opname" => "direct",
            "ctrl" => $ctrl,
        ], $this->_rootctx);

        $url = $fetchdef["url"] ?? "";
        [$fetched, $fetch_err] = ($utility->fetcher)($ctx, $url, $fetchdef);

        if ($fetch_err) {
            return ["ok" => false, "err" => $fetch_err];
        }

        if ($fetched === null) {
            return [
                "ok" => false,
                "err" => $ctx->make_error("direct_no_response", "response: undefined"),
            ];
        }

        if (is_array($fetched)) {
            $status = OnePieceHelpers::to_int(Struct::getprop($fetched, "status"));
            $headers = Struct::getprop($fetched, "headers") ?? [];

            // No-body responses (204, 304) and explicit zero content-length
            // must skip JSON parsing — calling json() on an empty body errors.
            $content_length = is_array($headers) ? ($headers["content-length"] ?? null) : null;
            $no_body = $status === 204 || $status === 304 || (string)$content_length === "0";

            $json_data = null;
            if (!$no_body) {
                $jf = Struct::getprop($fetched, "json");
                if (is_callable($jf)) {
                    try {
                        $json_data = $jf();
                    } catch (\Throwable $e) {
                        // Non-JSON body — leave data null but keep status/ok.
                        $json_data = null;
                    }
                }
            }

            return [
                "ok" => $status >= 200 && $status < 300,
                "status" => $status,
                "headers" => Struct::getprop($fetched, "headers"),
                "data" => $json_data,
            ];
        }

        return [
            "ok" => false,
            "err" => $ctx->make_error("direct_invalid", "invalid response type"),
        ];
    }


    private $_boat = null;

    // Idiomatic facade: $client->boat()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Boat() (PHP method
    // names are case-insensitive).
    public function boat($data = null)
    {
        require_once __DIR__ . '/entity/boat_entity.php';
        if ($data === null) {
            if ($this->_boat === null) {
                $this->_boat = new BoatEntity($this, null);
            }
            return $this->_boat;
        }
        return new BoatEntity($this, $data);
    }


    private $_bow = null;

    // Idiomatic facade: $client->bow()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Bow() (PHP method
    // names are case-insensitive).
    public function bow($data = null)
    {
        require_once __DIR__ . '/entity/bow_entity.php';
        if ($data === null) {
            if ($this->_bow === null) {
                $this->_bow = new BowEntity($this, null);
            }
            return $this->_bow;
        }
        return new BowEntity($this, $data);
    }


    private $_chapter = null;

    // Idiomatic facade: $client->chapter()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Chapter() (PHP method
    // names are case-insensitive).
    public function chapter($data = null)
    {
        require_once __DIR__ . '/entity/chapter_entity.php';
        if ($data === null) {
            if ($this->_chapter === null) {
                $this->_chapter = new ChapterEntity($this, null);
            }
            return $this->_chapter;
        }
        return new ChapterEntity($this, $data);
    }


    private $_character = null;

    // Idiomatic facade: $client->character()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Character() (PHP method
    // names are case-insensitive).
    public function character($data = null)
    {
        require_once __DIR__ . '/entity/character_entity.php';
        if ($data === null) {
            if ($this->_character === null) {
                $this->_character = new CharacterEntity($this, null);
            }
            return $this->_character;
        }
        return new CharacterEntity($this, $data);
    }


    private $_crew = null;

    // Idiomatic facade: $client->crew()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Crew() (PHP method
    // names are case-insensitive).
    public function crew($data = null)
    {
        require_once __DIR__ . '/entity/crew_entity.php';
        if ($data === null) {
            if ($this->_crew === null) {
                $this->_crew = new CrewEntity($this, null);
            }
            return $this->_crew;
        }
        return new CrewEntity($this, $data);
    }


    private $_dial = null;

    // Idiomatic facade: $client->dial()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Dial() (PHP method
    // names are case-insensitive).
    public function dial($data = null)
    {
        require_once __DIR__ . '/entity/dial_entity.php';
        if ($data === null) {
            if ($this->_dial === null) {
                $this->_dial = new DialEntity($this, null);
            }
            return $this->_dial;
        }
        return new DialEntity($this, $data);
    }


    private $_episode = null;

    // Idiomatic facade: $client->episode()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Episode() (PHP method
    // names are case-insensitive).
    public function episode($data = null)
    {
        require_once __DIR__ . '/entity/episode_entity.php';
        if ($data === null) {
            if ($this->_episode === null) {
                $this->_episode = new EpisodeEntity($this, null);
            }
            return $this->_episode;
        }
        return new EpisodeEntity($this, $data);
    }


    private $_film = null;

    // Idiomatic facade: $client->film()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Film() (PHP method
    // names are case-insensitive).
    public function film($data = null)
    {
        require_once __DIR__ . '/entity/film_entity.php';
        if ($data === null) {
            if ($this->_film === null) {
                $this->_film = new FilmEntity($this, null);
            }
            return $this->_film;
        }
        return new FilmEntity($this, $data);
    }


    private $_fruit = null;

    // Idiomatic facade: $client->fruit()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Fruit() (PHP method
    // names are case-insensitive).
    public function fruit($data = null)
    {
        require_once __DIR__ . '/entity/fruit_entity.php';
        if ($data === null) {
            if ($this->_fruit === null) {
                $this->_fruit = new FruitEntity($this, null);
            }
            return $this->_fruit;
        }
        return new FruitEntity($this, $data);
    }


    private $_gear = null;

    // Idiomatic facade: $client->gear()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Gear() (PHP method
    // names are case-insensitive).
    public function gear($data = null)
    {
        require_once __DIR__ . '/entity/gear_entity.php';
        if ($data === null) {
            if ($this->_gear === null) {
                $this->_gear = new GearEntity($this, null);
            }
            return $this->_gear;
        }
        return new GearEntity($this, $data);
    }


    private $_haki = null;

    // Idiomatic facade: $client->haki()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Haki() (PHP method
    // names are case-insensitive).
    public function haki($data = null)
    {
        require_once __DIR__ . '/entity/haki_entity.php';
        if ($data === null) {
            if ($this->_haki === null) {
                $this->_haki = new HakiEntity($this, null);
            }
            return $this->_haki;
        }
        return new HakiEntity($this, $data);
    }


    private $_location = null;

    // Idiomatic facade: $client->location()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Location() (PHP method
    // names are case-insensitive).
    public function location($data = null)
    {
        require_once __DIR__ . '/entity/location_entity.php';
        if ($data === null) {
            if ($this->_location === null) {
                $this->_location = new LocationEntity($this, null);
            }
            return $this->_location;
        }
        return new LocationEntity($this, $data);
    }


    private $_saga = null;

    // Idiomatic facade: $client->saga()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Saga() (PHP method
    // names are case-insensitive).
    public function saga($data = null)
    {
        require_once __DIR__ . '/entity/saga_entity.php';
        if ($data === null) {
            if ($this->_saga === null) {
                $this->_saga = new SagaEntity($this, null);
            }
            return $this->_saga;
        }
        return new SagaEntity($this, $data);
    }


    private $_sword = null;

    // Idiomatic facade: $client->sword()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Sword() (PHP method
    // names are case-insensitive).
    public function sword($data = null)
    {
        require_once __DIR__ . '/entity/sword_entity.php';
        if ($data === null) {
            if ($this->_sword === null) {
                $this->_sword = new SwordEntity($this, null);
            }
            return $this->_sword;
        }
        return new SwordEntity($this, $data);
    }


    private $_technique = null;

    // Idiomatic facade: $client->technique()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Technique() (PHP method
    // names are case-insensitive).
    public function technique($data = null)
    {
        require_once __DIR__ . '/entity/technique_entity.php';
        if ($data === null) {
            if ($this->_technique === null) {
                $this->_technique = new TechniqueEntity($this, null);
            }
            return $this->_technique;
        }
        return new TechniqueEntity($this, $data);
    }


    private $_volume = null;

    // Idiomatic facade: $client->volume()->list() / ->load(["id" => ...]).
    // Also serves the deprecated PascalCase alias Volume() (PHP method
    // names are case-insensitive).
    public function volume($data = null)
    {
        require_once __DIR__ . '/entity/volume_entity.php';
        if ($data === null) {
            if ($this->_volume === null) {
                $this->_volume = new VolumeEntity($this, null);
            }
            return $this->_volume;
        }
        return new VolumeEntity($this, $data);
    }



    public static function test(?array $testopts = null, ?array $sdkopts = null): self
    {
        $sdkopts = $sdkopts ?? [];
        $sdkopts = Struct::clone($sdkopts);
        $sdkopts = is_array($sdkopts) ? $sdkopts : [];

        $testopts = $testopts ?? [];
        $testopts = Struct::clone($testopts);
        $testopts = is_array($testopts) ? $testopts : [];
        $testopts["active"] = true;

        if (!isset($sdkopts["feature"])) {
            $sdkopts["feature"] = [];
        }
        $sdkopts["feature"]["test"] = $testopts;

        $sdk = new OnePieceSDK($sdkopts);
        $sdk->mode = "test";
        return $sdk;
    }
}
