# One Piece API

Access information about the One Piece manga, including sagas, fruits, chapters, volumes, episodes, and more. Explore details about characters, crews, locations, and various elements from the One Piece world.

## Start here

This guide introduces the API, the client libraries, and the companion tools in this repository. Start with the API capabilities, choose a client for your application, and use the linked reference when you need exact request and response details.

The selected API surface contains 16 entities and 32 HTTP routes. There are 6 SDK targets and 2 companion tools.

An entity groups related API operations. An operation can have several routes with different inputs or authentication requirements. The SDK exposes the entity and its operations using the conventions of the selected language.

## What the API provides

### Boat

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `crew`: Crew that owns the boat
- `description`: Description of the boat
- `id`: Unique identifier for the boat
- `name`: Name of the boat/ship
- `type`: Type of vessel

### Bow

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the bow
- `id`: Unique identifier for the bow
- `name`: Name of the bow
- `owner`: Owner of the bow

### Chapter

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `id`: Unique identifier for the chapter
- `number`: Chapter number
- `releaseDate`: Release date of the chapter
- `saga`: Saga this chapter belongs to
- `title`: Title of the chapter

### Character

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `age`: Age of the character
- `bounty`: Bounty of the character
- `crew`: Crew affiliation
- `description`: Description of the character
- `devilFruit`: Devil Fruit ability if applicable

### Crew

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `captain`: Captain of the crew
- `description`: Description of the crew
- `id`: Unique identifier for the crew
- `members`: Members of the crew
- `name`: Name of the crew

### Dial

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the dial&#39;s function
- `id`: Unique identifier for the dial
- `name`: Name of the dial
- `type`: Type of dial

### Episode

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `airDate`: Air date of the episode
- `id`: Unique identifier for the episode
- `number`: Episode number
- `saga`: Saga this episode belongs to
- `title`: Title of the episode

### Film

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the film
- `id`: Unique identifier for the film
- `releaseDate`: Release date of the film
- `title`: Title of the film

### Fruit

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the Devil Fruit&#39;s powers
- `id`: Unique identifier for the Devil Fruit
- `name`: Name of the Devil Fruit
- `type`: Type of Devil Fruit (Paramecia, Zoan, Logia)
- `user`: Current or known user of the fruit

### Gear

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the gear&#39;s abilities
- `firstAppearance`: First appearance of this gear
- `id`: Unique identifier for the gear
- `name`: Name of the gear form

### Haki

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the Haki type
- `id`: Unique identifier for the Haki type
- `name`: Name of the Haki type
- `users`: Known users of this Haki type

### Location

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the location
- `firstAppearance`: First appearance of this location
- `id`: Unique identifier for the location
- `name`: Name of the location
- `type`: Type of location (island, sea, etc.)

### Saga

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `chapters`: Chapter IDs included in this saga
- `description`: Description of the saga
- `episodes`: Episode IDs included in this saga
- `id`: Unique identifier for the saga
- `name`: Name of the saga

### Sword

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the sword
- `grade`: Grade of the sword
- `id`: Unique identifier for the sword
- `name`: Name of the sword
- `owner`: Current owner of the sword

### Technique

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `description`: Description of the technique
- `gear`: Associated gear form if applicable
- `id`: Unique identifier for the technique
- `name`: Name of the technique

### Volume

Results: Successful response.

SDK operations: `list`, `load`.

Key fields to recognise:

- `chapters`: Chapter IDs included in this volume
- `id`: Unique identifier for the volume
- `number`: Volume number
- `releaseDate`: Release date of the volume
- `title`: Title of the volume

### Route map

Use this map to locate a capability. Consult the entity reference before supplying request data; routes for the same operation can require different fields.

