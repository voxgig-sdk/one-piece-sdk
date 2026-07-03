# OnePiece Golang SDK



The Golang SDK for the OnePiece API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/one-piece-sdk/go
```

If the module is not yet published to a registry, use a `replace` directive
in your `go.mod` to point to a local checkout:

```bash
go mod edit -replace github.com/voxgig-sdk/one-piece-sdk/go=../path/to/github.com/voxgig-sdk/one-piece-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```go
package main

import (
    "fmt"
    "os"

    sdk "github.com/voxgig-sdk/one-piece-sdk/go"
    "github.com/voxgig-sdk/one-piece-sdk/go/core"
)

func main() {
    client := sdk.NewOnePieceSDK(map[string]any{
        "apikey": os.Getenv("ONE-PIECE_APIKEY"),
    })
```

### 2. List boats

```go
    result, err := client.Boat(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }

    rm := core.ToMapAny(result)
    if rm["ok"] == true {
        for _, item := range rm["data"].([]any) {
            p := core.ToMapAny(item)
            fmt.Println(p["id"], p["name"])
        }
    }
```

### 3. Load a boat

```go
    result, err = client.Boat(nil).Load(
        map[string]any{"id": "example_id"}, nil,
    )
    if err != nil {
        panic(err)
    }

    rm = core.ToMapAny(result)
    if rm["ok"] == true {
        fmt.Println(rm["data"])
    }
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

result, err := client.Planet(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
// result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOnePieceSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
    },
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
ONE-PIECE_TEST_LIVE=TRUE
ONE-PIECE_APIKEY=<your-key>
```

Then run:

```bash
cd go && go test ./test/...
```


## Reference

### NewOnePieceSDK

```go
func NewOnePieceSDK(options map[string]any) *OnePieceSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OnePieceSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OnePieceSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Boat` | `(data map[string]any) OnePieceEntity` | Create a Boat entity instance. |
| `Bow` | `(data map[string]any) OnePieceEntity` | Create a Bow entity instance. |
| `Chapter` | `(data map[string]any) OnePieceEntity` | Create a Chapter entity instance. |
| `Character` | `(data map[string]any) OnePieceEntity` | Create a Character entity instance. |
| `Crew` | `(data map[string]any) OnePieceEntity` | Create a Crew entity instance. |
| `Dial` | `(data map[string]any) OnePieceEntity` | Create a Dial entity instance. |
| `Episode` | `(data map[string]any) OnePieceEntity` | Create a Episode entity instance. |
| `Film` | `(data map[string]any) OnePieceEntity` | Create a Film entity instance. |
| `Fruit` | `(data map[string]any) OnePieceEntity` | Create a Fruit entity instance. |
| `Gear` | `(data map[string]any) OnePieceEntity` | Create a Gear entity instance. |
| `Haki` | `(data map[string]any) OnePieceEntity` | Create a Haki entity instance. |
| `Location` | `(data map[string]any) OnePieceEntity` | Create a Location entity instance. |
| `Saga` | `(data map[string]any) OnePieceEntity` | Create a Saga entity instance. |
| `Sword` | `(data map[string]any) OnePieceEntity` | Create a Sword entity instance. |
| `Technique` | `(data map[string]any) OnePieceEntity` | Create a Technique entity instance. |
| `Volume` | `(data map[string]any) OnePieceEntity` | Create a Volume entity instance. |

### Entity interface (OnePieceEntity)

All entities implement the `OnePieceEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Update` | `(reqdata, ctrl map[string]any) (any, error)` | Update an existing entity. |
| `Remove` | `(reqmatch, ctrl map[string]any) (any, error)` | Remove an entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(any, error)`. The `any` value is a
`map[string]any` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `"ok"` | `bool` | `true` if the HTTP status is 2xx. |
| `"status"` | `int` | HTTP status code. |
| `"headers"` | `map[string]any` | Response headers. |
| `"data"` | `any` | Parsed JSON response body. |

On error, `"ok"` is `false` and `"err"` contains the error value.

### Entities

#### Boat

| Field | Description |
| --- | --- |
| `"crew"` |  |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/boats`

#### Bow

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"owner"` |  |

Operations: List, Load.

API path: `/bows`

#### Chapter

| Field | Description |
| --- | --- |
| `"id"` |  |
| `"number"` |  |
| `"release_date"` |  |
| `"saga"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/chapters`

#### Character

| Field | Description |
| --- | --- |
| `"age"` |  |
| `"bounty"` |  |
| `"crew"` |  |
| `"description"` |  |
| `"devil_fruit"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/characters`

#### Crew

| Field | Description |
| --- | --- |
| `"captain"` |  |
| `"description"` |  |
| `"id"` |  |
| `"member"` |  |
| `"name"` |  |
| `"ship"` |  |

Operations: List, Load.

API path: `/crews`

#### Dial

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/dials`

#### Episode

| Field | Description |
| --- | --- |
| `"air_date"` |  |
| `"id"` |  |
| `"number"` |  |
| `"saga"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/episodes`

#### Film

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"release_date"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/films`

#### Fruit

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"type"` |  |
| `"user"` |  |

Operations: List, Load.

API path: `/fruits`

#### Gear

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"first_appearance"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/gears`

#### Haki

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"id"` |  |
| `"name"` |  |
| `"user"` |  |

Operations: List, Load.

API path: `/hakis`

#### Location

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"first_appearance"` |  |
| `"id"` |  |
| `"name"` |  |
| `"type"` |  |

Operations: List, Load.

API path: `/locations`

#### Saga

| Field | Description |
| --- | --- |
| `"chapter"` |  |
| `"description"` |  |
| `"episode"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/sagas`

#### Sword

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"grade"` |  |
| `"id"` |  |
| `"name"` |  |
| `"owner"` |  |

