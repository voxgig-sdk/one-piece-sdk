# OnePiece SDK

Query One Piece manga and anime data — sagas, chapters, volumes, episodes, characters, crews, fruits, hakis, and more

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About One Piece API

The One Piece API is a community-run JSON API published at [api-onepiece.com](https://api-onepiece.com) that exposes structured data about the One Piece manga and anime. The site is bilingual (English and French) and the current major version is `v2`, served from `https://api.api-onepiece.com/v2/...`.

What you get from the API:

- Story structure: sagas, chapters, volumes (tomes), episodes, films, and story arcs (bows).
- People and groups: characters and crews.
- World and lore: devil fruits, hakis, dials, locations.
- Combat and gear: swords, boats, Luffy's gears, and Luffy's techniques.

The API is read-only and does not document an authentication scheme or rate limits. CORS is reported as disabled across endpoints by the freepublicapis catalogue, so browser-side calls may need a proxy. Localised responses are selected via a language segment in the path (for example `/v2/characters/en` or `/v2/characters/fr`).

## Try it

**TypeScript**
```bash
npm install one-piece
```

**Python**
```bash
pip install one-piece-sdk
```

**PHP**
```bash
composer require voxgig/one-piece-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/one-piece-sdk/go
```

**Ruby**
```bash
gem install one-piece-sdk
```

**Lua**
```bash
luarocks install one-piece-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OnePieceSDK } from 'one-piece'

const client = new OnePieceSDK({})

// List all boats
const boats = await client.Boat().list()
```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o one-piece-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "one-piece": {
      "command": "/abs/path/to/one-piece-mcp"
    }
  }
}
```

## Entities

The API exposes 16 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Boat** | Ships and vessels that appear in the series, documented under `/en/documentation/14-boat`. | `/boats` |
| **Bow** | Story arcs ("arcs") that group chapters and episodes, documented under `/en/documentation/15-arc`. | `/bows` |
| **Chapter** | Individual manga chapters, documented under `/en/documentation/3-chapter`. | `/chapters` |
| **Character** | People and creatures in the One Piece world, served from `/v2/characters/{lang}` and documented under `/en/documentation/13-character`. | `/characters` |
| **Crew** | Pirate, marine, and revolutionary crews, documented under `/en/documentation/12-crew`. | `/crews` |
| **Dial** | Skypiean dials and their varieties, documented under `/en/documentation/6-dial`. | `/dials` |
| **Episode** | Anime episodes from the One Piece series, documented under `/en/documentation/5-episode`. | `/episodes` |
| **Film** | One Piece feature films, documented under `/en/documentation/7-movie`. | `/films` |
| **Fruit** | Devil fruits with their types and powers, served from `/v2/fruits/{lang}` and documented under `/en/documentation/2-fruit`. | `/fruits` |
| **Gear** | Luffy's gears (transformations / power-ups), documented under `/en/documentation/10-luffy-gear`. | `/gears` |
| **Haki** | Forms of haki (Observation, Armament, Conqueror's), documented under `/en/documentation/9-haki`. | `/hakis` |
| **Location** | Places, islands, and regions in the One Piece world, documented under `/en/documentation/16-locate`. | `/locations` |
| **Saga** | Major story sagas grouping multiple arcs, served from `/v2/sagas/{lang}` and documented under `/en/documentation/1-saga`. | `/sagas` |
| **Sword** | Notable swords and blades, documented under `/en/documentation/8-sword`. | `/swords` |
| **Technique** | Luffy's named techniques and attacks, documented under `/en/documentation/11-luffy-technique`. | `/techniques` |
| **Volume** | Collected manga volumes (tomes), documented under `/en/documentation/4-tome`. | `/volumes` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from onepiece_sdk import OnePieceSDK

client = OnePieceSDK({})

# List all boats
boats, err = client.Boat(None).list(None, None)

# Load a specific boat
boat, err = client.Boat(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'onepiece_sdk.php';

$client = new OnePieceSDK([]);

// List all boats
[$boats, $err] = $client->Boat(null)->list(null, null);

// Load a specific boat
[$boat, $err] = $client->Boat(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/one-piece-sdk/go"

client := sdk.NewOnePieceSDK(map[string]any{})

// List all boats
boats, err := client.Boat(nil).List(nil, nil)
```

### Ruby

```ruby
require_relative "OnePiece_sdk"

client = OnePieceSDK.new({})

# List all boats
boats, err = client.Boat(nil).list(nil, nil)

# Load a specific boat
boat, err = client.Boat(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("one-piece_sdk")

local client = sdk.new({})

-- List all boats
local boats, err = client:Boat(nil):list(nil, nil)

-- Load a specific boat
local boat, err = client:Boat(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OnePieceSDK.test()
const result = await client.Boat().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OnePieceSDK.test(None, None)
result, err = client.Boat(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OnePieceSDK::test(null, null);
[$result, $err] = $client->Boat(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Boat(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OnePieceSDK.test(nil, nil)
result, err = client.Boat(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Boat(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the One Piece API

- Upstream: [https://api-onepiece.com](https://api-onepiece.com)
- API docs: [https://api-onepiece.com/en/documentation](https://api-onepiece.com/en/documentation)

- The provider does not publish an explicit licence on its homepage or documentation.
- Underlying One Piece names, artwork, and lore are trademarks of Eiichiro Oda and Shueisha — this SDK only wraps the public JSON endpoints.
- Attribute the source (`api-onepiece.com`) when redistributing data and check the provider's site for any updated terms before commercial use.

---

Generated from the One Piece API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
