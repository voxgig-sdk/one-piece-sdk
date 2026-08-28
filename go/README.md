# OnePiece Golang SDK



The Golang SDK for the OnePiece API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Boat(nil)` — each with the same small set of operations (`List`, `Load`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
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
| `"crew"` | Crew that owns the boat |
| `"description"` | Description of the boat |
| `"id"` | Unique identifier for the boat |
| `"name"` | Name of the boat/ship |
| `"type"` | Type of vessel |

Operations: List, Load.

API path: `/boats`

#### Bow

| Field | Description |
| --- | --- |
| `"description"` | Description of the bow |
| `"id"` | Unique identifier for the bow |
| `"name"` | Name of the bow |
| `"owner"` | Owner of the bow |

Operations: List, Load.

API path: `/bows`

#### Chapter

| Field | Description |
| --- | --- |
| `"id"` | Unique identifier for the chapter |
| `"number"` | Chapter number |
| `"releaseDate"` | Release date of the chapter |
| `"saga"` | Saga this chapter belongs to |
| `"title"` | Title of the chapter |

Operations: List, Load.

API path: `/chapters`

#### Character

| Field | Description |
| --- | --- |
| `"age"` | Age of the character |
| `"bounty"` | Bounty of the character |
| `"crew"` | Crew affiliation |
| `"description"` | Description of the character |
| `"devilFruit"` | Devil Fruit ability if applicable |
| `"id"` | Unique identifier for the character |
| `"name"` | Name of the character |

Operations: List, Load.

API path: `/characters`

#### Crew

| Field | Description |
| --- | --- |
| `"captain"` | Captain of the crew |
| `"description"` | Description of the crew |
| `"id"` | Unique identifier for the crew |
| `"members"` | Members of the crew |
| `"name"` | Name of the crew |
| `"ship"` | Name of the crew's ship |

Operations: List, Load.

API path: `/crews`

#### Dial

| Field | Description |
| --- | --- |
| `"description"` | Description of the dial's function |
| `"id"` | Unique identifier for the dial |
| `"name"` | Name of the dial |
| `"type"` | Type of dial |

Operations: List, Load.

API path: `/dials`

#### Episode

| Field | Description |
| --- | --- |
| `"airDate"` | Air date of the episode |
| `"id"` | Unique identifier for the episode |
| `"number"` | Episode number |
| `"saga"` | Saga this episode belongs to |
| `"title"` | Title of the episode |

Operations: List, Load.

API path: `/episodes`

#### Film

| Field | Description |
| --- | --- |
| `"description"` | Description of the film |
| `"id"` | Unique identifier for the film |
| `"releaseDate"` | Release date of the film |
| `"title"` | Title of the film |

Operations: List, Load.

API path: `/films`

#### Fruit

| Field | Description |
| --- | --- |
| `"description"` | Description of the Devil Fruit's powers |
| `"id"` | Unique identifier for the Devil Fruit |
| `"name"` | Name of the Devil Fruit |
| `"type"` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `"user"` | Current or known user of the fruit |

Operations: List, Load.

API path: `/fruits`

#### Gear

| Field | Description |
| --- | --- |
| `"description"` | Description of the gear's abilities |
| `"firstAppearance"` | First appearance of this gear |
| `"id"` | Unique identifier for the gear |
| `"name"` | Name of the gear form |

Operations: List, Load.

API path: `/gears`

#### Haki

| Field | Description |
| --- | --- |
| `"description"` | Description of the Haki type |
| `"id"` | Unique identifier for the Haki type |
| `"name"` | Name of the Haki type |
| `"users"` | Known users of this Haki type |

Operations: List, Load.

API path: `/hakis`

#### Location

| Field | Description |
| --- | --- |
| `"description"` | Description of the location |
| `"firstAppearance"` | First appearance of this location |
| `"id"` | Unique identifier for the location |
| `"name"` | Name of the location |
| `"type"` | Type of location (island, sea, etc.) |

Operations: List, Load.

API path: `/locations`

#### Saga

| Field | Description |
| --- | --- |
| `"chapters"` | Chapter IDs included in this saga |
| `"description"` | Description of the saga |
| `"episodes"` | Episode IDs included in this saga |
| `"id"` | Unique identifier for the saga |
| `"name"` | Name of the saga |

Operations: List, Load.

API path: `/sagas`

#### Sword

| Field | Description |
| --- | --- |
| `"description"` | Description of the sword |
| `"grade"` | Grade of the sword |
| `"id"` | Unique identifier for the sword |
| `"name"` | Name of the sword |
| `"owner"` | Current owner of the sword |

Operations: List, Load.

API path: `/swords`

#### Technique

| Field | Description |
| --- | --- |
| `"description"` | Description of the technique |
| `"gear"` | Associated gear form if applicable |
| `"id"` | Unique identifier for the technique |
| `"name"` | Name of the technique |

Operations: List, Load.

API path: `/techniques`

#### Volume

| Field | Description |
| --- | --- |
| `"chapters"` | Chapter IDs included in this volume |
| `"id"` | Unique identifier for the volume |
| `"number"` | Volume number |
| `"releaseDate"` | Release date of the volume |
| `"title"` | Title of the volume |

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
| `crew` | `string` | Crew that owns the boat |
| `description` | `string` | Description of the boat |
| `id` | `int` | Unique identifier for the boat |
| `name` | `string` | Name of the boat/ship |
| `type` | `string` | Type of vessel |

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
| `description` | `string` | Description of the bow |
| `id` | `int` | Unique identifier for the bow |
| `name` | `string` | Name of the bow |
| `owner` | `string` | Owner of the bow |

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
| `id` | `int` | Unique identifier for the chapter |
| `number` | `int` | Chapter number |
| `releaseDate` | `string` | Release date of the chapter |
| `saga` | `string` | Saga this chapter belongs to |
| `title` | `string` | Title of the chapter |

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
| `age` | `int` | Age of the character |
| `bounty` | `int` | Bounty of the character |
| `crew` | `string` | Crew affiliation |
| `description` | `string` | Description of the character |
| `devilFruit` | `string` | Devil Fruit ability if applicable |
| `id` | `int` | Unique identifier for the character |
| `name` | `string` | Name of the character |

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
| `captain` | `string` | Captain of the crew |
| `description` | `string` | Description of the crew |
| `id` | `int` | Unique identifier for the crew |
| `members` | `[]any` | Members of the crew |
| `name` | `string` | Name of the crew |
| `ship` | `string` | Name of the crew's ship |

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
| `description` | `string` | Description of the dial's function |
| `id` | `int` | Unique identifier for the dial |
| `name` | `string` | Name of the dial |
| `type` | `string` | Type of dial |

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
| `airDate` | `string` | Air date of the episode |
| `id` | `int` | Unique identifier for the episode |
| `number` | `int` | Episode number |
| `saga` | `string` | Saga this episode belongs to |
| `title` | `string` | Title of the episode |

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
| `description` | `string` | Description of the film |
| `id` | `int` | Unique identifier for the film |
| `releaseDate` | `string` | Release date of the film |
| `title` | `string` | Title of the film |

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
| `description` | `string` | Description of the Devil Fruit's powers |
| `id` | `int` | Unique identifier for the Devil Fruit |
| `name` | `string` | Name of the Devil Fruit |
| `type` | `string` | Type of Devil Fruit (Paramecia, Zoan, Logia) |
| `user` | `string` | Current or known user of the fruit |

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
| `description` | `string` | Description of the gear's abilities |
| `firstAppearance` | `string` | First appearance of this gear |
| `id` | `int` | Unique identifier for the gear |
| `name` | `string` | Name of the gear form |

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
| `description` | `string` | Description of the Haki type |
| `id` | `int` | Unique identifier for the Haki type |
| `name` | `string` | Name of the Haki type |
| `users` | `[]any` | Known users of this Haki type |

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
| `description` | `string` | Description of the location |
| `firstAppearance` | `string` | First appearance of this location |
| `id` | `int` | Unique identifier for the location |
| `name` | `string` | Name of the location |
| `type` | `string` | Type of location (island, sea, etc.) |

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
| `chapters` | `[]any` | Chapter IDs included in this saga |
| `description` | `string` | Description of the saga |
| `episodes` | `[]any` | Episode IDs included in this saga |
| `id` | `int` | Unique identifier for the saga |
| `name` | `string` | Name of the saga |

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
| `description` | `string` | Description of the sword |
| `grade` | `string` | Grade of the sword |
| `id` | `int` | Unique identifier for the sword |
| `name` | `string` | Name of the sword |
| `owner` | `string` | Current owner of the sword |

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
| `description` | `string` | Description of the technique |
| `gear` | `string` | Associated gear form if applicable |
| `id` | `int` | Unique identifier for the technique |
| `name` | `string` | Name of the technique |

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
| `chapters` | `[]any` | Chapter IDs included in this volume |
| `id` | `int` | Unique identifier for the volume |
| `number` | `int` | Volume number |
| `releaseDate` | `string` | Release date of the volume |
| `title` | `string` | Title of the volume |

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
