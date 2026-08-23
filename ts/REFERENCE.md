# OnePiece TypeScript SDK Reference

Complete API reference for the OnePiece TypeScript SDK.


## OnePieceSDK

### Constructor

```ts
new OnePieceSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OnePieceSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OnePieceSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OnePieceSDK` instance in test mode.


### Instance Methods

#### `Boat(data?: object)`

Create a new `Boat` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BoatEntity` instance.

#### `Bow(data?: object)`

Create a new `Bow` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `BowEntity` instance.

#### `Chapter(data?: object)`

Create a new `Chapter` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `ChapterEntity` instance.

#### `Character(data?: object)`

Create a new `Character` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CharacterEntity` instance.

#### `Crew(data?: object)`

Create a new `Crew` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `CrewEntity` instance.

#### `Dial(data?: object)`

Create a new `Dial` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DialEntity` instance.

#### `Episode(data?: object)`

Create a new `Episode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `EpisodeEntity` instance.

#### `Film(data?: object)`

Create a new `Film` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FilmEntity` instance.

#### `Fruit(data?: object)`

Create a new `Fruit` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `FruitEntity` instance.

#### `Gear(data?: object)`

Create a new `Gear` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GearEntity` instance.

#### `Haki(data?: object)`

Create a new `Haki` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `HakiEntity` instance.

#### `Location(data?: object)`

Create a new `Location` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `LocationEntity` instance.

#### `Saga(data?: object)`

Create a new `Saga` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SagaEntity` instance.

#### `Sword(data?: object)`

Create a new `Sword` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SwordEntity` instance.

#### `Technique(data?: object)`

Create a new `Technique` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TechniqueEntity` instance.

#### `Volume(data?: object)`

Create a new `Volume` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `VolumeEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OnePieceSDK.test()`.

**Returns:** `OnePieceSDK` instance in test mode.


---

## BoatEntity

```ts
const boat = client.Boat()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `crew` | `string` | No | Crew that owns the boat |
| `description` | `string` | No | Description of the boat |
| `id` | `number` | No | Unique identifier for the boat |
| `name` | `string` | No | Name of the boat/ship |
| `type` | `string` | No | Type of vessel |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Boat().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Boat().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BoatEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## BowEntity

```ts
const bow = client.Bow()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the bow |
| `id` | `number` | No | Unique identifier for the bow |
| `name` | `string` | No | Name of the bow |
| `owner` | `string` | No | Owner of the bow |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Bow().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Bow().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `BowEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## ChapterEntity

```ts
const chapter = client.Chapter()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No | Unique identifier for the chapter |
| `number` | `number` | No | Chapter number |
| `releaseDate` | `string` | No | Release date of the chapter |
| `saga` | `string` | No | Saga this chapter belongs to |
| `title` | `string` | No | Title of the chapter |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Chapter().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Chapter().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `ChapterEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CharacterEntity

```ts
const character = client.Character()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `age` | `number` | No | Age of the character |
| `bounty` | `number` | No | Bounty of the character |
| `crew` | `string` | No | Crew affiliation |
| `description` | `string` | No | Description of the character |
| `devilFruit` | `string` | No | Devil Fruit ability if applicable |
| `id` | `number` | No | Unique identifier for the character |
| `name` | `string` | No | Name of the character |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Character().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Character().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CharacterEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## CrewEntity

```ts
const crew = client.Crew()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `captain` | `string` | No | Captain of the crew |
| `description` | `string` | No | Description of the crew |
| `id` | `number` | No | Unique identifier for the crew |
| `members` | `any[]` | No | Members of the crew |
| `name` | `string` | No | Name of the crew |
| `ship` | `string` | No | Name of the crew's ship |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Crew().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Crew().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `CrewEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DialEntity

```ts
const dial = client.Dial()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the dial's function |
| `id` | `number` | No | Unique identifier for the dial |
| `name` | `string` | No | Name of the dial |
| `type` | `string` | No | Type of dial |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Dial().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Dial().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DialEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## EpisodeEntity

```ts
const episode = client.Episode()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `airDate` | `string` | No | Air date of the episode |
| `id` | `number` | No | Unique identifier for the episode |
| `number` | `number` | No | Episode number |
| `saga` | `string` | No | Saga this episode belongs to |
| `title` | `string` | No | Title of the episode |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Episode().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Episode().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `EpisodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FilmEntity

```ts
const film = client.Film()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the film |
| `id` | `number` | No | Unique identifier for the film |
| `releaseDate` | `string` | No | Release date of the film |
| `title` | `string` | No | Title of the film |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Film().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Film().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FilmEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## FruitEntity

```ts
const fruit = client.Fruit()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the Devil Fruit's powers |
| `id` | `number` | No | Unique identifier for the Devil Fruit |
| `name` | `string` | No | Name of the Devil Fruit |
| `type` | `string` | No | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `string` | No | Current or known user of the fruit |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Fruit().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Fruit().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `FruitEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GearEntity

```ts
const gear = client.Gear()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the gear's abilities |
| `firstAppearance` | `string` | No | First appearance of this gear |
| `id` | `number` | No | Unique identifier for the gear |
| `name` | `string` | No | Name of the gear form |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Gear().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Gear().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GearEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## HakiEntity

```ts
const haki = client.Haki()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the Haki type |
| `id` | `number` | No | Unique identifier for the Haki type |
| `name` | `string` | No | Name of the Haki type |
| `users` | `any[]` | No | Known users of this Haki type |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Haki().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Haki().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `HakiEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## LocationEntity

```ts
const location = client.Location()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the location |
| `firstAppearance` | `string` | No | First appearance of this location |
| `id` | `number` | No | Unique identifier for the location |
| `name` | `string` | No | Name of the location |
| `type` | `string` | No | Type of location (island, sea, etc.) |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Location().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Location().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `LocationEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SagaEntity

```ts
const saga = client.Saga()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapters` | `any[]` | No | Chapter IDs included in this saga |
| `description` | `string` | No | Description of the saga |
| `episodes` | `any[]` | No | Episode IDs included in this saga |
| `id` | `number` | No | Unique identifier for the saga |
| `name` | `string` | No | Name of the saga |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Saga().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Saga().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SagaEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SwordEntity

```ts
const sword = client.Sword()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the sword |
| `grade` | `string` | No | Grade of the sword |
| `id` | `number` | No | Unique identifier for the sword |
| `name` | `string` | No | Name of the sword |
| `owner` | `string` | No | Current owner of the sword |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Sword().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Sword().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SwordEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TechniqueEntity

```ts
const technique = client.Technique()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `description` | `string` | No | Description of the technique |
| `gear` | `string` | No | Associated gear form if applicable |
| `id` | `number` | No | Unique identifier for the technique |
| `name` | `string` | No | Name of the technique |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Technique().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Technique().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TechniqueEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## VolumeEntity

```ts
const volume = client.Volume()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `chapters` | `any[]` | No | Chapter IDs included in this volume |
| `id` | `number` | No | Unique identifier for the volume |
| `number` | `number` | No | Volume number |
| `releaseDate` | `string` | No | Release date of the volume |
| `title` | `string` | No | Title of the volume |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Volume().list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Volume().load({ id: 1 })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `VolumeEntity` instance with the same client and
options.

#### `client()`

Return the parent `OnePieceSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OnePieceSDK({
  feature: {
    test: { active: true },
  }
})
```

