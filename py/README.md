# OnePiece Python SDK

The Python SDK for the OnePiece API. Provides an entity-oriented interface following Pythonic conventions.


## Install
```bash
pip install one-piece-sdk
```

Or install from source:

```bash
pip install -e .
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```python
from onepiece_sdk import OnePieceSDK

client = OnePieceSDK({})
```

### 2. List boats

```python
result, err = client.Boat(None).list(None, None)
if err:
    raise Exception(err)

if isinstance(result, list):
    for item in result:
        d = item.data_get()
        print(d["id"], d["name"])
```

### 3. Load a boat

```python
result, err = client.Boat(None).load({"id": "example_id"}, None)
if err:
    raise Exception(err)
print(result)
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

if result["ok"]:
    print(result["status"])  # 200
    print(result["data"])    # response body
```

### Prepare a request without sending it

```python
fetchdef, err = client.prepare({
    "path": "/api/resource/{id}",
    "method": "DELETE",
    "params": {"id": "example"},
})
if err:
    raise Exception(err)

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```python
client = OnePieceSDK.test(None, None)

result, err = client.OnePiece(None).load(
    {"id": "test01"}, None
)
# result contains mock response data
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
ONE-PIECE_TEST_LIVE=TRUE
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
| `prepare` | `(fetchargs) -> (dict, err)` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> (dict, err)` | Build and send an HTTP request. |
| `Boat` | `(data) -> BoatEntity` | Create a Boat entity instance. |
| `Bow` | `(data) -> BowEntity` | Create a Bow entity instance. |
| `Chapter` | `(data) -> ChapterEntity` | Create a Chapter entity instance. |
| `Character` | `(data) -> CharacterEntity` | Create a Character entity instance. |
| `Crew` | `(data) -> CrewEntity` | Create a Crew entity instance. |
| `Dial` | `(data) -> DialEntity` | Create a Dial entity instance. |
| `Episode` | `(data) -> EpisodeEntity` | Create a Episode entity instance. |
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
| `load` | `(reqmatch, ctrl) -> (any, err)` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> (any, err)` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> (any, err)` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> (any, err)` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> (any, err)` | Remove an entity. |
| `data_get` | `() -> dict` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> dict` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> str` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`dict` with these keys:

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

Create an instance: `const boat = client.Boat()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const boat = await client.Boat().load({ id: 'boat_id' })
```

#### Example: List

```ts
const boats = await client.Boat().list()
```


### Bow

Create an instance: `const bow = client.Bow()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `owner` | ``$STRING`` |  |

#### Example: Load

```ts
const bow = await client.Bow().load({ id: 'bow_id' })
```

#### Example: List

```ts
const bows = await client.Bow().list()
```


### Chapter

Create an instance: `const chapter = client.Chapter()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$INTEGER`` |  |
| `number` | ``$INTEGER`` |  |
| `release_date` | ``$STRING`` |  |
| `saga` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```ts
const chapter = await client.Chapter().load({ id: 'chapter_id' })
```

#### Example: List

```ts
const chapters = await client.Chapter().list()
```


### Character

Create an instance: `const character = client.Character()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `age` | ``$INTEGER`` |  |
| `bounty` | ``$INTEGER`` |  |
| `crew` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `devil_fruit` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```ts
const character = await client.Character().load({ id: 'character_id' })
```

#### Example: List

```ts
const characters = await client.Character().list()
```


### Crew

Create an instance: `const crew = client.Crew()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `captain` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `member` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `ship` | ``$STRING`` |  |

#### Example: Load

```ts
const crew = await client.Crew().load({ id: 'crew_id' })
```

#### Example: List

```ts
const crews = await client.Crew().list()
```


### Dial

Create an instance: `const dial = client.Dial()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const dial = await client.Dial().load({ id: 'dial_id' })
```

#### Example: List

```ts
const dials = await client.Dial().list()
```


### Episode

Create an instance: `const episode = client.Episode()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `air_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `number` | ``$INTEGER`` |  |
| `saga` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```ts
const episode = await client.Episode().load({ id: 'episode_id' })
```

#### Example: List

```ts
const episodes = await client.Episode().list()
```


### Film

Create an instance: `const film = client.Film()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `release_date` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```ts
const film = await client.Film().load({ id: 'film_id' })
```

#### Example: List

```ts
const films = await client.Film().list()
```


### Fruit

Create an instance: `const fruit = client.Fruit()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `user` | ``$STRING`` |  |

#### Example: Load

```ts
const fruit = await client.Fruit().load({ id: 'fruit_id' })
```

#### Example: List

```ts
const fruits = await client.Fruit().list()
```


### Gear

Create an instance: `const gear = client.Gear()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `first_appearance` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```ts
const gear = await client.Gear().load({ id: 'gear_id' })
```

#### Example: List

```ts
const gears = await client.Gear().list()
```


### Haki

Create an instance: `const haki = client.Haki()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `user` | ``$ARRAY`` |  |

#### Example: Load

```ts
const haki = await client.Haki().load({ id: 'haki_id' })
```

#### Example: List

```ts
const hakis = await client.Haki().list()
```


### Location

Create an instance: `const location = client.Location()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `first_appearance` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```ts
const location = await client.Location().load({ id: 'location_id' })
```

#### Example: List

```ts
const locations = await client.Location().list()
```


### Saga

Create an instance: `const saga = client.Saga()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | ``$ARRAY`` |  |
| `description` | ``$STRING`` |  |
| `episode` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```ts
const saga = await client.Saga().load({ id: 'saga_id' })
```

#### Example: List

```ts
const sagas = await client.Saga().list()
```


### Sword

Create an instance: `const sword = client.Sword()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `grade` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `owner` | ``$STRING`` |  |

#### Example: Load

```ts
const sword = await client.Sword().load({ id: 'sword_id' })
```

#### Example: List

```ts
const swords = await client.Sword().list()
```


### Technique

Create an instance: `const technique = client.Technique()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `gear` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```ts
const technique = await client.Technique().load({ id: 'technique_id' })
```

#### Example: List

```ts
const techniques = await client.Technique().list()
```


### Volume

Create an instance: `const volume = client.Volume()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `number` | ``$INTEGER`` |  |
| `release_date` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```ts
const volume = await client.Volume().load({ id: 'volume_id' })
```

#### Example: List

```ts
const volumes = await client.Volume().list()
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller as the second element in the return tuple.

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```python
moon = client.Moon()
moon.load({"planet_id": "earth", "id": "luna"})

# moon.data_get() now returns the loaded moon data
# moon.match_get() returns the last match criteria
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
