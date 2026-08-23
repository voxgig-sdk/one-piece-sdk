# OnePiece SDK configuration


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "OnePiece",
            "slug": "one-piece",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://api-onepiece.com",
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "boat": {},
                "bow": {},
                "chapter": {},
                "character": {},
                "crew": {},
                "dial": {},
                "episode": {},
                "film": {},
                "fruit": {},
                "gear": {},
                "haki": {},
                "location": {},
                "saga": {},
                "sword": {},
                "technique": {},
                "volume": {},
            },
        },
        "entity": {
      "boat": {
        "fields": [
          {
            "name": "crew",
            "short": "Crew that owns the boat",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Description of the boat",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the boat",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the boat/ship",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Type of vessel",
            "type": "`$STRING`",
          },
        ],
        "name": "boat",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/boats",
                "parts": [
                  "boats",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/boats/{id}",
                "parts": [
                  "boats",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "bow": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the bow",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the bow",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the bow",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "short": "Owner of the bow",
            "type": "`$STRING`",
          },
        ],
        "name": "bow",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/bows",
                "parts": [
                  "bows",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/bows/{id}",
                "parts": [
                  "bows",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "chapter": {
        "fields": [
          {
            "name": "id",
            "short": "Unique identifier for the chapter",
            "type": "`$INTEGER`",
          },
          {
            "name": "number",
            "short": "Chapter number",
            "type": "`$INTEGER`",
          },
          {
            "name": "releaseDate",
            "short": "Release date of the chapter",
            "type": "`$STRING`",
          },
          {
            "name": "saga",
            "short": "Saga this chapter belongs to",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the chapter",
            "type": "`$STRING`",
          },
        ],
        "name": "chapter",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/chapters",
                "parts": [
                  "chapters",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/chapters/{id}",
                "parts": [
                  "chapters",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "character": {
        "fields": [
          {
            "name": "age",
            "short": "Age of the character",
            "type": "`$INTEGER`",
          },
          {
            "name": "bounty",
            "short": "Bounty of the character",
            "type": "`$INTEGER`",
          },
          {
            "name": "crew",
            "short": "Crew affiliation",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Description of the character",
            "type": "`$STRING`",
          },
          {
            "name": "devilFruit",
            "short": "Devil Fruit ability if applicable",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the character",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the character",
            "type": "`$STRING`",
          },
        ],
        "name": "character",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/characters",
                "parts": [
                  "characters",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/characters/{id}",
                "parts": [
                  "characters",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "crew": {
        "fields": [
          {
            "name": "captain",
            "short": "Captain of the crew",
            "type": "`$STRING`",
          },
          {
            "name": "description",
            "short": "Description of the crew",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the crew",
            "type": "`$INTEGER`",
          },
          {
            "name": "members",
            "short": "Members of the crew",
            "type": "`$ARRAY`",
          },
          {
            "name": "name",
            "short": "Name of the crew",
            "type": "`$STRING`",
          },
          {
            "name": "ship",
            "short": "Name of the crew's ship",
            "type": "`$STRING`",
          },
        ],
        "name": "crew",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/crews",
                "parts": [
                  "crews",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/crews/{id}",
                "parts": [
                  "crews",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "dial": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the dial's function",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the dial",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the dial",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Type of dial",
            "type": "`$STRING`",
          },
        ],
        "name": "dial",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/dials",
                "parts": [
                  "dials",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/dials/{id}",
                "parts": [
                  "dials",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "episode": {
        "fields": [
          {
            "name": "airDate",
            "short": "Air date of the episode",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the episode",
            "type": "`$INTEGER`",
          },
          {
            "name": "number",
            "short": "Episode number",
            "type": "`$INTEGER`",
          },
          {
            "name": "saga",
            "short": "Saga this episode belongs to",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the episode",
            "type": "`$STRING`",
          },
        ],
        "name": "episode",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/episodes",
                "parts": [
                  "episodes",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/episodes/{id}",
                "parts": [
                  "episodes",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "film": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the film",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the film",
            "type": "`$INTEGER`",
          },
          {
            "name": "releaseDate",
            "short": "Release date of the film",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the film",
            "type": "`$STRING`",
          },
        ],
        "name": "film",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/films",
                "parts": [
                  "films",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/films/{id}",
                "parts": [
                  "films",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "fruit": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the Devil Fruit's powers",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the Devil Fruit",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the Devil Fruit",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Type of Devil Fruit (Paramecia, Zoan, Logia)",
            "type": "`$STRING`",
          },
          {
            "name": "user",
            "short": "Current or known user of the fruit",
            "type": "`$STRING`",
          },
        ],
        "name": "fruit",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/fruits",
                "parts": [
                  "fruits",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/fruits/{id}",
                "parts": [
                  "fruits",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "gear": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the gear's abilities",
            "type": "`$STRING`",
          },
          {
            "name": "firstAppearance",
            "short": "First appearance of this gear",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the gear",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the gear form",
            "type": "`$STRING`",
          },
        ],
        "name": "gear",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/gears",
                "parts": [
                  "gears",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/gears/{id}",
                "parts": [
                  "gears",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "haki": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the Haki type",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the Haki type",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the Haki type",
            "type": "`$STRING`",
          },
          {
            "name": "users",
            "short": "Known users of this Haki type",
            "type": "`$ARRAY`",
          },
        ],
        "name": "haki",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/hakis",
                "parts": [
                  "hakis",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/hakis/{id}",
                "parts": [
                  "hakis",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "location": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the location",
            "type": "`$STRING`",
          },
          {
            "name": "firstAppearance",
            "short": "First appearance of this location",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the location",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the location",
            "type": "`$STRING`",
          },
          {
            "name": "type",
            "short": "Type of location (island, sea, etc.)",
            "type": "`$STRING`",
          },
        ],
        "name": "location",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/locations",
                "parts": [
                  "locations",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/locations/{id}",
                "parts": [
                  "locations",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "saga": {
        "fields": [
          {
            "name": "chapters",
            "short": "Chapter IDs included in this saga",
            "type": "`$ARRAY`",
          },
          {
            "name": "description",
            "short": "Description of the saga",
            "type": "`$STRING`",
          },
          {
            "name": "episodes",
            "short": "Episode IDs included in this saga",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the saga",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the saga",
            "type": "`$STRING`",
          },
        ],
        "name": "saga",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/sagas",
                "parts": [
                  "sagas",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/sagas/{id}",
                "parts": [
                  "sagas",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "sword": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the sword",
            "type": "`$STRING`",
          },
          {
            "name": "grade",
            "short": "Grade of the sword",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the sword",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the sword",
            "type": "`$STRING`",
          },
          {
            "name": "owner",
            "short": "Current owner of the sword",
            "type": "`$STRING`",
          },
        ],
        "name": "sword",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/swords",
                "parts": [
                  "swords",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/swords/{id}",
                "parts": [
                  "swords",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "technique": {
        "fields": [
          {
            "name": "description",
            "short": "Description of the technique",
            "type": "`$STRING`",
          },
          {
            "name": "gear",
            "short": "Associated gear form if applicable",
            "type": "`$STRING`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the technique",
            "type": "`$INTEGER`",
          },
          {
            "name": "name",
            "short": "Name of the technique",
            "type": "`$STRING`",
          },
        ],
        "name": "technique",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/techniques",
                "parts": [
                  "techniques",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/techniques/{id}",
                "parts": [
                  "techniques",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "volume": {
        "fields": [
          {
            "name": "chapters",
            "short": "Chapter IDs included in this volume",
            "type": "`$ARRAY`",
          },
          {
            "name": "id",
            "short": "Unique identifier for the volume",
            "type": "`$INTEGER`",
          },
          {
            "name": "number",
            "short": "Volume number",
            "type": "`$INTEGER`",
          },
          {
            "name": "releaseDate",
            "short": "Release date of the volume",
            "type": "`$STRING`",
          },
          {
            "name": "title",
            "short": "Title of the volume",
            "type": "`$STRING`",
          },
        ],
        "name": "volume",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
                "kind": "http",
                "method": "GET",
                "orig": "/volumes",
                "parts": [
                  "volumes",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/volumes/{id}",
                "parts": [
                  "volumes",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
