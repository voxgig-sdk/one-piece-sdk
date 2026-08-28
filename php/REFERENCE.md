# OnePiece PHP SDK Reference

Complete API reference for the OnePiece PHP SDK.


## OnePieceSDK

### Constructor

```php
require_once __DIR__ . '/onepiece_sdk.php';

$client = new OnePieceSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OnePieceSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OnePieceSDK::test();
```


### Instance Methods

#### `Boat($data = null)`

Create a new `BoatEntity` instance. Pass `null` for no initial data.

#### `Bow($data = null)`

Create a new `BowEntity` instance. Pass `null` for no initial data.

#### `Chapter($data = null)`

Create a new `ChapterEntity` instance. Pass `null` for no initial data.

#### `Character($data = null)`

Create a new `CharacterEntity` instance. Pass `null` for no initial data.

#### `Crew($data = null)`

Create a new `CrewEntity` instance. Pass `null` for no initial data.

#### `Dial($data = null)`

Create a new `DialEntity` instance. Pass `null` for no initial data.

#### `Episode($data = null)`

Create a new `EpisodeEntity` instance. Pass `null` for no initial data.

#### `Film($data = null)`

Create a new `FilmEntity` instance. Pass `null` for no initial data.

#### `Fruit($data = null)`

Create a new `FruitEntity` instance. Pass `null` for no initial data.

#### `Gear($data = null)`

Create a new `GearEntity` instance. Pass `null` for no initial data.

#### `Haki($data = null)`

Create a new `HakiEntity` instance. Pass `null` for no initial data.

#### `Location($data = null)`

Create a new `LocationEntity` instance. Pass `null` for no initial data.

#### `Saga($data = null)`

Create a new `SagaEntity` instance. Pass `null` for no initial data.

#### `Sword($data = null)`

Create a new `SwordEntity` instance. Pass `null` for no initial data.

#### `Technique($data = null)`

Create a new `TechniqueEntity` instance. Pass `null` for no initial data.

#### `Volume($data = null)`

Create a new `VolumeEntity` instance. Pass `null` for no initial data.

#### `options_map(): array`

Return a deep copy of the current SDK options.

#### `get_utility(): OnePieceUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## BoatEntity

```php
$boat = $client->Boat();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `string` | No | Crew that owns the boat |
| `description` | `string` | No | Description of the boat |
| `id` | `int` | No | Unique identifier for the boat |
| `name` | `string` | No | Name of the boat/ship |
| `type` | `string` | No | Type of vessel |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Boat()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Boat()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BoatEntity`

Create a new `BoatEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## BowEntity

```php
$bow = $client->Bow();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the bow |
| `id` | `int` | No | Unique identifier for the bow |
| `name` | `string` | No | Name of the bow |
| `owner` | `string` | No | Owner of the bow |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Bow()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Bow()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): BowEntity`

Create a new `BowEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## ChapterEntity

```php
$chapter = $client->Chapter();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Unique identifier for the chapter |
| `number` | `int` | No | Chapter number |
| `releaseDate` | `string` | No | Release date of the chapter |
| `saga` | `string` | No | Saga this chapter belongs to |
| `title` | `string` | No | Title of the chapter |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Chapter()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Chapter()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): ChapterEntity`

Create a new `ChapterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CharacterEntity

```php
$character = $client->Character();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `int` | No | Age of the character |
| `bounty` | `int` | No | Bounty of the character |
| `crew` | `string` | No | Crew affiliation |
| `description` | `string` | No | Description of the character |
| `devilFruit` | `string` | No | Devil Fruit ability if applicable |
| `id` | `int` | No | Unique identifier for the character |
| `name` | `string` | No | Name of the character |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Character()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Character()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CharacterEntity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## CrewEntity

```php
$crew = $client->Crew();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captain` | `string` | No | Captain of the crew |
| `description` | `string` | No | Description of the crew |
| `id` | `int` | No | Unique identifier for the crew |
| `members` | `array` | No | Members of the crew |
| `name` | `string` | No | Name of the crew |
| `ship` | `string` | No | Name of the crew's ship |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Crew()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Crew()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): CrewEntity`

Create a new `CrewEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## DialEntity

```php
$dial = $client->Dial();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the dial's function |
| `id` | `int` | No | Unique identifier for the dial |
| `name` | `string` | No | Name of the dial |
| `type` | `string` | No | Type of dial |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Dial()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Dial()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): DialEntity`

Create a new `DialEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## EpisodeEntity

