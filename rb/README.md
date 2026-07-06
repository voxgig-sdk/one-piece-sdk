# OnePiece Ruby SDK



The Ruby SDK for the OnePiece API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Boat` — with named operations (`list`/`load`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/one-piece-sdk/releases](https://github.com/voxgig-sdk/one-piece-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "OnePiece_sdk"

client = OnePieceSDK.new
```

### 2. List boat records

```ruby
begin
  # list returns an Array of Boat records — iterate directly.
  boats = client.Boat.list
  boats.each do |item|
    puts "#{item["id"]} #{item["crew"]}"
  end
rescue => err
  warn "list failed: #{err}"
end
```

### 3. Load a boat

```ruby
begin
  # load returns the bare Boat record (raises on error).
  boat = client.Boat.load({ "id" => "example_id" })
  puts boat
rescue => err
  warn "load failed: #{err}"
end
```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  boats = client.Boat.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required. Seed fixture
data via the `entity` option so offline calls resolve without a live server:

```ruby
client = OnePieceSDK.test({
  "entity" => { "boat" => { "test01" => { "id" => "test01" } } },
})

# Entity ops return the bare mock record (raises on error).
boat = client.Boat.list()
puts boat
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = OnePieceSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
  },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ONE_PIECE_TEST_LIVE=TRUE
```

Then run:

```bash
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### OnePieceSDK

```ruby
require_relative "OnePiece_sdk"
client = OnePieceSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = OnePieceSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OnePieceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
| `Boat` | `(data) -> BoatEntity` | Create a Boat entity instance. |
| `Bow` | `(data) -> BowEntity` | Create a Bow entity instance. |
| `Chapter` | `(data) -> ChapterEntity` | Create a Chapter entity instance. |
| `Character` | `(data) -> CharacterEntity` | Create a Character entity instance. |
| `Crew` | `(data) -> CrewEntity` | Create a Crew entity instance. |
| `Dial` | `(data) -> DialEntity` | Create a Dial entity instance. |
| `Episode` | `(data) -> EpisodeEntity` | Create an Episode entity instance. |
| `Film` | `(data) -> FilmEntity` | Create a Film entity instance. |
| `Fruit` | `(data) -> FruitEntity` | Create a Fruit entity instance. |
| `Gear` | `(data) -> GearEntity` | Create a Gear entity instance. |
| `Haki` | `(data) -> HakiEntity` | Create a Haki entity instance. |
| `Location` | `(data) -> LocationEntity` | Create a Location entity instance. |
| `Saga` | `(data) -> SagaEntity` | Create a Saga entity instance. |
| `Sword` | `(data) -> SwordEntity` | Create a Sword entity instance. |
| `Technique` | `(data) -> TechniqueEntity` | Create a Technique entity instance. |
| `Volume` | `(data) -> VolumeEntity` | Create a Volume entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `OnePieceError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `boat = client.Boat`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `String` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Boat record (raises on error).
boat = client.Boat.load({ "id" => "boat_id" })
```

#### Example: List

```ruby
# list returns an Array of Boat records (raises on error).
boats = client.Boat.list
```


### Bow

Create an instance: `bow = client.Bow`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `owner` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Bow record (raises on error).
bow = client.Bow.load({ "id" => "bow_id" })
```

#### Example: List

```ruby
# list returns an Array of Bow records (raises on error).
bows = client.Bow.list
```


### Chapter

Create an instance: `chapter = client.Chapter`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` |  |
| `number` | `Integer` |  |
| `release_date` | `String` |  |
| `saga` | `String` |  |
| `title` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Chapter record (raises on error).
chapter = client.Chapter.load({ "id" => "chapter_id" })
```

#### Example: List

```ruby
# list returns an Array of Chapter records (raises on error).
chapters = client.Chapter.list
```


### Character

Create an instance: `character = client.Character`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `Integer` |  |
| `bounty` | `Integer` |  |
| `crew` | `String` |  |
| `description` | `String` |  |
| `devil_fruit` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Character record (raises on error).
character = client.Character.load({ "id" => "character_id" })
```

#### Example: List

```ruby
# list returns an Array of Character records (raises on error).
characters = client.Character.list
```


