# OnePiece Golang SDK



The Golang SDK for the OnePiece API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Boat(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/one-piece-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/one-piece-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/one-piece-sdk/go=../one-piece-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    sdk "github.com/voxgig-sdk/one-piece-sdk/go"
)

func main() {
    client := sdk.New()

    // List boat records — the value is the array of records itself.
    boats, err := client.Boat(nil).List(nil, nil)
    if err != nil {
        panic(err)
    }
    for _, item := range boats.([]any) {
        fmt.Println(item)
    }

    // Load a single boat — the value is the loaded record.
    boat, err := client.Boat(nil).Load(map[string]any{"id": 1}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(boat)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
boats, err := client.Boat(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = boats
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
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

boat, err := client.Boat(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(boat) // the returned mock data
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
ONE_PIECE_TEST_LIVE=TRUE
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
| `Episode` | `(data map[string]any) OnePieceEntity` | Create an Episode entity instance. |
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
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    boat, err := client.Boat(nil).List(map[string]any{/* fields */}, nil)
    if err != nil { /* handle */ }
    // boat is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

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
| `crew` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
boat, err := client.Boat(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(boat) // the loaded record
```

#### Example: List

```go
boats, err := client.Boat(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(boats) // the array of records
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
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```go
bow, err := client.Bow(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(bow) // the loaded record
```

#### Example: List

```go
bows, err := client.Bow(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(bows) // the array of records
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
| `id` | `int` |  |
| `number` | `int` |  |
| `release_date` | `string` |  |
| `saga` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```go
chapter, err := client.Chapter(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(chapter) // the loaded record
```

#### Example: List

```go
chapters, err := client.Chapter(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(chapters) // the array of records
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
| `age` | `int` |  |
| `bounty` | `int` |  |
| `crew` | `string` |  |
| `description` | `string` |  |
| `devil_fruit` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```go
character, err := client.Character(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(character) // the loaded record
```

#### Example: List

```go
characters, err := client.Character(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(characters) // the array of records
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
| `captain` | `string` |  |
| `description` | `string` |  |
| `id` | `int` |  |
| `member` | `[]any` |  |
| `name` | `string` |  |
| `ship` | `string` |  |

#### Example: Load

```go
crew, err := client.Crew(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(crew) // the loaded record
```

#### Example: List

```go
crews, err := client.Crew(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(crews) // the array of records
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
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
dial, err := client.Dial(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(dial) // the loaded record
```

#### Example: List

```go
dials, err := client.Dial(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(dials) // the array of records
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
| `air_date` | `string` |  |
| `id` | `int` |  |
| `number` | `int` |  |
| `saga` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```go
episode, err := client.Episode(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(episode) // the loaded record
```

#### Example: List

```go
episodes, err := client.Episode(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(episodes) // the array of records
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
| `description` | `string` |  |
| `id` | `int` |  |
| `release_date` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```go
film, err := client.Film(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(film) // the loaded record
```

#### Example: List

```go
films, err := client.Film(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(films) // the array of records
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
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |
| `user` | `string` |  |

#### Example: Load

```go
fruit, err := client.Fruit(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(fruit) // the loaded record
```

#### Example: List

```go
fruits, err := client.Fruit(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(fruits) // the array of records
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
| `description` | `string` |  |
| `first_appearance` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```go
gear, err := client.Gear(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(gear) // the loaded record
```

#### Example: List

```go
gears, err := client.Gear(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(gears) // the array of records
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
| `description` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `user` | `[]any` |  |

#### Example: Load

```go
haki, err := client.Haki(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(haki) // the loaded record
```

#### Example: List

```go
hakis, err := client.Haki(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(hakis) // the array of records
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
| `description` | `string` |  |
| `first_appearance` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `type` | `string` |  |

#### Example: Load

```go
location, err := client.Location(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(location) // the loaded record
```

#### Example: List

```go
locations, err := client.Location(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(locations) // the array of records
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
| `chapter` | `[]any` |  |
| `description` | `string` |  |
| `episode` | `[]any` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```go
saga, err := client.Saga(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(saga) // the loaded record
```

#### Example: List

```go
sagas, err := client.Saga(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(sagas) // the array of records
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
| `description` | `string` |  |
| `grade` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |
| `owner` | `string` |  |

#### Example: Load

```go
sword, err := client.Sword(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(sword) // the loaded record
```

#### Example: List

```go
swords, err := client.Sword(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(swords) // the array of records
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
| `description` | `string` |  |
| `gear` | `string` |  |
| `id` | `int` |  |
| `name` | `string` |  |

#### Example: Load

```go
technique, err := client.Technique(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(technique) // the loaded record
```

#### Example: List

```go
techniques, err := client.Technique(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(techniques) // the array of records
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
| `chapter` | `[]any` |  |
| `id` | `int` |  |
| `number` | `int` |  |
| `release_date` | `string` |  |
| `title` | `string` |  |

#### Example: Load

```go
volume, err := client.Volume(nil).Load(map[string]any{"id": 1}, nil)
if err != nil {
    panic(err)
}
fmt.Println(volume) // the loaded record
```

#### Example: List

```go
volumes, err := client.Volume(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(volumes) // the array of records
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

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
boat := client.Boat(nil)
boat.List(nil, nil)

// boat.Data() now returns the boat data from the last list
// boat.Match() returns the last match criteria
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