```php
$episode = $client->Episode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airDate` | `string` | No | Air date of the episode |
| `id` | `int` | No | Unique identifier for the episode |
| `number` | `int` | No | Episode number |
| `saga` | `string` | No | Saga this episode belongs to |
| `title` | `string` | No | Title of the episode |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Episode()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Episode()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): EpisodeEntity`

Create a new `EpisodeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FilmEntity

```php
$film = $client->Film();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the film |
| `id` | `int` | No | Unique identifier for the film |
| `releaseDate` | `string` | No | Release date of the film |
| `title` | `string` | No | Title of the film |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Film()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Film()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FilmEntity`

Create a new `FilmEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## FruitEntity

```php
$fruit = $client->Fruit();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the Devil Fruit's powers |
| `id` | `int` | No | Unique identifier for the Devil Fruit |
| `name` | `string` | No | Name of the Devil Fruit |
| `type` | `string` | No | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `string` | No | Current or known user of the fruit |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Fruit()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Fruit()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): FruitEntity`

Create a new `FruitEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## GearEntity

```php
$gear = $client->Gear();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the gear's abilities |
| `firstAppearance` | `string` | No | First appearance of this gear |
| `id` | `int` | No | Unique identifier for the gear |
| `name` | `string` | No | Name of the gear form |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Gear()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Gear()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): GearEntity`

Create a new `GearEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## HakiEntity

```php
$haki = $client->Haki();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the Haki type |
| `id` | `int` | No | Unique identifier for the Haki type |
| `name` | `string` | No | Name of the Haki type |
| `users` | `array` | No | Known users of this Haki type |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Haki()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Haki()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): HakiEntity`

Create a new `HakiEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## LocationEntity

```php
$location = $client->Location();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the location |
| `firstAppearance` | `string` | No | First appearance of this location |
| `id` | `int` | No | Unique identifier for the location |
| `name` | `string` | No | Name of the location |
| `type` | `string` | No | Type of location (island, sea, etc.) |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Location()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Location()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): LocationEntity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SagaEntity

```php
$saga = $client->Saga();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapters` | `array` | No | Chapter IDs included in this saga |
| `description` | `string` | No | Description of the saga |
| `episodes` | `array` | No | Episode IDs included in this saga |
| `id` | `int` | No | Unique identifier for the saga |
| `name` | `string` | No | Name of the saga |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Saga()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Saga()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SagaEntity`

Create a new `SagaEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## SwordEntity

```php
$sword = $client->Sword();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the sword |
| `grade` | `string` | No | Grade of the sword |
| `id` | `int` | No | Unique identifier for the sword |
| `name` | `string` | No | Name of the sword |
| `owner` | `string` | No | Current owner of the sword |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Sword()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Sword()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): SwordEntity`

Create a new `SwordEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## TechniqueEntity

```php
$technique = $client->Technique();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the technique |
| `gear` | `string` | No | Associated gear form if applicable |
| `id` | `int` | No | Unique identifier for the technique |
| `name` | `string` | No | Name of the technique |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Technique()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Technique()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): TechniqueEntity`

Create a new `TechniqueEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## VolumeEntity

```php
$volume = $client->Volume();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapters` | `array` | No | Chapter IDs included in this volume |
| `id` | `int` | No | Unique identifier for the volume |
| `number` | `int` | No | Volume number |
| `releaseDate` | `string` | No | Release date of the volume |
| `title` | `string` | No | Title of the volume |

### Operations

#### `list(?array $reqmatch = null, ?array $ctrl = null): mixed`

List entities matching the given criteria (call with no argument to list all). Returns an array. Throws on error.

```php
$results = $client->Volume()->list();
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->Volume()->load(["id" => 1]);
```

### Common Methods

#### `data_get(): array`

Get the entity data. Returns a copy of the current data.

#### `data_set($data): void`

Set the entity data.

#### `match_get(): array`

Get the entity match criteria.

#### `match_set($match): void`

Set the entity match criteria.

#### `make(): VolumeEntity`

Create a new `VolumeEntity` instance with the same client and
options.

#### `get_name(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new OnePieceSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

In-memory mock transport for testing without a live server.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

Options above are those the model carries a default for. A feature may
also accept callback options — a `sink` to receive each record, for
instance — which have no default and are covered in the full feature
reference.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.