Operations: List, Load.

API path: `/swords`

#### Technique

| Field | Description |
| --- | --- |
| `"description"` |  |
| `"gear"` |  |
| `"id"` |  |
| `"name"` |  |

Operations: List, Load.

API path: `/techniques`

#### Volume

| Field | Description |
| --- | --- |
| `"chapter"` |  |
| `"id"` |  |
| `"number"` |  |
| `"release_date"` |  |
| `"title"` |  |

Operations: List, Load.

API path: `/volumes`



## Entities


### Boat

Create an instance: `boat := client.Boat(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `crew` | ``$STRING`` |  |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Boat(nil).Load(map[string]any{"id": "boat_id"}, nil)
```

#### Example: List

```go
results, err := client.Boat(nil).List(nil, nil)
```


### Bow

Create an instance: `bow := client.Bow(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `owner` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Bow(nil).Load(map[string]any{"id": "bow_id"}, nil)
```

#### Example: List

```go
results, err := client.Bow(nil).List(nil, nil)
```


### Chapter

Create an instance: `chapter := client.Chapter(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | ``$INTEGER`` |  |
| `number` | ``$INTEGER`` |  |
| `release_date` | ``$STRING`` |  |
| `saga` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Chapter(nil).Load(map[string]any{"id": "chapter_id"}, nil)
```

#### Example: List

```go
results, err := client.Chapter(nil).List(nil, nil)
```


### Character

Create an instance: `character := client.Character(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Character(nil).Load(map[string]any{"id": "character_id"}, nil)
```

#### Example: List

```go
results, err := client.Character(nil).List(nil, nil)
```


### Crew

Create an instance: `crew := client.Crew(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

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

```go
result, err := client.Crew(nil).Load(map[string]any{"id": "crew_id"}, nil)
```

#### Example: List

```go
results, err := client.Crew(nil).List(nil, nil)
```


### Dial

Create an instance: `dial := client.Dial(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Dial(nil).Load(map[string]any{"id": "dial_id"}, nil)
```

#### Example: List

```go
results, err := client.Dial(nil).List(nil, nil)
```


### Episode

Create an instance: `episode := client.Episode(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `air_date` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `number` | ``$INTEGER`` |  |
| `saga` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Episode(nil).Load(map[string]any{"id": "episode_id"}, nil)
```

#### Example: List

```go
results, err := client.Episode(nil).List(nil, nil)
```


### Film

Create an instance: `film := client.Film(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `release_date` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Film(nil).Load(map[string]any{"id": "film_id"}, nil)
```

#### Example: List

```go
results, err := client.Film(nil).List(nil, nil)
```


### Fruit

Create an instance: `fruit := client.Fruit(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |
| `user` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Fruit(nil).Load(map[string]any{"id": "fruit_id"}, nil)
```

#### Example: List

```go
results, err := client.Fruit(nil).List(nil, nil)
```


### Gear

Create an instance: `gear := client.Gear(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `first_appearance` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Gear(nil).Load(map[string]any{"id": "gear_id"}, nil)
```

#### Example: List

```go
results, err := client.Gear(nil).List(nil, nil)
```


### Haki

Create an instance: `haki := client.Haki(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `user` | ``$ARRAY`` |  |

#### Example: Load

```go
result, err := client.Haki(nil).Load(map[string]any{"id": "haki_id"}, nil)
```

#### Example: List

```go
results, err := client.Haki(nil).List(nil, nil)
```


### Location

Create an instance: `location := client.Location(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `first_appearance` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `type` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Location(nil).Load(map[string]any{"id": "location_id"}, nil)
```

#### Example: List

```go
results, err := client.Location(nil).List(nil, nil)
```


### Saga

Create an instance: `saga := client.Saga(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | ``$ARRAY`` |  |
| `description` | ``$STRING`` |  |
| `episode` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Saga(nil).Load(map[string]any{"id": "saga_id"}, nil)
```

#### Example: List

```go
results, err := client.Saga(nil).List(nil, nil)
```


### Sword

Create an instance: `sword := client.Sword(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `grade` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `owner` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Sword(nil).Load(map[string]any{"id": "sword_id"}, nil)
```

#### Example: List

```go
results, err := client.Sword(nil).List(nil, nil)
```


### Technique

Create an instance: `technique := client.Technique(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `description` | ``$STRING`` |  |
| `gear` | ``$STRING`` |  |
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Technique(nil).Load(map[string]any{"id": "technique_id"}, nil)
```

#### Example: List

```go
results, err := client.Technique(nil).List(nil, nil)
```


### Volume

Create an instance: `volume := client.Volume(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `chapter` | ``$ARRAY`` |  |
| `id` | ``$INTEGER`` |  |
| `number` | ``$INTEGER`` |  |
| `release_date` | ``$STRING`` |  |
| `title` | ``$STRING`` |  |

#### Example: Load

```go
result, err := client.Volume(nil).Load(map[string]any{"id": "volume_id"}, nil)
```

#### Example: List

```go
results, err := client.Volume(nil).List(nil, nil)
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
error is returned to the caller. An unexpected panic triggers the
`PreUnexpected` hook.

### Features and hooks

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/one-piece-sdk/go/
├── one-piece.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/one-piece-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `Load`, the entity
stores the returned data and match criteria internally.

```go
moon := client.Moon(nil)
moon.Load(map[string]any{"planet_id": "earth", "id": "luna"}, nil)

// moon.Data() now returns the loaded moon data
// moon.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
