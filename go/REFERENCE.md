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
fmt.Println(boat.GetName()) // "boat"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Boat(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Boat(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(bow.GetName()) // "bow"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Bow(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Bow(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(chapter.GetName()) // "chapter"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `number` | `int` | No |  |
| `release_date` | `string` | No |  |
| `saga` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Chapter(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Chapter(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(character.GetName()) // "character"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `int` | No |  |
| `bounty` | `int` | No |  |
| `crew` | `string` | No |  |
| `description` | `string` | No |  |
| `devil_fruit` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Character(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Character(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(crew.GetName()) // "crew"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captain` | `string` | No |  |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `member` | `[]any` | No |  |
| `name` | `string` | No |  |
| `ship` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Crew(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Crew(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(dial.GetName()) // "dial"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Dial(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Dial(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(episode.GetName()) // "episode"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `air_date` | `string` | No |  |
| `id` | `int` | No |  |
| `number` | `int` | No |  |
| `saga` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Episode(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Episode(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(film.GetName()) // "film"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `release_date` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Film(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Film(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(fruit.GetName()) // "fruit"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |
| `user` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Fruit(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Fruit(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(gear.GetName()) // "gear"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `first_appearance` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Gear(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Gear(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(haki.GetName()) // "haki"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `user` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Haki(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Haki(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(location.GetName()) // "location"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `first_appearance` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `type` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Location(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(saga.GetName()) // "saga"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapter` | `[]any` | No |  |
| `description` | `string` | No |  |
| `episode` | `[]any` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Saga(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Saga(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(sword.GetName()) // "sword"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `grade` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `owner` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Sword(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Sword(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(technique.GetName()) // "technique"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No |  |
| `gear` | `string` | No |  |
| `id` | `int` | No |  |
| `name` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Technique(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Technique(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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
fmt.Println(volume.GetName()) // "volume"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapter` | `[]any` | No |  |
| `id` | `int` | No |  |
| `number` | `int` | No |  |
| `release_date` | `string` | No |  |
| `title` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Volume(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Volume(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