### Crew

Create an instance: `crew = client.Crew`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `captain` | `String` |  |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `member` | `Array` |  |
| `name` | `String` |  |
| `ship` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Crew record (raises on error).
crew = client.Crew.load({ "id" => "crew_id" })
```

#### Example: List

```ruby
# list returns an Array of Crew records (raises on error).
crews = client.Crew.list
```


### Dial

Create an instance: `dial = client.Dial`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Dial record (raises on error).
dial = client.Dial.load({ "id" => "dial_id" })
```

#### Example: List

```ruby
# list returns an Array of Dial records (raises on error).
dials = client.Dial.list
```


### Episode

Create an instance: `episode = client.Episode`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `air_date` | `String` |  |
| `id` | `Integer` |  |
| `number` | `Integer` |  |
| `saga` | `String` |  |
| `title` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Episode record (raises on error).
episode = client.Episode.load({ "id" => "episode_id" })
```

#### Example: List

```ruby
# list returns an Array of Episode records (raises on error).
episodes = client.Episode.list
```


### Film

Create an instance: `film = client.Film`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `release_date` | `String` |  |
| `title` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Film record (raises on error).
film = client.Film.load({ "id" => "film_id" })
```

#### Example: List

```ruby
# list returns an Array of Film records (raises on error).
films = client.Film.list
```


### Fruit

Create an instance: `fruit = client.Fruit`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `type` | `String` |  |
| `user` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Fruit record (raises on error).
fruit = client.Fruit.load({ "id" => "fruit_id" })
```

#### Example: List

```ruby
# list returns an Array of Fruit records (raises on error).
fruits = client.Fruit.list
```


### Gear

Create an instance: `gear = client.Gear`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `first_appearance` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Gear record (raises on error).
gear = client.Gear.load({ "id" => "gear_id" })
```

#### Example: List

```ruby
# list returns an Array of Gear records (raises on error).
gears = client.Gear.list
```


### Haki

Create an instance: `haki = client.Haki`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `user` | `Array` |  |

#### Example: Load

```ruby
# load returns the bare Haki record (raises on error).
haki = client.Haki.load({ "id" => "haki_id" })
```

#### Example: List

```ruby
# list returns an Array of Haki records (raises on error).
hakis = client.Haki.list
```


### Location

Create an instance: `location = client.Location`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `first_appearance` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `type` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Location record (raises on error).
location = client.Location.load({ "id" => "location_id" })
```

#### Example: List

```ruby
# list returns an Array of Location records (raises on error).
locations = client.Location.list
```


### Saga

Create an instance: `saga = client.Saga`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | `Array` |  |
| `description` | `String` |  |
| `episode` | `Array` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Saga record (raises on error).
saga = client.Saga.load({ "id" => "saga_id" })
```

#### Example: List

```ruby
# list returns an Array of Saga records (raises on error).
sagas = client.Saga.list
```


### Sword

Create an instance: `sword = client.Sword`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `grade` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |
| `owner` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Sword record (raises on error).
sword = client.Sword.load({ "id" => "sword_id" })
```

#### Example: List

```ruby
# list returns an Array of Sword records (raises on error).
swords = client.Sword.list
```


### Technique

Create an instance: `technique = client.Technique`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `String` |  |
| `gear` | `String` |  |
| `id` | `Integer` |  |
| `name` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Technique record (raises on error).
technique = client.Technique.load({ "id" => "technique_id" })
```

#### Example: List

```ruby
# list returns an Array of Technique records (raises on error).
techniques = client.Technique.list
```


### Volume

Create an instance: `volume = client.Volume`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | `Array` |  |
| `id` | `Integer` |  |
| `number` | `Integer` |  |
| `release_date` | `String` |  |
| `title` | `String` |  |

#### Example: Load

```ruby
# load returns the bare Volume record (raises on error).
volume = client.Volume.load({ "id" => "volume_id" })
```

#### Example: List

```ruby
# list returns an Array of Volume records (raises on error).
volumes = client.Volume.list
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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── OnePiece_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`OnePiece_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
boat = client.Boat
boat.list()

# boat.data_get now returns the boat data from the last list
# boat.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
