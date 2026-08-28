# OnePiece TypeScript SDK



The TypeScript SDK for the OnePiece API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Boat()` — each with a small set of operations (`list`, `load`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/one-piece-sdk/releases](https://github.com/voxgig-sdk/one-piece-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OnePieceSDK } from '@voxgig-sdk/one-piece'

const client = new OnePieceSDK()
```

### 2. List boat records

`list()` resolves to an array of Boat ENTITIES — every operation
resolves to entities, not raw records. Iterate them directly, and call
`.data()` on one for the record it holds:

```ts
const boats = await client.Boat().list()

for (const boat of boats) {
  console.log(boat)
}
```

### 3. Load a boat

`load()` returns the entity directly and throws on failure:

```ts
try {
  const boat = await client.Boat().load({ id: 1 })
  console.log(boat)
} catch (err) {
  console.error('load failed:', err)
}
```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const boats = await client.Boat().list()
  console.log(boats)
} catch (err) {
  console.error('list failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OnePieceSDK.test()

const boat = await client.Boat().list()
// boat is the entity, populated with mock response data
// — call boat.data() for the record itself
console.log(boat)
```

You can also use the instance method:

```ts
const client = new OnePieceSDK()
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Boat()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OnePieceSDK({
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ONE_PIECE_TEST_LIVE=TRUE
```

Then run:

```bash
cd ts && npm test
```


## Reference

### OnePieceSDK

#### Constructor

```ts
new OnePieceSDK(options?: {
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Boat(data?)` | `BoatEntity` | Create a Boat entity instance. |
| `Bow(data?)` | `BowEntity` | Create a Bow entity instance. |
| `Chapter(data?)` | `ChapterEntity` | Create a Chapter entity instance. |
| `Character(data?)` | `CharacterEntity` | Create a Character entity instance. |
| `Crew(data?)` | `CrewEntity` | Create a Crew entity instance. |
| `Dial(data?)` | `DialEntity` | Create a Dial entity instance. |
| `Episode(data?)` | `EpisodeEntity` | Create an Episode entity instance. |
| `Film(data?)` | `FilmEntity` | Create a Film entity instance. |
| `Fruit(data?)` | `FruitEntity` | Create a Fruit entity instance. |
| `Gear(data?)` | `GearEntity` | Create a Gear entity instance. |
| `Haki(data?)` | `HakiEntity` | Create a Haki entity instance. |
| `Location(data?)` | `LocationEntity` | Create a Location entity instance. |
| `Saga(data?)` | `SagaEntity` | Create a Saga entity instance. |
| `Sword(data?)` | `SwordEntity` | Create a Sword entity instance. |
| `Technique(data?)` | `TechniqueEntity` | Create a Technique entity instance. |
| `Volume(data?)` | `VolumeEntity` | Create a Volume entity instance. |
| `tester(testopts?, sdkopts?)` | `OnePieceSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OnePieceSDK.test(testopts?, sdkopts?)` | `OnePieceSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OnePieceSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` resolves to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Boat

| Field | Description |
| --- | --- |
| `crew` | Crew that owns the boat |
| `description` | Description of the boat |
| `id` | Unique identifier for the boat |
| `name` | Name of the boat/ship |
| `type` | Type of vessel |

Operations: list, load.

API path: `/boats`

#### Bow

| Field | Description |
| --- | --- |
| `description` | Description of the bow |
| `id` | Unique identifier for the bow |
| `name` | Name of the bow |
| `owner` | Owner of the bow |

Operations: list, load.

API path: `/bows`

#### Chapter

| Field | Description |
| --- | --- |
| `id` | Unique identifier for the chapter |
| `number` | Chapter number |
| `releaseDate` | Release date of the chapter |
| `saga` | Saga this chapter belongs to |
| `title` | Title of the chapter |

Operations: list, load.

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

Operations: list, load.

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

Operations: list, load.

API path: `/crews`

#### Dial

| Field | Description |
| --- | --- |
| `description` | Description of the dial's function |
| `id` | Unique identifier for the dial |
| `name` | Name of the dial |
| `type` | Type of dial |

Operations: list, load.

API path: `/dials`

#### Episode

| Field | Description |
| --- | --- |
| `airDate` | Air date of the episode |
| `id` | Unique identifier for the episode |
| `number` | Episode number |
| `saga` | Saga this episode belongs to |
| `title` | Title of the episode |

Operations: list, load.

API path: `/episodes`

#### Film

| Field | Description |
| --- | --- |
| `description` | Description of the film |
| `id` | Unique identifier for the film |
| `releaseDate` | Release date of the film |
| `title` | Title of the film |

Operations: list, load.

API path: `/films`

#### Fruit

| Field | Description |
| --- | --- |
| `description` | Description of the Devil Fruit's powers |
| `id` | Unique identifier for the Devil Fruit |
| `name` | Name of the Devil Fruit |
| `type` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | Current or known user of the fruit |

Operations: list, load.

API path: `/fruits`

#### Gear

| Field | Description |
| --- | --- |
| `description` | Description of the gear's abilities |
| `firstAppearance` | First appearance of this gear |
| `id` | Unique identifier for the gear |
| `name` | Name of the gear form |

Operations: list, load.

API path: `/gears`

#### Haki

| Field | Description |
| --- | --- |
| `description` | Description of the Haki type |
| `id` | Unique identifier for the Haki type |
| `name` | Name of the Haki type |
| `users` | Known users of this Haki type |

Operations: list, load.

API path: `/hakis`

#### Location

| Field | Description |
| --- | --- |
| `description` | Description of the location |
| `firstAppearance` | First appearance of this location |
| `id` | Unique identifier for the location |
| `name` | Name of the location |
| `type` | Type of location (island, sea, etc.) |

Operations: list, load.

API path: `/locations`

#### Saga

| Field | Description |
| --- | --- |
| `chapters` | Chapter IDs included in this saga |
| `description` | Description of the saga |
| `episodes` | Episode IDs included in this saga |
| `id` | Unique identifier for the saga |
| `name` | Name of the saga |

Operations: list, load.

API path: `/sagas`

#### Sword

| Field | Description |
| --- | --- |
| `description` | Description of the sword |
| `grade` | Grade of the sword |
| `id` | Unique identifier for the sword |
| `name` | Name of the sword |
| `owner` | Current owner of the sword |

Operations: list, load.

API path: `/swords`

#### Technique

| Field | Description |
| --- | --- |
| `description` | Description of the technique |
| `gear` | Associated gear form if applicable |
| `id` | Unique identifier for the technique |
| `name` | Name of the technique |

Operations: list, load.

API path: `/techniques`

#### Volume

| Field | Description |
| --- | --- |
| `chapters` | Chapter IDs included in this volume |
| `id` | Unique identifier for the volume |
| `number` | Volume number |
| `releaseDate` | Release date of the volume |
| `title` | Title of the volume |

Operations: list, load.

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
| `crew` | `string` | Crew that owns the boat |
| `description` | `string` | Description of the boat |
| `id` | `number` | Unique identifier for the boat |
| `name` | `string` | Name of the boat/ship |
| `type` | `string` | Type of vessel |

#### Example: Load

```ts
const boat = await client.Boat().load({ id: 1 })
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
| `description` | `string` | Description of the bow |
| `id` | `number` | Unique identifier for the bow |
| `name` | `string` | Name of the bow |
| `owner` | `string` | Owner of the bow |

#### Example: Load

```ts
const bow = await client.Bow().load({ id: 1 })
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
| `id` | `number` | Unique identifier for the chapter |
| `number` | `number` | Chapter number |
| `releaseDate` | `string` | Release date of the chapter |
| `saga` | `string` | Saga this chapter belongs to |
| `title` | `string` | Title of the chapter |

#### Example: Load

```ts
const chapter = await client.Chapter().load({ id: 1 })
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
| `age` | `number` | Age of the character |
| `bounty` | `number` | Bounty of the character |
| `crew` | `string` | Crew affiliation |
| `description` | `string` | Description of the character |
| `devilFruit` | `string` | Devil Fruit ability if applicable |
| `id` | `number` | Unique identifier for the character |
| `name` | `string` | Name of the character |

#### Example: Load

```ts
const character = await client.Character().load({ id: 1 })
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
| `captain` | `string` | Captain of the crew |
| `description` | `string` | Description of the crew |
| `id` | `number` | Unique identifier for the crew |
| `members` | `any[]` | Members of the crew |
| `name` | `string` | Name of the crew |
| `ship` | `string` | Name of the crew's ship |

#### Example: Load

```ts
const crew = await client.Crew().load({ id: 1 })
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
| `description` | `string` | Description of the dial's function |
| `id` | `number` | Unique identifier for the dial |
| `name` | `string` | Name of the dial |
| `type` | `string` | Type of dial |

#### Example: Load

```ts
const dial = await client.Dial().load({ id: 1 })
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
| `airDate` | `string` | Air date of the episode |
| `id` | `number` | Unique identifier for the episode |
| `number` | `number` | Episode number |
| `saga` | `string` | Saga this episode belongs to |
| `title` | `string` | Title of the episode |

#### Example: Load

```ts
const episode = await client.Episode().load({ id: 1 })
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
| `description` | `string` | Description of the film |
| `id` | `number` | Unique identifier for the film |
| `releaseDate` | `string` | Release date of the film |
| `title` | `string` | Title of the film |

#### Example: Load

```ts
const film = await client.Film().load({ id: 1 })
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
| `description` | `string` | Description of the Devil Fruit's powers |
| `id` | `number` | Unique identifier for the Devil Fruit |
| `name` | `string` | Name of the Devil Fruit |
| `type` | `string` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `string` | Current or known user of the fruit |

#### Example: Load

```ts
const fruit = await client.Fruit().load({ id: 1 })
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
| `description` | `string` | Description of the gear's abilities |
| `firstAppearance` | `string` | First appearance of this gear |
| `id` | `number` | Unique identifier for the gear |
| `name` | `string` | Name of the gear form |

#### Example: Load

```ts
const gear = await client.Gear().load({ id: 1 })
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
| `description` | `string` | Description of the Haki type |
| `id` | `number` | Unique identifier for the Haki type |
| `name` | `string` | Name of the Haki type |
| `users` | `any[]` | Known users of this Haki type |

#### Example: Load

```ts
const haki = await client.Haki().load({ id: 1 })
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
| `description` | `string` | Description of the location |
| `firstAppearance` | `string` | First appearance of this location |
| `id` | `number` | Unique identifier for the location |
| `name` | `string` | Name of the location |
| `type` | `string` | Type of location (island, sea, etc.) |

#### Example: Load

```ts
const location = await client.Location().load({ id: 1 })
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
| `chapters` | `any[]` | Chapter IDs included in this saga |
| `description` | `string` | Description of the saga |
| `episodes` | `any[]` | Episode IDs included in this saga |
| `id` | `number` | Unique identifier for the saga |
| `name` | `string` | Name of the saga |

#### Example: Load

```ts
const saga = await client.Saga().load({ id: 1 })
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
| `description` | `string` | Description of the sword |
| `grade` | `string` | Grade of the sword |
| `id` | `number` | Unique identifier for the sword |
| `name` | `string` | Name of the sword |
| `owner` | `string` | Current owner of the sword |

#### Example: Load

```ts
const sword = await client.Sword().load({ id: 1 })
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
| `description` | `string` | Description of the technique |
| `gear` | `string` | Associated gear form if applicable |
| `id` | `number` | Unique identifier for the technique |
| `name` | `string` | Name of the technique |

#### Example: Load

```ts
const technique = await client.Technique().load({ id: 1 })
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
| `chapters` | `any[]` | Chapter IDs included in this volume |
| `id` | `number` | Unique identifier for the volume |
| `number` | `number` | Volume number |
| `releaseDate` | `string` | Release date of the volume |
| `title` | `string` | Title of the volume |

#### Example: Load

```ts
const volume = await client.Volume().load({ id: 1 })
```

#### Example: List

```ts
const volumes = await client.Volume().list()
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

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
one-piece/
├── src/
│   ├── OnePieceSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OnePieceSDK } from '@voxgig-sdk/one-piece'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const boat = client.Boat()
await boat.list()

// boat.data() now returns the boat data from the last `list`
// boat.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
