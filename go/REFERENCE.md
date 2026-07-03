# OnePiece Golang SDK Reference

Complete API reference for the OnePiece Golang SDK.


## OnePieceSDK

### Constructor

```go
func NewOnePieceSDK(options map[string]any) *OnePieceSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *OnePieceSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *OnePieceSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Boat(data map[string]any) OnePieceEntity`

Create a new `Boat` entity instance. Pass `nil` for no initial data.

#### `Bow(data map[string]any) OnePieceEntity`

Create a new `Bow` entity instance. Pass `nil` for no initial data.

#### `Chapter(data map[string]any) OnePieceEntity`

Create a new `Chapter` entity instance. Pass `nil` for no initial data.

#### `Character(data map[string]any) OnePieceEntity`

Create a new `Character` entity instance. Pass `nil` for no initial data.

#### `Crew(data map[string]any) OnePieceEntity`

Create a new `Crew` entity instance. Pass `nil` for no initial data.

#### `Dial(data map[string]any) OnePieceEntity`

Create a new `Dial` entity instance. Pass `nil` for no initial data.

#### `Episode(data map[string]any) OnePieceEntity`

Create a new `Episode` entity instance. Pass `nil` for no initial data.

#### `Film(data map[string]any) OnePieceEntity`

Create a new `Film` entity instance. Pass `nil` for no initial data.

#### `Fruit(data map[string]any) OnePieceEntity`

Create a new `Fruit` entity instance. Pass `nil` for no initial data.

#### `Gear(data map[string]any) OnePieceEntity`

Create a new `Gear` entity instance. Pass `nil` for no initial data.

#### `Haki(data map[string]any) OnePieceEntity`

Create a new `Haki` entity instance. Pass `nil` for no initial data.

#### `Location(data map[string]any) OnePieceEntity`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Saga(data map[string]any) OnePieceEntity`

Create a new `Saga` entity instance. Pass `nil` for no initial data.

#### `Sword(data map[string]any) OnePieceEntity`

Create a new `Sword` entity instance. Pass `nil` for no initial data.

#### `Technique(data map[string]any) OnePieceEntity`

Create a new `Technique` entity instance. Pass `nil` for no initial data.

#### `Volume(data map[string]any) OnePieceEntity`

Create a new `Volume` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## BoatEntity

```go
boat := client.Boat(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Boat(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Boat(nil).Load(map[string]any{"id": "boat_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BoatEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## BowEntity

```go
bow := client.Bow(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `owner` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Bow(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Bow(nil).Load(map[string]any{"id": "bow_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `BowEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## ChapterEntity

```go
chapter := client.Chapter(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Chapter(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Chapter(nil).Load(map[string]any{"id": "chapter_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `ChapterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CharacterEntity

```go
character := client.Character(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Character(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Character(nil).Load(map[string]any{"id": "character_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## CrewEntity

```go
crew := client.Crew(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Crew(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Crew(nil).Load(map[string]any{"id": "crew_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `CrewEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## DialEntity

```go
dial := client.Dial(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Dial(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Dial(nil).Load(map[string]any{"id": "dial_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `DialEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## EpisodeEntity

```go
episode := client.Episode(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Episode(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Episode(nil).Load(map[string]any{"id": "episode_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `EpisodeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FilmEntity

```go
film := client.Film(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Film(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Film(nil).Load(map[string]any{"id": "film_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FilmEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## FruitEntity

```go
fruit := client.Fruit(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Fruit(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Fruit(nil).Load(map[string]any{"id": "fruit_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `FruitEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GearEntity

```go
gear := client.Gear(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `first_appearance` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Gear(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Gear(nil).Load(map[string]any{"id": "gear_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GearEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## HakiEntity

```go
haki := client.Haki(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `user` | ``$ARRAY`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Haki(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Haki(nil).Load(map[string]any{"id": "haki_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `HakiEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## LocationEntity

```go
location := client.Location(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Location(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Location(nil).Load(map[string]any{"id": "location_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SagaEntity

```go
saga := client.Saga(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Saga(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Saga(nil).Load(map[string]any{"id": "saga_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SagaEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SwordEntity

```go
sword := client.Sword(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Sword(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Sword(nil).Load(map[string]any{"id": "sword_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SwordEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## TechniqueEntity

```go
technique := client.Technique(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `gear` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Technique(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Technique(nil).Load(map[string]any{"id": "technique_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `TechniqueEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## VolumeEntity

```go
volume := client.Volume(nil)
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

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Volume(nil).List(nil, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Volume(nil).Load(map[string]any{"id": "volume_id"}, nil)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `VolumeEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewOnePieceSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

