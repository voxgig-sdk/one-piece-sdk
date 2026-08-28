# OnePiece Lua SDK



The Lua SDK for the OnePiece API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Boat()` — each with the same small set of operations (`list`, `load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/one-piece-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("one-piece_sdk")

local client = sdk.new()
```

### 2. List boat records

Entity operations return `(value, err)`. For `list`, `value` is the
array of records itself — iterate it directly (there is no wrapper).

```lua
local boats, err = client:Boat():list()
if err then error(err) end

for _, item in ipairs(boats) do
  print(item["id"], item["crew"])
end
```

### 3. Load a boat

```lua
local boat, err = client:Boat():load({ id = 1 })
if err then error(err) end
print(boat)
```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local boats, err = client:Boat():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Boat():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
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
cd lua && busted test/
```


## Reference

### OnePieceSDK

```lua
local sdk = require("one-piece_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OnePieceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
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
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local boat, err = client:Boat():load({ id = "example_id" })
    if err then error(err) end
    -- boat is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Create an instance: `local boat = client:Boat(nil)`

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
| `id` | `number` | Unique identifier for the boat |
| `name` | `string` | Name of the boat/ship |
| `type` | `string` | Type of vessel |

#### Example: Load

```lua
local boat, err = client:Boat():load({ id = 1 })
```

#### Example: List

```lua
local boats, err = client:Boat():list()
```


### Bow

Create an instance: `local bow = client:Bow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the bow |
| `id` | `number` | Unique identifier for the bow |
| `name` | `string` | Name of the bow |
| `owner` | `string` | Owner of the bow |

#### Example: Load

```lua
local bow, err = client:Bow():load({ id = 1 })
```

#### Example: List

```lua
local bows, err = client:Bow():list()
```


### Chapter

Create an instance: `local chapter = client:Chapter(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` | Unique identifier for the chapter |
| `number` | `number` | Chapter number |
| `releaseDate` | `string` | Release date of the chapter |
| `saga` | `string` | Saga this chapter belongs to |
| `title` | `string` | Title of the chapter |

#### Example: Load

```lua
local chapter, err = client:Chapter():load({ id = 1 })
```

#### Example: List

```lua
local chapters, err = client:Chapter():list()
```


### Character

