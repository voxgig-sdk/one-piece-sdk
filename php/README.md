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
    // load() returns the ENTITY — call data_get() for the Boat record (throws on error).
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

// Entity ops return the ENTITY (throws on error);
// call data_get() for the mock record.
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

Entity operations return the ENTITY (call data_get() for the record) (an `array` for single-entity
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
| `crew` | Crew that owns the boat |
| `description` | Description of the boat |
| `id` | Unique identifier for the boat |
| `name` | Name of the boat/ship |
| `type` | Type of vessel |

Operations: List, Load.

API path: `/boats`

#### Bow

| Field | Description |
| --- | --- |
| `description` | Description of the bow |
| `id` | Unique identifier for the bow |
| `name` | Name of the bow |
| `owner` | Owner of the bow |

Operations: List, Load.

API path: `/bows`

#### Chapter

| Field | Description |
| --- | --- |
| `id` | Unique identifier for the chapter |
| `number` | Chapter number |
| `releaseDate` | Release date of the chapter |
| `saga` | Saga this chapter belongs to |
| `title` | Title of the chapter |

Operations: List, Load.

API path: `/chapters`

#### Character

| Field | Description |
| --- | --- |
| `age` | Age of the character |
| `bounty` | Bounty of the character |
| `crew` | Crew affiliation |
| `description` | Description of the character |
| `devilFruit` | Devil Fruit ability if applicable |
| `id` | Unique identifier for the character |
| `name` | Name of the character |

Operations: List, Load.

API path: `/characters`

#### Crew

| Field | Description |
| --- | --- |
| `captain` | Captain of the crew |
| `description` | Description of the crew |
| `id` | Unique identifier for the crew |
| `members` | Members of the crew |
| `name` | Name of the crew |
| `ship` | Name of the crew's ship |

Operations: List, Load.

API path: `/crews`

#### Dial

| Field | Description |
| --- | --- |
| `description` | Description of the dial's function |
| `id` | Unique identifier for the dial |
| `name` | Name of the dial |
| `type` | Type of dial |

Operations: List, Load.

API path: `/dials`

#### Episode

| Field | Description |
| --- | --- |
| `airDate` | Air date of the episode |
| `id` | Unique identifier for the episode |
| `number` | Episode number |
| `saga` | Saga this episode belongs to |
| `title` | Title of the episode |

Operations: List, Load.

API path: `/episodes`

#### Film

| Field | Description |
| --- | --- |
| `description` | Description of the film |
| `id` | Unique identifier for the film |
| `releaseDate` | Release date of the film |
| `title` | Title of the film |

Operations: List, Load.

API path: `/films`

#### Fruit

| Field | Description |
| --- | --- |
| `description` | Description of the Devil Fruit's powers |
| `id` | Unique identifier for the Devil Fruit |
| `name` | Name of the Devil Fruit |
| `type` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | Current or known user of the fruit |

Operations: List, Load.

API path: `/fruits`

#### Gear

| Field | Description |
| --- | --- |
| `description` | Description of the gear's abilities |
| `firstAppearance` | First appearance of this gear |
| `id` | Unique identifier for the gear |
| `name` | Name of the gear form |

Operations: List, Load.

API path: `/gears`

#### Haki

| Field | Description |
| --- | --- |
| `description` | Description of the Haki type |
| `id` | Unique identifier for the Haki type |
| `name` | Name of the Haki type |
| `users` | Known users of this Haki type |

Operations: List, Load.

API path: `/hakis`

#### Location

| Field | Description |
| --- | --- |
| `description` | Description of the location |
| `firstAppearance` | First appearance of this location |
| `id` | Unique identifier for the location |
| `name` | Name of the location |
| `type` | Type of location (island, sea, etc.) |

Operations: List, Load.

API path: `/locations`

#### Saga

| Field | Description |
| --- | --- |
| `chapters` | Chapter IDs included in this saga |
| `description` | Description of the saga |
| `episodes` | Episode IDs included in this saga |
| `id` | Unique identifier for the saga |
| `name` | Name of the saga |

Operations: List, Load.

API path: `/sagas`

#### Sword

| Field | Description |
| --- | --- |
| `description` | Description of the sword |
| `grade` | Grade of the sword |
| `id` | Unique identifier for the sword |
| `name` | Name of the sword |
| `owner` | Current owner of the sword |

Operations: List, Load.

API path: `/swords`

#### Technique

| Field | Description |
| --- | --- |
| `description` | Description of the technique |
| `gear` | Associated gear form if applicable |
| `id` | Unique identifier for the technique |
| `name` | Name of the technique |

Operations: List, Load.

API path: `/techniques`

#### Volume

| Field | Description |
| --- | --- |
| `chapters` | Chapter IDs included in this volume |
| `id` | Unique identifier for the volume |
| `number` | Volume number |
| `releaseDate` | Release date of the volume |
| `title` | Title of the volume |

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
| `crew` | `string` | Crew that owns the boat |
| `description` | `string` | Description of the boat |
| `id` | `int` | Unique identifier for the boat |
| `name` | `string` | Name of the boat/ship |
| `type` | `string` | Type of vessel |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Boat record (throws on error).
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
| `description` | `string` | Description of the bow |
| `id` | `int` | Unique identifier for the bow |
| `name` | `string` | Name of the bow |
| `owner` | `string` | Owner of the bow |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Bow record (throws on error).
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
| `id` | `int` | Unique identifier for the chapter |
| `number` | `int` | Chapter number |
| `releaseDate` | `string` | Release date of the chapter |
| `saga` | `string` | Saga this chapter belongs to |
| `title` | `string` | Title of the chapter |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Chapter record (throws on error).
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
| `age` | `int` | Age of the character |
| `bounty` | `int` | Bounty of the character |
| `crew` | `string` | Crew affiliation |
| `description` | `string` | Description of the character |
| `devilFruit` | `string` | Devil Fruit ability if applicable |
| `id` | `int` | Unique identifier for the character |
| `name` | `string` | Name of the character |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Character record (throws on error).
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
| `captain` | `string` | Captain of the crew |
| `description` | `string` | Description of the crew |
| `id` | `int` | Unique identifier for the crew |
| `members` | `array` | Members of the crew |
| `name` | `string` | Name of the crew |
| `ship` | `string` | Name of the crew's ship |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Crew record (throws on error).
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
| `description` | `string` | Description of the dial's function |
| `id` | `int` | Unique identifier for the dial |
| `name` | `string` | Name of the dial |
| `type` | `string` | Type of dial |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Dial record (throws on error).
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
| `airDate` | `string` | Air date of the episode |
| `id` | `int` | Unique identifier for the episode |
| `number` | `int` | Episode number |
| `saga` | `string` | Saga this episode belongs to |
| `title` | `string` | Title of the episode |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Episode record (throws on error).
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
| `description` | `string` | Description of the film |
| `id` | `int` | Unique identifier for the film |
| `releaseDate` | `string` | Release date of the film |
| `title` | `string` | Title of the film |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Film record (throws on error).
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
| `description` | `string` | Description of the Devil Fruit's powers |
| `id` | `int` | Unique identifier for the Devil Fruit |
| `name` | `string` | Name of the Devil Fruit |
| `type` | `string` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `string` | Current or known user of the fruit |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Fruit record (throws on error).
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
| `description` | `string` | Description of the gear's abilities |
| `firstAppearance` | `string` | First appearance of this gear |
| `id` | `int` | Unique identifier for the gear |
| `name` | `string` | Name of the gear form |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Gear record (throws on error).
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
| `description` | `string` | Description of the Haki type |
| `id` | `int` | Unique identifier for the Haki type |
| `name` | `string` | Name of the Haki type |
| `users` | `array` | Known users of this Haki type |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Haki record (throws on error).
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
| `description` | `string` | Description of the location |
| `firstAppearance` | `string` | First appearance of this location |
| `id` | `int` | Unique identifier for the location |
| `name` | `string` | Name of the location |
| `type` | `string` | Type of location (island, sea, etc.) |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Location record (throws on error).
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
| `chapters` | `array` | Chapter IDs included in this saga |
| `description` | `string` | Description of the saga |
| `episodes` | `array` | Episode IDs included in this saga |
| `id` | `int` | Unique identifier for the saga |
| `name` | `string` | Name of the saga |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Saga record (throws on error).
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
| `description` | `string` | Description of the sword |
| `grade` | `string` | Grade of the sword |
| `id` | `int` | Unique identifier for the sword |
| `name` | `string` | Name of the sword |
| `owner` | `string` | Current owner of the sword |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Sword record (throws on error).
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
| `description` | `string` | Description of the technique |
| `gear` | `string` | Associated gear form if applicable |
| `id` | `int` | Unique identifier for the technique |
| `name` | `string` | Name of the technique |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Technique record (throws on error).
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
| `chapters` | `array` | Chapter IDs included in this volume |
| `id` | `int` | Unique identifier for the volume |
| `number` | `int` | Volume number |
| `releaseDate` | `string` | Release date of the volume |
| `title` | `string` | Title of the volume |

#### Example: Load

```php
// load() returns the ENTITY — call data_get() for the Volume record (throws on error).
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
