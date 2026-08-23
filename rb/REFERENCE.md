# OnePiece Ruby SDK Reference

Complete API reference for the OnePiece Ruby SDK.


## OnePieceSDK

### Constructor

```ruby
require_relative 'OnePiece_sdk'

client = OnePieceSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OnePieceSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OnePieceSDK.test
```


### Instance Methods

#### `Boat(data = nil)`

Create a new `Boat` entity instance. Pass `nil` for no initial data.

#### `Bow(data = nil)`

Create a new `Bow` entity instance. Pass `nil` for no initial data.

#### `Chapter(data = nil)`

Create a new `Chapter` entity instance. Pass `nil` for no initial data.

#### `Character(data = nil)`

Create a new `Character` entity instance. Pass `nil` for no initial data.

#### `Crew(data = nil)`

Create a new `Crew` entity instance. Pass `nil` for no initial data.

#### `Dial(data = nil)`

Create a new `Dial` entity instance. Pass `nil` for no initial data.

#### `Episode(data = nil)`

Create a new `Episode` entity instance. Pass `nil` for no initial data.

#### `Film(data = nil)`

Create a new `Film` entity instance. Pass `nil` for no initial data.

#### `Fruit(data = nil)`

Create a new `Fruit` entity instance. Pass `nil` for no initial data.

#### `Gear(data = nil)`

Create a new `Gear` entity instance. Pass `nil` for no initial data.

#### `Haki(data = nil)`

Create a new `Haki` entity instance. Pass `nil` for no initial data.

#### `Location(data = nil)`

Create a new `Location` entity instance. Pass `nil` for no initial data.

#### `Saga(data = nil)`

Create a new `Saga` entity instance. Pass `nil` for no initial data.

#### `Sword(data = nil)`

Create a new `Sword` entity instance. Pass `nil` for no initial data.

#### `Technique(data = nil)`

Create a new `Technique` entity instance. Pass `nil` for no initial data.

#### `Volume(data = nil)`

Create a new `Volume` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## BoatEntity

```ruby
boat = client.Boat
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `String` | No | Crew that owns the boat |
| `description` | `String` | No | Description of the boat |
| `id` | `Integer` | No | Unique identifier for the boat |
| `name` | `String` | No | Name of the boat/ship |
| `type` | `String` | No | Type of vessel |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Boat.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Boat.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BoatEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## BowEntity

```ruby
bow = client.Bow
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the bow |
| `id` | `Integer` | No | Unique identifier for the bow |
| `name` | `String` | No | Name of the bow |
| `owner` | `String` | No | Owner of the bow |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Bow.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Bow.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `BowEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## ChapterEntity

```ruby
chapter = client.Chapter
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | No | Unique identifier for the chapter |
| `number` | `Integer` | No | Chapter number |
| `releaseDate` | `String` | No | Release date of the chapter |
| `saga` | `String` | No | Saga this chapter belongs to |
| `title` | `String` | No | Title of the chapter |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Chapter.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Chapter.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `ChapterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CharacterEntity

```ruby
character = client.Character
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `Integer` | No | Age of the character |
| `bounty` | `Integer` | No | Bounty of the character |
| `crew` | `String` | No | Crew affiliation |
| `description` | `String` | No | Description of the character |
| `devilFruit` | `String` | No | Devil Fruit ability if applicable |
| `id` | `Integer` | No | Unique identifier for the character |
| `name` | `String` | No | Name of the character |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Character.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Character.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CharacterEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## CrewEntity

```ruby
crew = client.Crew
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captain` | `String` | No | Captain of the crew |
| `description` | `String` | No | Description of the crew |
| `id` | `Integer` | No | Unique identifier for the crew |
| `members` | `Array` | No | Members of the crew |
| `name` | `String` | No | Name of the crew |
| `ship` | `String` | No | Name of the crew's ship |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Crew.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Crew.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `CrewEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## DialEntity

```ruby
dial = client.Dial
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the dial's function |
| `id` | `Integer` | No | Unique identifier for the dial |
| `name` | `String` | No | Name of the dial |
| `type` | `String` | No | Type of dial |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Dial.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Dial.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `DialEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## EpisodeEntity

```ruby
episode = client.Episode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airDate` | `String` | No | Air date of the episode |
| `id` | `Integer` | No | Unique identifier for the episode |
| `number` | `Integer` | No | Episode number |
| `saga` | `String` | No | Saga this episode belongs to |
| `title` | `String` | No | Title of the episode |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Episode.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Episode.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `EpisodeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FilmEntity

```ruby
film = client.Film
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the film |
| `id` | `Integer` | No | Unique identifier for the film |
| `releaseDate` | `String` | No | Release date of the film |
| `title` | `String` | No | Title of the film |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Film.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Film.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FilmEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## FruitEntity

```ruby
fruit = client.Fruit
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the Devil Fruit's powers |
| `id` | `Integer` | No | Unique identifier for the Devil Fruit |
| `name` | `String` | No | Name of the Devil Fruit |
| `type` | `String` | No | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `String` | No | Current or known user of the fruit |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Fruit.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Fruit.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `FruitEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GearEntity

```ruby
gear = client.Gear
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the gear's abilities |
| `firstAppearance` | `String` | No | First appearance of this gear |
| `id` | `Integer` | No | Unique identifier for the gear |
| `name` | `String` | No | Name of the gear form |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Gear.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Gear.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GearEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## HakiEntity

```ruby
haki = client.Haki
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the Haki type |
| `id` | `Integer` | No | Unique identifier for the Haki type |
| `name` | `String` | No | Name of the Haki type |
| `users` | `Array` | No | Known users of this Haki type |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Haki.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Haki.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `HakiEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## LocationEntity

```ruby
location = client.Location
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the location |
| `firstAppearance` | `String` | No | First appearance of this location |
| `id` | `Integer` | No | Unique identifier for the location |
| `name` | `String` | No | Name of the location |
| `type` | `String` | No | Type of location (island, sea, etc.) |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Location.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Location.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `LocationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SagaEntity

```ruby
saga = client.Saga
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapters` | `Array` | No | Chapter IDs included in this saga |
| `description` | `String` | No | Description of the saga |
| `episodes` | `Array` | No | Episode IDs included in this saga |
| `id` | `Integer` | No | Unique identifier for the saga |
| `name` | `String` | No | Name of the saga |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Saga.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Saga.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SagaEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SwordEntity

```ruby
sword = client.Sword
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the sword |
| `grade` | `String` | No | Grade of the sword |
| `id` | `Integer` | No | Unique identifier for the sword |
| `name` | `String` | No | Name of the sword |
| `owner` | `String` | No | Current owner of the sword |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Sword.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Sword.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SwordEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## TechniqueEntity

```ruby
technique = client.Technique
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `String` | No | Description of the technique |
| `gear` | `String` | No | Associated gear form if applicable |
| `id` | `Integer` | No | Unique identifier for the technique |
| `name` | `String` | No | Name of the technique |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Technique.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Technique.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `TechniqueEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## VolumeEntity

```ruby
volume = client.Volume
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapters` | `Array` | No | Chapter IDs included in this volume |
| `id` | `Integer` | No | Unique identifier for the volume |
| `number` | `Integer` | No | Volume number |
| `releaseDate` | `String` | No | Release date of the volume |
| `title` | `String` | No | Title of the volume |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Volume.list
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Volume.load({ "id" => 1 })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `VolumeEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OnePieceSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

