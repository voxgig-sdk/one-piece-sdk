# OnePiece Lua SDK Reference

Complete API reference for the OnePiece Lua SDK.


## OnePieceSDK

### Constructor

```lua
local sdk = require("one-piece_sdk")
local client = sdk.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `table` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `table` | Custom headers for all requests. |
| `options.feature` | `table` | Feature configuration. |
| `options.system` | `table` | System overrides (e.g. custom fetch). |


### Static Methods

#### `sdk.test(testopts?, sdkopts?)`

Create a test client with mock features active. Both arguments are optional.

```lua
local client = sdk.test()
```


### Instance Methods

#### `Boat(data)`

Create a new `Boat` entity instance. Pass `nil` for no initial data.

#### `Bow(data)`

Create a new `Bow` entity instance. Pass `nil` for no initial data.

#### `Chapter(data)`

Create a new `Chapter` entity instance. Pass `nil` for no initial data.

#### `Character(data)`

Create a new `Character` entity instance. Pass `nil` for no initial data.

#### `Crew(data)`

Create a new `Crew` entity instance. Pass `nil` for no initial data.

#### `Dial(data)`

Create a new `Dial` entity instance. Pass `nil` for no initial data.

#### `Episode(data)`

Create a new `Episode` entity instance. Pass `nil` for no initial data.

#### `Film(data)`

Create a new `Film` entity instance. Pass `nil` for no initial data.

#### `Fruit(data)`

Create a new `Fruit` entity instance. Pass `nil` for no initial data.

#### `Gear(data)`

Create a new `Gear` entity instance. Pass `nil` for no initial data.

#### `Haki(data)`

Create a new `Haki` entity instance. Pass `nil` for no initial data.

#### `Location(data)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Saga(data)`

Create a new `Saga` entity instance. Pass `nil` for no initial data.

#### `Sword(data)`

Create a new `Sword` entity instance. Pass `nil` for no initial data.

#### `Technique(data)`

Create a new `Technique` entity instance. Pass `nil` for no initial data.

#### `Volume(data)`

Create a new `Volume` entity instance. Pass `nil` for no initial data.

#### `options_map() -> table`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs) -> table, err`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs.params` | `table` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `table` | Query string parameters. |
| `fetchargs.headers` | `table` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (tables are JSON-serialized). |
| `fetchargs.ctrl` | `table` | Control options (e.g. `{ explain = true }`). |

**Returns:** `table, err`

#### `prepare(fetchargs) -> table, err`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `table, err`


---

## BoatEntity

```lua
local boat = client:Boat(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Boat():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Boat():load({ id = "boat_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoatEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## BowEntity

```lua
local bow = client:Bow(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `owner` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Bow():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Bow():load({ id = "bow_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BowEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## ChapterEntity

```lua
local chapter = client:Chapter(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `number` | ``$INTEGER`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `saga` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Chapter():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Chapter():load({ id = "chapter_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ChapterEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CharacterEntity

```lua
local character = client:Character(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | ``$INTEGER`` | No |  |
| `bounty` | ``$INTEGER`` | No |  |
| `crew` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `devil_fruit` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Character():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Character():load({ id = "character_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## CrewEntity

```lua
local crew = client:Crew(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captain` | ``$STRING`` | No |  |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `member` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `ship` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Crew():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Crew():load({ id = "crew_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CrewEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## DialEntity

```lua
local dial = client:Dial(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Dial():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Dial():load({ id = "dial_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DialEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## EpisodeEntity

```lua
local episode = client:Episode(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `air_date` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `number` | ``$INTEGER`` | No |  |
| `saga` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Episode():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Episode():load({ id = "episode_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EpisodeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FilmEntity

```lua
local film = client:Film(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Film():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Film():load({ id = "film_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FilmEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## FruitEntity

```lua
local fruit = client:Fruit(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |
| `user` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Fruit():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Fruit():load({ id = "fruit_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FruitEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## GearEntity

```lua
local gear = client:Gear(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `first_appearance` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Gear():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Gear():load({ id = "gear_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GearEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## HakiEntity

```lua
local haki = client:Haki(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `user` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Haki():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Haki():load({ id = "haki_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HakiEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## LocationEntity

```lua
local location = client:Location(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `first_appearance` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Location():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Location():load({ id = "location_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SagaEntity

```lua
local saga = client:Saga(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapter` | ``$ARRAY`` | No |  |
| `description` | ``$STRING`` | No |  |
| `episode` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Saga():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Saga():load({ id = "saga_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SagaEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## SwordEntity

```lua
local sword = client:Sword(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `grade` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `owner` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Sword():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Sword():load({ id = "sword_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SwordEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## TechniqueEntity

```lua
local technique = client:Technique(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `gear` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Technique():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Technique():load({ id = "technique_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TechniqueEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## VolumeEntity

```lua
local volume = client:Volume(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapter` | ``$ARRAY`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `number` | ``$INTEGER`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl) -> any, err`

List entities matching the given criteria. Returns an array.

```lua
local results, err = client:Volume():list()
```

#### `load(reqmatch, ctrl) -> any, err`

Load a single entity matching the given criteria.

```lua
local result, err = client:Volume():load({ id = "volume_id" })
```

### Common Methods

#### `data_get() -> table`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> table`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VolumeEntity` instance with the same client and
options.

#### `get_name() -> string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```lua
local client = sdk.new({
  feature = {
    test = { active = true },
  },
})
```

