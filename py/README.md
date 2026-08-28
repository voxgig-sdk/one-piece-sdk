# OnePiece Python SDK



The Python SDK for the OnePiece API — an entity-oriented client following Pythonic conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Boat()` — each
carrying a small, uniform set of operations (`list`, `load`) instead of raw URL
paths and query strings. You work with named resources and verbs, which
keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to PyPI. Install it from the GitHub
release tag (`py/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/one-piece-sdk/releases)) or
from a source checkout:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from onepiece_sdk import OnePieceSDK

client = OnePieceSDK()
```

### 2. List boat records

`list()` returns a `list` of records (each a `dict`) and raises on
error — iterate it directly.

```python
try:
    boats = client.Boat().list()
    for boat in boats:
        print(boat)
except Exception as err:
    print(f"list failed: {err}")
```

### 3. Load a boat

`load()` returns the ENTITY — call data_get() for the record — and raises on error.

```python
try:
    boat = client.Boat().load({"id": 1})
    print(boat)
except Exception as err:
    print(f"load failed: {err}")
```


## Error handling

Entity operations raise on failure, so wrap them in `try` / `except`:

```python
try:
    boats = client.Boat().list()
    print(boats)
except Exception as err:
    print(f"list failed: {err}")
```

`direct()` does **not** raise — it returns the result envelope. Branch
on `ok`; on failure `status` holds the HTTP status (for error responses)
and `err` holds a transport error, so read both defensively:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example_id"},
})

if not result["ok"]:
    print("request failed:", result.get("status"), result.get("err"))
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
else:
    # A non-2xx response carries status + data (the error body); a
    # transport-level failure carries err instead. Only one is present, so
    # read both with .get() rather than indexing a key that may be absent.
    print(result.get("status"), result.get("err"))
```

### Prepare a request without sending it

```python
# prepare() returns the fetch definition and raises on error.
fetchdef = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = OnePieceSDK.test()

# Entity ops return the ENTITY and raises on error;
# call data_get() for the record.
boat = client.Boat().list()
# boat contains the mock response record
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```python
def mock_fetch(url, init):
    return {
        "status": 200,
        "statusText": "OK",
        "headers": {},
        "json": lambda: {"id": "mock01"},
    }, None