| Entity | SDK operation | HTTP route | Authentication |
| --- | --- | --- | --- |
| Boat | `list` | `GET /boats` | See reference |
| Boat | `load` | `GET /boats/{id}` | See reference |
| Bow | `list` | `GET /bows` | See reference |
| Bow | `load` | `GET /bows/{id}` | See reference |
| Chapter | `list` | `GET /chapters` | See reference |
| Chapter | `load` | `GET /chapters/{id}` | See reference |
| Character | `list` | `GET /characters` | See reference |
| Character | `load` | `GET /characters/{id}` | See reference |
| Crew | `list` | `GET /crews` | See reference |
| Crew | `load` | `GET /crews/{id}` | See reference |
| Dial | `list` | `GET /dials` | See reference |
| Dial | `load` | `GET /dials/{id}` | See reference |
| Episode | `list` | `GET /episodes` | See reference |
| Episode | `load` | `GET /episodes/{id}` | See reference |
| Film | `list` | `GET /films` | See reference |
| Film | `load` | `GET /films/{id}` | See reference |
| Fruit | `list` | `GET /fruits` | See reference |
| Fruit | `load` | `GET /fruits/{id}` | See reference |
| Gear | `list` | `GET /gears` | See reference |
| Gear | `load` | `GET /gears/{id}` | See reference |
| Haki | `list` | `GET /hakis` | See reference |
| Haki | `load` | `GET /hakis/{id}` | See reference |
| Location | `list` | `GET /locations` | See reference |
| Location | `load` | `GET /locations/{id}` | See reference |
| Saga | `list` | `GET /sagas` | See reference |
| Saga | `load` | `GET /sagas/{id}` | See reference |
| Sword | `list` | `GET /swords` | See reference |
| Sword | `load` | `GET /swords/{id}` | See reference |
| Technique | `list` | `GET /techniques` | See reference |
| Technique | `load` | `GET /techniques/{id}` | See reference |
| Volume | `list` | `GET /volumes` | See reference |
| Volume | `load` | `GET /volumes/{id}` | See reference |

## Connect to the API

- Production server: `https://api-onepiece.com`

Check authentication for the route you plan to call. A route that declares no authentication can be used without credentials; this does not change the requirements of other routes. Keep credentials in environment variables or a configured secret provider, and keep them out of source control and logs.

## Make a first request

1. Choose the API server and an operation that matches your task.
2. Check the operation’s required input and authentication. Use values valid for your account and environment.
3. Send one request and inspect the returned data before adding retries, concurrency, or a larger batch.

For an SDK call, install or build the chosen client, create a client instance with its documented configuration, and call the required entity operation. Language references describe the argument shape, asynchronous behaviour, and returned values.

## Choose an SDK

Choose the language already used by your application or service. The clients represent the same API model, while package setup, naming, and return types follow each language. Check the selected client’s reference and tests before integrating it into an existing application.

| Client | Repository directory | Distribution |
| --- | --- | --- |
| Golang | `go/` | Build from source |
| Lua | `lua/` | Build from source |
| PHP | `php/` | Build from source |
| Python | `py/` | Build from source |
| Ruby | `rb/` | Build from source |
| TypeScript | `ts/` | Build from source |

Build-from-source entries are not marked as published in the project model. Follow the build instructions in that target’s README, then consume the resulting package using your language’s local dependency mechanism. Published entries give the installation command recorded for that client.

## Companion tools

These targets provide another way to use the API. Their available commands or tools can cover a smaller set of operations than the client libraries.

### Go CLI

Use the command-line interface for shell-based tasks and scripts.

Repository directory: `go-cli/`. Not published. Build from the go-cli directory.


### Go MCP server

Use the MCP server to expose supported API operations to an MCP client.

Repository directory: `go-mcp/`. Not published. Build from the go-mcp directory.

- `one-piece_list`: List records for an entity. Supported entities: `boat`, `bow`, `chapter`, `character`, `crew`, `dial`, `episode`, `film`, `fruit`, `gear`, `haki`, `location`, `saga`, `sword`, `technique`, `volume`.
- `one-piece_load`: Load one record for an entity. Supported entities: `boat`, `bow`, `chapter`, `character`, `crew`, `dial`, `episode`, `film`, `fruit`, `gear`, `haki`, `location`, `saga`, `sword`, `technique`, `volume`.

## Operational features

Features supply behaviour around API calls, such as request handling, diagnostics, or local testing. Inclusion in this project does not mean a feature is enabled at runtime. Check the selected SDK’s supported features and configuration defaults, then enable the behaviour your application needs.

- `ratelimit`: Client-side rate limiting via a token bucket
- `retry`: Automatic retry of transient failures with exponential backoff
- `test`: In-memory mock transport for testing without a live server
- `timeout`: Per-request timeout with transport abort

Start with the default client configuration. Add request limits and diagnostics as needed, test error paths, and review retry behaviour before using operations that change data. A retry can repeat an operation unless the API provides a suitable guarantee.

## Continue with the documentation

- Follow the first-call guide for the setup sequence.
- Read the authentication guide before using protected routes.
- Use the API reference for request schemas, response formats, and status codes.
- Check the chosen SDK or companion tool reference for its configuration and supported operations.

