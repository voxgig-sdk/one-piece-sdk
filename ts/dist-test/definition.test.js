"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "boat",
        "accessor": "Boat",
        "op": "list",
        "method": "GET",
        "path": "/boats",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "crew": "x",
                "type": "x",
                "description": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "boat",
        "accessor": "Boat",
        "op": "load",
        "method": "GET",
        "path": "/boats/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "crew": "x",
            "type": "x",
            "description": "x"
        },
        "idField": "id"
    },
    {
        "entity": "bow",
        "accessor": "Bow",
        "op": "list",
        "method": "GET",
        "path": "/bows",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "owner": "x",
                "description": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "bow",
        "accessor": "Bow",
        "op": "load",
        "method": "GET",
        "path": "/bows/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "owner": "x",
            "description": "x"
        },
        "idField": "id"
    },
    {
        "entity": "chapter",
        "accessor": "Chapter",
        "op": "list",
        "method": "GET",
        "path": "/chapters",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "number": 1,
                "title": "x",
                "releaseDate": "2026-01-01",
                "saga": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "chapter",
        "accessor": "Chapter",
        "op": "load",
        "method": "GET",
        "path": "/chapters/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "number": 1,
            "title": "x",
            "releaseDate": "2026-01-01",
            "saga": "x"
        },
        "idField": "id"
    },
    {
        "entity": "character",
        "accessor": "Character",
        "op": "list",
        "method": "GET",
        "path": "/characters",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "age": 1,
                "bounty": 1,
                "crew": "x",
                "devilFruit": "x",
                "description": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "character",
        "accessor": "Character",
        "op": "load",
        "method": "GET",
        "path": "/characters/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "age": 1,
            "bounty": 1,
            "crew": "x",
            "devilFruit": "x",
            "description": "x"
        },
        "idField": "id"
    },
    {
        "entity": "crew",
        "accessor": "Crew",
        "op": "list",
        "method": "GET",
        "path": "/crews",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "captain": "x",
                "members": [
                    "x"
                ],
                "ship": "x",
                "description": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "crew",
        "accessor": "Crew",
        "op": "load",
        "method": "GET",
        "path": "/crews/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "captain": "x",
            "members": [
                "x"
            ],
            "ship": "x",
            "description": "x"
        },
        "idField": "id"
    },
    {
        "entity": "dial",
        "accessor": "Dial",
        "op": "list",
        "method": "GET",
        "path": "/dials",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "type": "x",
                "description": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "dial",
        "accessor": "Dial",
        "op": "load",
        "method": "GET",
        "path": "/dials/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "type": "x",
            "description": "x"
        },
        "idField": "id"
    },
    {
        "entity": "episode",
        "accessor": "Episode",
        "op": "list",
        "method": "GET",
        "path": "/episodes",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "number": 1,
                "title": "x",
                "airDate": "2026-01-01",
                "saga": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "episode",
        "accessor": "Episode",
        "op": "load",
        "method": "GET",
        "path": "/episodes/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "number": 1,
            "title": "x",
            "airDate": "2026-01-01",
            "saga": "x"
        },
        "idField": "id"
    },
    {
        "entity": "film",
        "accessor": "Film",
        "op": "list",
        "method": "GET",
        "path": "/films",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "title": "x",
                "releaseDate": "2026-01-01",
                "description": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "film",
        "accessor": "Film",
        "op": "load",
        "method": "GET",
        "path": "/films/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "title": "x",
            "releaseDate": "2026-01-01",
            "description": "x"
        },
        "idField": "id"
    },
    {
        "entity": "fruit",
        "accessor": "Fruit",
        "op": "list",
        "method": "GET",
        "path": "/fruits",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "type": "x",
                "description": "x",
                "user": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "fruit",
        "accessor": "Fruit",
        "op": "load",
        "method": "GET",
        "path": "/fruits/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "type": "x",
            "description": "x",
            "user": "x"
        },
        "idField": "id"
    },
    {
        "entity": "gear",
        "accessor": "Gear",
        "op": "list",
        "method": "GET",
        "path": "/gears",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "description": "x",
                "firstAppearance": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "gear",
        "accessor": "Gear",
        "op": "load",
        "method": "GET",
        "path": "/gears/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "description": "x",
            "firstAppearance": "x"
        },
        "idField": "id"
    },
    {
        "entity": "haki",
        "accessor": "Haki",
        "op": "list",
        "method": "GET",
        "path": "/hakis",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "description": "x",
                "users": [
                    "x"
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "haki",
        "accessor": "Haki",
        "op": "load",
        "method": "GET",
        "path": "/hakis/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "description": "x",
            "users": [
                "x"
            ]
        },
        "idField": "id"
    },
    {
        "entity": "location",
        "accessor": "Location",
        "op": "list",
        "method": "GET",
        "path": "/locations",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "type": "x",
                "description": "x",
                "firstAppearance": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "location",
        "accessor": "Location",
        "op": "load",
        "method": "GET",
        "path": "/locations/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "type": "x",
            "description": "x",
            "firstAppearance": "x"
        },
        "idField": "id"
    },
    {
        "entity": "saga",
        "accessor": "Saga",
        "op": "list",
        "method": "GET",
        "path": "/sagas",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "description": "x",
                "chapters": [
                    1
                ],
                "episodes": [
                    1
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "saga",
        "accessor": "Saga",
        "op": "load",
        "method": "GET",
        "path": "/sagas/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "description": "x",
            "chapters": [
                1
            ],
            "episodes": [
                1
            ]
        },
        "idField": "id"
    },
    {
        "entity": "sword",
        "accessor": "Sword",
        "op": "list",
        "method": "GET",
        "path": "/swords",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "grade": "x",
                "owner": "x",
                "description": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "sword",
        "accessor": "Sword",
        "op": "load",
        "method": "GET",
        "path": "/swords/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "grade": "x",
            "owner": "x",
            "description": "x"
        },
        "idField": "id"
    },
    {
        "entity": "technique",
        "accessor": "Technique",
        "op": "list",
        "method": "GET",
        "path": "/techniques",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "name": "x",
                "description": "x",
                "gear": "x"
            }
        ],
        "idField": "id"
    },
    {
        "entity": "technique",
        "accessor": "Technique",
        "op": "load",
        "method": "GET",
        "path": "/techniques/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "name": "x",
            "description": "x",
            "gear": "x"
        },
        "idField": "id"
    },
    {
        "entity": "volume",
        "accessor": "Volume",
        "op": "list",
        "method": "GET",
        "path": "/volumes",
        "args": [],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": [
            {
                "id": 1,
                "number": 1,
                "title": "x",
                "releaseDate": "2026-01-01",
                "chapters": [
                    1
                ]
            }
        ],
        "idField": "id"
    },
    {
        "entity": "volume",
        "accessor": "Volume",
        "op": "load",
        "method": "GET",
        "path": "/volumes/{id}",
        "args": [
            {
                "name": "id",
                "wire": "id",
                "value": "p1"
            }
        ],
        "select": {},
        "headers": [],
        "cookies": [],
        "responseMedia": [
            "application/json"
        ],
        "query": [],
        "queryArgs": [],
        "auth": null,
        "status": 200,
        "sample": {
            "id": 1,
            "number": 1,
            "title": "x",
            "releaseDate": "2026-01-01",
            "chapters": [
                1
            ]
        },
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map