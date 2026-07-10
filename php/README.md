# OnePiece PHP SDK



The PHP SDK for the OnePiece API — an entity-oriented client using PHP conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `$client->Boat()` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/one-piece-sdk/releases](https://github.com/voxgig-sdk/one-piece-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'onepiece_sdk.php';

$client = new OnePieceSDK();
```

### 2. List boat records

```php
try {
    // list() returns an array of Boat records — iterate directly.
    $boats = $client->Boat()->list();
    foreach ($boats as $item) {
        echo $item["id"] . " " . $item["crew"] . "\n";
    }
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

### 3. Load a boat

```php
try {
    // load() returns the bare Boat record (throws on error).
    $boat = $client->Boat()->load(["id" => 1]);
    print_r($boat);
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```


## Error handling

Entity operations throw a `\Throwable` on failure, so wrap them in
`try` / `catch`:

```php
try {
    $boats = $client->Boat()->list();
} catch (\Throwable $err) {
    echo "Error: " . $err->getMessage();
}
```

`direct()` does **not** throw — it returns the result array. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```php
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example_id"],
]);

if (! $result["ok"]) {
    $err = $result["err"] ?? null;
    echo "request failed: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    // On an HTTP error status there is no err (only a transport failure sets
    // it), so fall back to the status code.
    $err = $result["err"] ?? null;
    echo "Error: " . ($err ? $err->getMessage() : "HTTP " . $result["status"]);
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```php
$client = OnePieceSDK::test([
    "entity" => ["boat" => ["test01" => ["id" => "test01"]]],
]);

// Entity ops return the bare mock record (throws on error).
$boat = $client->Boat()->list();
print_r($boat);
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OnePieceSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
ONE_PIECE_TEST_LIVE=TRUE
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OnePieceSDK

```php
require_once 'onepiece_sdk.php';
$client = new OnePieceSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OnePieceSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OnePieceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Boat` | `($data): BoatEntity` | Create a Boat entity instance. |
| `Bow` | `($data): BowEntity` | Create a Bow entity instance. |
| `Chapter` | `($data): ChapterEntity` | Create a Chapter entity instance. |
| `Character` | `($data): CharacterEntity` | Create a Character entity instance. |
| `Crew` | `($data): CrewEntity` | Create a Crew entity instance. |
| `Dial` | `($data): DialEntity` | Create a Dial entity instance. |
| `Episode` | `($data): EpisodeEntity` | Create an Episode entity instance. |
| `Film` | `($data): FilmEntity` | Create a Film entity instance. |
| `Fruit` | `($data): FruitEntity` | Create a Fruit entity instance. |
| `Gear` | `($data): GearEntity` | Create a Gear entity instance. |
| `Haki` | `($data): HakiEntity` | Create a Haki entity instance. |
| `Location` | `($data): LocationEntity` | Create a Location entity instance. |
| `Saga` | `($data): SagaEntity` | Create a Saga entity instance. |
| `Sword` | `($data): SwordEntity` | Create a Sword entity instance. |
| `Technique` | `($data): TechniqueEntity` | Create a Technique entity instance. |
| `Volume` | `($data): VolumeEntity` | Create a Volume entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `(?array $reqmatch = null, $ctrl): array` | List entities matching the criteria (call with no argument to list all). |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

### Entities

#### Boat

| Field | Description |
| --- | --- |
| `crew` |  |
| `description` |  |
| `id` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/boats`

#### Bow

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |
| `owner` |  |

Operations: List, Load.

API path: `/bows`

#### Chapter

| Field | Description |
| --- | --- |
| `id` |  |
| `number` |  |
| `release_date` |  |
| `saga` |  |
| `title` |  |

Operations: List, Load.

API path: `/chapters`

#### Character

| Field | Description |
| --- | --- |
| `age` |  |
| `bounty` |  |
| `crew` |  |
| `description` |  |
| `devil_fruit` |  |
| `id` |  |
| `name` |  |

Operations: List, Load.

API path: `/characters`

#### Crew

| Field | Description |
| --- | --- |
| `captain` |  |
| `description` |  |
| `id` |  |
| `member` |  |
| `name` |  |
| `ship` |  |

Operations: List, Load.

API path: `/crews`

#### Dial

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/dials`

#### Episode

| Field | Description |
| --- | --- |
| `air_date` |  |
| `id` |  |
| `number` |  |
| `saga` |  |
| `title` |  |

Operations: List, Load.

API path: `/episodes`

#### Film

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `release_date` |  |
| `title` |  |

Operations: List, Load.

API path: `/films`

#### Fruit

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |
| `type` |  |
| `user` |  |

Operations: List, Load.

API path: `/fruits`

#### Gear

| Field | Description |
| --- | --- |
| `description` |  |
| `first_appearance` |  |
| `id` |  |
| `name` |  |

Operations: List, Load.

API path: `/gears`

#### Haki

| Field | Description |
| --- | --- |
| `description` |  |
| `id` |  |
| `name` |  |
| `user` |  |

Operations: List, Load.

API path: `/hakis`

#### Location

| Field | Description |
| --- | --- |
| `description` |  |
| `first_appearance` |  |
| `id` |  |
| `name` |  |
| `type` |  |

Operations: List, Load.

API path: `/locations`

#### Saga

| Field | Description |
| --- | --- |
| `chapter` |  |
| `description` |  |
| `episode` |  |
| `id` |  |
| `name` |  |

Operations: List, Load.

API path: `/sagas`

#### Sword

| Field | Description |
| --- | --- |
| `description` |  |
| `grade` |  |
| `id` |  |
| `name` |  |
| `owner` |  |

Operations: List, Load.

API path: `/swords`

#### Technique

| Field | Description |
| --- | --- |
| `description` |  |
| `gear` |  |
| `id` |  |
| `name` |  |

Operations: List, Load.

API path: `/techniques`

#### Volume

| Field | Description |
| --- | --- |
| `chapter` |  |
| `id` |  |
| `number` |  |
| `release_date` |  |
| `title` |  |

Operations: List, Load.

API path: `/volumes`



## Entities


### Boat

Create an instance: `$boat = $client->Boat();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Boat record (throws on error).
$boat = $client->Boat()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Boat records (throws on error).
$boats = $client->Boat()->list();
```


### Bow

Create an instance: `$bow = $client->Bow();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```php
// load() returns the bare Bow record (throws on error).
$bow = $client->Bow()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Bow records (throws on error).
$bows = $client->Bow()->list();
```


### Chapter

Create an instance: `$chapter = $client->Chapter();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` |  |
| `number` | `int` |  |
| `release_date` | `string` |  |
| `saga` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the bare Chapter record (throws on error).
$chapter = $client->Chapter()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Chapter records (throws on error).
$chapters = $client->Chapter()->list();
```


### Character

Create an instance: `$character = $client->Character();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `int` |  |
| `bounty` | `int` |  |
| `crew` | `string` |  |
| `description` | `string` |  |
| `devil_fruit` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Character record (throws on error).
$character = $client->Character()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Character records (throws on error).
$characters = $client->Character()->list();
```


### Crew

Create an instance: `$crew = $client->Crew();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `captain` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `member` | `array` |  |
| `name` | `string` |  |
| `ship` | `string` |  |

#### Example: Load

```php
// load() returns the bare Crew record (throws on error).
$crew = $client->Crew()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Crew records (throws on error).
$crews = $client->Crew()->list();
```


### Dial

Create an instance: `$dial = $client->Dial();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Dial record (throws on error).
$dial = $client->Dial()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Dial records (throws on error).
$dials = $client->Dial()->list();
```


### Episode

Create an instance: `$episode = $client->Episode();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `air_date` | `string` |  |
| `id` | `int` |  |
| `number` | `int` |  |
| `saga` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the bare Episode record (throws on error).
$episode = $client->Episode()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Episode records (throws on error).
$episodes = $client->Episode()->list();
```


### Film

Create an instance: `$film = $client->Film();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `release_date` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the bare Film record (throws on error).
$film = $client->Film()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Film records (throws on error).
$films = $client->Film()->list();
```


### Fruit

Create an instance: `$fruit = $client->Fruit();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |
| `user` | `string` |  |

#### Example: Load

```php
// load() returns the bare Fruit record (throws on error).
$fruit = $client->Fruit()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Fruit records (throws on error).
$fruits = $client->Fruit()->list();
```


### Gear

Create an instance: `$gear = $client->Gear();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `first_appearance` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Gear record (throws on error).
$gear = $client->Gear()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Gear records (throws on error).
$gears = $client->Gear()->list();
```


### Haki

Create an instance: `$haki = $client->Haki();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `user` | `array` |  |

#### Example: Load

```php
// load() returns the bare Haki record (throws on error).
$haki = $client->Haki()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Haki records (throws on error).
$hakis = $client->Haki()->list();
```


### Location

Create an instance: `$location = $client->Location();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `first_appearance` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```php
// load() returns the bare Location record (throws on error).
$location = $client->Location()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Location records (throws on error).
$locations = $client->Location()->list();
```


### Saga

Create an instance: `$saga = $client->Saga();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | `array` |  |
| `description` | `string` |  |
| `episode` | `array` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Saga record (throws on error).
$saga = $client->Saga()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Saga records (throws on error).
$sagas = $client->Saga()->list();
```


### Sword

Create an instance: `$sword = $client->Sword();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `grade` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```php
// load() returns the bare Sword record (throws on error).
$sword = $client->Sword()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Sword records (throws on error).
$swords = $client->Sword()->list();
```


### Technique

Create an instance: `$technique = $client->Technique();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` |  |
| `gear` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```php
// load() returns the bare Technique record (throws on error).
$technique = $client->Technique()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Technique records (throws on error).
$techniques = $client->Technique()->list();
```


### Volume

Create an instance: `$volume = $client->Volume();`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | `array` |  |
| `id` | `int` |  |
| `number` | `int` |  |
| `release_date` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```php
// load() returns the bare Volume record (throws on error).
$volume = $client->Volume()->load(["id" => 1]);
```

#### Example: List

```php
// list() returns an array of Volume records (throws on error).
$volumes = $client->Volume()->list();
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── onepiece_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`onepiece_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```php
$boat = $client->Boat();
$boat->list();

// $boat->data_get() now returns the boat data from the last list
// $boat->match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
