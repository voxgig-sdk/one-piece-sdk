# OnePiece Python SDK Reference

Complete API reference for the OnePiece Python SDK.


## OnePieceSDK

### Constructor

```python
from one-piece_sdk import OnePieceSDK

client = OnePieceSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OnePieceSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OnePieceSDK.test()
```


### Instance Methods

#### `Boat(data=None)`

Create a new `BoatEntity` instance. Pass `None` for no initial data.

#### `Bow(data=None)`

Create a new `BowEntity` instance. Pass `None` for no initial data.

#### `Chapter(data=None)`

Create a new `ChapterEntity` instance. Pass `None` for no initial data.

#### `Character(data=None)`

Create a new `CharacterEntity` instance. Pass `None` for no initial data.

#### `Crew(data=None)`

Create a new `CrewEntity` instance. Pass `None` for no initial data.

#### `Dial(data=None)`

Create a new `DialEntity` instance. Pass `None` for no initial data.

#### `Episode(data=None)`

Create a new `EpisodeEntity` instance. Pass `None` for no initial data.

#### `Film(data=None)`

Create a new `FilmEntity` instance. Pass `None` for no initial data.

#### `Fruit(data=None)`

Create a new `FruitEntity` instance. Pass `None` for no initial data.

#### `Gear(data=None)`

Create a new `GearEntity` instance. Pass `None` for no initial data.

#### `Haki(data=None)`

Create a new `HakiEntity` instance. Pass `None` for no initial data.

#### `Location(data=None)`

Create a new `LocationEntity` instance. Pass `None` for no initial data.

#### `Saga(data=None)`

Create a new `SagaEntity` instance. Pass `None` for no initial data.

#### `Sword(data=None)`

Create a new `SwordEntity` instance. Pass `None` for no initial data.

#### `Technique(data=None)`

Create a new `TechniqueEntity` instance. Pass `None` for no initial data.

#### `Volume(data=None)`

Create a new `VolumeEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> tuple`

Make a direct HTTP request to any API endpoint. Returns `(result, err)`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `(result_dict, err)`

#### `prepare(fetchargs=None) -> tuple`

Prepare a fetch definition without sending. Returns `(fetchdef, err)`.


---

## BoatEntity

```python
boat = client.Boat()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Boat().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Boat().load({"id": "boat_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BoatEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## BowEntity

```python
bow = client.Bow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `owner` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Bow().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Bow().load({"id": "bow_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `BowEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## ChapterEntity

```python
chapter = client.Chapter()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Chapter().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Chapter().load({"id": "chapter_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `ChapterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CharacterEntity

```python
character = client.Character()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Character().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Character().load({"id": "character_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CharacterEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## CrewEntity

```python
crew = client.Crew()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Crew().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Crew().load({"id": "crew_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `CrewEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## DialEntity

```python
dial = client.Dial()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `type` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Dial().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Dial().load({"id": "dial_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `DialEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## EpisodeEntity

```python
episode = client.Episode()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Episode().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Episode().load({"id": "episode_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `EpisodeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FilmEntity

```python
film = client.Film()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `release_date` | ``$STRING`` | No |  |
| `title` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Film().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Film().load({"id": "film_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FilmEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## FruitEntity

```python
fruit = client.Fruit()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Fruit().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Fruit().load({"id": "fruit_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `FruitEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GearEntity

```python
gear = client.Gear()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `first_appearance` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Gear().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Gear().load({"id": "gear_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GearEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## HakiEntity

```python
haki = client.Haki()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `user` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Haki().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Haki().load({"id": "haki_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `HakiEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## LocationEntity

```python
location = client.Location()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Location().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Location().load({"id": "location_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `LocationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SagaEntity

```python
saga = client.Saga()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Saga().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Saga().load({"id": "saga_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SagaEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SwordEntity

```python
sword = client.Sword()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Sword().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Sword().load({"id": "sword_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SwordEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## TechniqueEntity

```python
technique = client.Technique()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | ``$STRING`` | No |  |
| `gear` | ``$STRING`` | No |  |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Technique().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Technique().load({"id": "technique_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `TechniqueEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## VolumeEntity

```python
volume = client.Volume()
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

#### `list(reqmatch, ctrl=None) -> tuple`

List entities matching the given criteria. Returns an array.

```python
results, err = client.Volume().list({})
```

#### `load(reqmatch, ctrl=None) -> tuple`

Load a single entity matching the given criteria.

```python
result, err = client.Volume().load({"id": "volume_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `VolumeEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OnePieceSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