client = OnePieceSDK({
    "base": "http://localhost:8080",
    "system": {
        "fetch": mock_fetch,
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
cd py && pytest test/
```


## Reference

### OnePieceSDK

```python
from onepiece_sdk import OnePieceSDK

client = OnePieceSDK(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `base` | `str` | Base URL of the API server. |
| `prefix` | `str` | URL path prefix prepended to all requests. |
| `suffix` | `str` | URL path suffix appended to all requests. |
| `feature` | `dict` | Feature activation flags. |
| `extend` | `list` | Additional Feature instances to load. |
| `system` | `dict` | System overrides (e.g. custom `fetch` function). |

### test

```python
client = OnePieceSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `None`.

### OnePieceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> dict` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> dict` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> dict` | Build and send an HTTP request. Returns a result dict (branch on `ok`). |
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
| `list` | `(reqmatch, ctrl) -> list` | List entities matching the criteria. Raises on error. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return the ENTITY (call data_get() for the record) (a `dict` for single-entity
ops, a `list` for `list`) and raise on error. Wrap calls in
`try`/`except` to handle failures.

The `direct()` escape hatch never raises — it returns a result `dict`
you branch on via `result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `True` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `dict` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `False` and `err` contains the error value.

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

Create an instance: `boat = client.Boat()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | `str` | Crew that owns the boat |
| `description` | `str` | Description of the boat |
| `id` | `int` | Unique identifier for the boat |
| `name` | `str` | Name of the boat/ship |
| `type` | `str` | Type of vessel |

#### Example: Load

```python
boat = client.Boat().load({"id": 1})
```

#### Example: List

```python
boats = client.Boat().list()
```


### Bow

Create an instance: `bow = client.Bow()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the bow |
| `id` | `int` | Unique identifier for the bow |
| `name` | `str` | Name of the bow |
| `owner` | `str` | Owner of the bow |

#### Example: Load

```python
bow = client.Bow().load({"id": 1})
```

#### Example: List

```python
bows = client.Bow().list()
```


### Chapter

Create an instance: `chapter = client.Chapter()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Unique identifier for the chapter |
| `number` | `int` | Chapter number |
| `releaseDate` | `str` | Release date of the chapter |
| `saga` | `str` | Saga this chapter belongs to |
| `title` | `str` | Title of the chapter |

#### Example: Load

```python
chapter = client.Chapter().load({"id": 1})
```

#### Example: List

```python
chapters = client.Chapter().list()
```


### Character

Create an instance: `character = client.Character()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | `int` | Age of the character |
| `bounty` | `int` | Bounty of the character |
| `crew` | `str` | Crew affiliation |
| `description` | `str` | Description of the character |
| `devilFruit` | `str` | Devil Fruit ability if applicable |
| `id` | `int` | Unique identifier for the character |
| `name` | `str` | Name of the character |

#### Example: Load

```python
character = client.Character().load({"id": 1})
```

#### Example: List

```python
characters = client.Character().list()
```


### Crew

Create an instance: `crew = client.Crew()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `captain` | `str` | Captain of the crew |
| `description` | `str` | Description of the crew |
| `id` | `int` | Unique identifier for the crew |
| `members` | `list` | Members of the crew |
| `name` | `str` | Name of the crew |
| `ship` | `str` | Name of the crew's ship |

#### Example: Load

```python
crew = client.Crew().load({"id": 1})
```

#### Example: List

```python
crews = client.Crew().list()
```


### Dial

Create an instance: `dial = client.Dial()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the dial's function |
| `id` | `int` | Unique identifier for the dial |
| `name` | `str` | Name of the dial |
| `type` | `str` | Type of dial |

#### Example: Load

```python
dial = client.Dial().load({"id": 1})
```

#### Example: List

```python
dials = client.Dial().list()
```


### Episode

Create an instance: `episode = client.Episode()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `airDate` | `str` | Air date of the episode |
| `id` | `int` | Unique identifier for the episode |
| `number` | `int` | Episode number |
| `saga` | `str` | Saga this episode belongs to |
| `title` | `str` | Title of the episode |

#### Example: Load

```python
episode = client.Episode().load({"id": 1})
```

#### Example: List

```python
episodes = client.Episode().list()
```


### Film

Create an instance: `film = client.Film()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the film |
| `id` | `int` | Unique identifier for the film |
| `releaseDate` | `str` | Release date of the film |
| `title` | `str` | Title of the film |

#### Example: Load

```python
film = client.Film().load({"id": 1})
```

#### Example: List

```python
films = client.Film().list()
```


### Fruit

Create an instance: `fruit = client.Fruit()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the Devil Fruit's powers |
| `id` | `int` | Unique identifier for the Devil Fruit |
| `name` | `str` | Name of the Devil Fruit |
| `type` | `str` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `str` | Current or known user of the fruit |

#### Example: Load

```python
fruit = client.Fruit().load({"id": 1})
```

#### Example: List

```python
fruits = client.Fruit().list()
```


### Gear

Create an instance: `gear = client.Gear()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the gear's abilities |
| `firstAppearance` | `str` | First appearance of this gear |
| `id` | `int` | Unique identifier for the gear |
| `name` | `str` | Name of the gear form |

#### Example: Load

```python
gear = client.Gear().load({"id": 1})
```

#### Example: List

```python
gears = client.Gear().list()
```


### Haki

Create an instance: `haki = client.Haki()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the Haki type |
| `id` | `int` | Unique identifier for the Haki type |
| `name` | `str` | Name of the Haki type |
| `users` | `list` | Known users of this Haki type |

#### Example: Load

```python
haki = client.Haki().load({"id": 1})
```

#### Example: List

```python
hakis = client.Haki().list()
```


### Location

Create an instance: `location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the location |
| `firstAppearance` | `str` | First appearance of this location |
| `id` | `int` | Unique identifier for the location |
| `name` | `str` | Name of the location |
| `type` | `str` | Type of location (island, sea, etc.) |

#### Example: Load

```python
location = client.Location().load({"id": 1})
```

#### Example: List

```python
locations = client.Location().list()
```


### Saga

Create an instance: `saga = client.Saga()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapters` | `list` | Chapter IDs included in this saga |
| `description` | `str` | Description of the saga |
| `episodes` | `list` | Episode IDs included in this saga |
| `id` | `int` | Unique identifier for the saga |
| `name` | `str` | Name of the saga |

#### Example: Load

```python
saga = client.Saga().load({"id": 1})
```

#### Example: List

```python
sagas = client.Saga().list()
```


### Sword

Create an instance: `sword = client.Sword()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the sword |
| `grade` | `str` | Grade of the sword |
| `id` | `int` | Unique identifier for the sword |
| `name` | `str` | Name of the sword |
| `owner` | `str` | Current owner of the sword |

#### Example: Load

```python
sword = client.Sword().load({"id": 1})
```

#### Example: List

```python
swords = client.Sword().list()
```


### Technique

Create an instance: `technique = client.Technique()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | `str` | Description of the technique |
| `gear` | `str` | Associated gear form if applicable |
| `id` | `int` | Unique identifier for the technique |
| `name` | `str` | Name of the technique |

#### Example: Load

```python
technique = client.Technique().load({"id": 1})
```

#### Example: List

```python
techniques = client.Technique().list()
```


### Volume

Create an instance: `volume = client.Volume()`

#### Operations

| Method | Description |
| --- | --- |
| `list()` | List entities, optionally matching the given criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapters` | `list` | Chapter IDs included in this volume |
| `id` | `int` | Unique identifier for the volume |
| `number` | `int` | Volume number |
| `releaseDate` | `str` | Release date of the volume |
| `title` | `str` | Title of the volume |

#### Example: Load

```python
volume = client.Volume().load({"id": 1})
```

#### Example: List

```python
volumes = client.Volume().list()
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

Features are the extension mechanism. A feature is a Python class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as dicts

The Python SDK uses plain dicts throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a dict.

### Module structure

```
py/
├── onepiece_sdk.py         -- Main SDK module
├── config.py                    -- Configuration
├── features.py                  -- Feature factory
├── core/                        -- Core types and context
├── entity/                      -- Entity implementations
├── feature/                     -- Built-in features (Base, Test, Log)
├── utility/                     -- Utility functions and struct library
└── test/                        -- Test suites
```

The main module (`onepiece_sdk`) exports the SDK class.
Import entity or utility modules directly only when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```python
boat = client.Boat()
boat.list()

# boat.data_get() now returns the boat data from the last list
# boat.match_get() returns the last match criteria
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