Create an instance: `local character = client:Character(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `number` | Age of the character |
| `bounty` | `number` | Bounty of the character |
| `crew` | `string` | Crew affiliation |
| `description` | `string` | Description of the character |
| `devilFruit` | `string` | Devil Fruit ability if applicable |
| `id` | `number` | Unique identifier for the character |
| `name` | `string` | Name of the character |

#### Example: Load

```lua
local character, err = client:Character():load({ id = 1 })
```

#### Example: List

```lua
local characters, err = client:Character():list()
```


### Crew

Create an instance: `local crew = client:Crew(nil)`

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
| `id` | `number` | Unique identifier for the crew |
| `members` | `table` | Members of the crew |
| `name` | `string` | Name of the crew |
| `ship` | `string` | Name of the crew's ship |

#### Example: Load

```lua
local crew, err = client:Crew():load({ id = 1 })
```

#### Example: List

```lua
local crews, err = client:Crew():list()
```


### Dial

Create an instance: `local dial = client:Dial(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the dial's function |
| `id` | `number` | Unique identifier for the dial |
| `name` | `string` | Name of the dial |
| `type` | `string` | Type of dial |

#### Example: Load

```lua
local dial, err = client:Dial():load({ id = 1 })
```

#### Example: List

```lua
local dials, err = client:Dial():list()
```


### Episode

Create an instance: `local episode = client:Episode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airDate` | `string` | Air date of the episode |
| `id` | `number` | Unique identifier for the episode |
| `number` | `number` | Episode number |
| `saga` | `string` | Saga this episode belongs to |
| `title` | `string` | Title of the episode |

#### Example: Load

```lua
local episode, err = client:Episode():load({ id = 1 })
```

#### Example: List

```lua
local episodes, err = client:Episode():list()
```


### Film

Create an instance: `local film = client:Film(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the film |
| `id` | `number` | Unique identifier for the film |
| `releaseDate` | `string` | Release date of the film |
| `title` | `string` | Title of the film |

#### Example: Load

```lua
local film, err = client:Film():load({ id = 1 })
```

#### Example: List

```lua
local films, err = client:Film():list()
```


### Fruit

Create an instance: `local fruit = client:Fruit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the Devil Fruit's powers |
| `id` | `number` | Unique identifier for the Devil Fruit |
| `name` | `string` | Name of the Devil Fruit |
| `type` | `string` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `string` | Current or known user of the fruit |

#### Example: Load

```lua
local fruit, err = client:Fruit():load({ id = 1 })
```

#### Example: List

```lua
local fruits, err = client:Fruit():list()
```


### Gear

Create an instance: `local gear = client:Gear(nil)`

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
| `id` | `number` | Unique identifier for the gear |
| `name` | `string` | Name of the gear form |

#### Example: Load

```lua
local gear, err = client:Gear():load({ id = 1 })
```

#### Example: List

```lua
local gears, err = client:Gear():list()
```


### Haki

Create an instance: `local haki = client:Haki(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `string` | Description of the Haki type |
| `id` | `number` | Unique identifier for the Haki type |
| `name` | `string` | Name of the Haki type |
| `users` | `table` | Known users of this Haki type |

#### Example: Load

```lua
local haki, err = client:Haki():load({ id = 1 })
```

#### Example: List

```lua
local hakis, err = client:Haki():list()
```


### Location

Create an instance: `local location = client:Location(nil)`

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
| `id` | `number` | Unique identifier for the location |
| `name` | `string` | Name of the location |
| `type` | `string` | Type of location (island, sea, etc.) |

#### Example: Load

```lua
local location, err = client:Location():load({ id = 1 })
```

#### Example: List

```lua
local locations, err = client:Location():list()
```


### Saga

Create an instance: `local saga = client:Saga(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapters` | `table` | Chapter IDs included in this saga |
| `description` | `string` | Description of the saga |
| `episodes` | `table` | Episode IDs included in this saga |
| `id` | `number` | Unique identifier for the saga |
| `name` | `string` | Name of the saga |

#### Example: Load

```lua
local saga, err = client:Saga():load({ id = 1 })
```

#### Example: List

```lua
local sagas, err = client:Saga():list()
```


### Sword

Create an instance: `local sword = client:Sword(nil)`

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
| `id` | `number` | Unique identifier for the sword |
| `name` | `string` | Name of the sword |
| `owner` | `string` | Current owner of the sword |

#### Example: Load

```lua
local sword, err = client:Sword():load({ id = 1 })
```

#### Example: List

```lua
local swords, err = client:Sword():list()
```


### Technique

Create an instance: `local technique = client:Technique(nil)`

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
| `id` | `number` | Unique identifier for the technique |
| `name` | `string` | Name of the technique |

#### Example: Load

```lua
local technique, err = client:Technique():load({ id = 1 })
```

#### Example: List

```lua
local techniques, err = client:Technique():list()
```


### Volume

Create an instance: `local volume = client:Volume(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapters` | `table` | Chapter IDs included in this volume |
| `id` | `number` | Unique identifier for the volume |
| `number` | `number` | Volume number |
| `releaseDate` | `string` | Release date of the volume |
| `title` | `string` | Title of the volume |

#### Example: Load

```lua
local volume, err = client:Volume():load({ id = 1 })
```

#### Example: List

```lua
local volumes, err = client:Volume():list()
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── one-piece_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`one-piece_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local boat = client:Boat()
boat:list()

-- boat:data_get() now returns the boat data from the last list
-- boat:match_get() returns the last match criteria
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
