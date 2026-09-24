
import { BaseFeature } from './feature/base/BaseFeature'
import { RatelimitFeature } from './feature/ratelimit/RatelimitFeature'
import { RetryFeature } from './feature/retry/RetryFeature'
import { TestFeature } from './feature/test/TestFeature'
import { TimeoutFeature } from './feature/timeout/TimeoutFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   ratelimit: RatelimitFeature,
 retry: RetryFeature,
 test: TestFeature,
 timeout: TimeoutFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'OnePiece',
        slug: "one-piece",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     ratelimit:     {
      "options": {
        "active": false,
        "burst": 5,
        "rate": 5
      },
      "optspec": {
        "now": "`$FUNCTION`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 retry:     {
      "options": {
        "active": false,
        "factor": 2,
        "maxDelay": 2000,
        "minDelay": 50,
        "retries": 2,
        "statuses": [
          408,
          425,
          429,
          500,
          502,
          503,
          504
        ]
      },
      "optspec": {
        "jitter": "`$BOOLEAN`",
        "sleep": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },
 test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },
 timeout:     {
      "options": {
        "active": false,
        "ms": 30000
      },
      "optspec": {
        "clearTimer": "`$FUNCTION`",
        "setTimer": "`$FUNCTION`"
      },
      "strict": false,
      "transport": "wrap"
    },

  }


  options = {
    base: "https://api-onepiece.com",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        boat: {
        },
  
        bow: {
        },
  
        chapter: {
        },
  
        character: {
        },
  
        crew: {
        },
  
        dial: {
        },
  
        episode: {
        },
  
        film: {
        },
  
        fruit: {
        },
  
        gear: {
        },
  
        haki: {
        },
  
        location: {
        },
  
        saga: {
        },
  
        sword: {
        },
  
        technique: {
        },
  
        volume: {
        },
  
    }
  }


  entity = {
    "boat": {
      "fields": [
        {
          "name": "crew",
          "title": "Crew",
          "type": "`$STRING`",
          "short": "Crew that owns the boat"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the boat"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the boat"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the boat/ship"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of vessel"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "boat",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/boats",
              "segments": [
                {
                  "lit": "boats"
                }
              ],
              "parts": [
                "boats"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/boats/{id}",
              "segments": [
                {
                  "lit": "boats"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "boats",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "bow": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the bow"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the bow"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the bow"
        },
        {
          "name": "owner",
          "title": "Owner",
          "type": "`$STRING`",
          "short": "Owner of the bow"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "bow",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/bows",
              "segments": [
                {
                  "lit": "bows"
                }
              ],
              "parts": [
                "bows"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/bows/{id}",
              "segments": [
                {
                  "lit": "bows"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "bows",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "chapter": {
      "fields": [
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the chapter"
        },
        {
          "name": "number",
          "title": "Number",
          "type": "`$INTEGER`",
          "short": "Chapter number"
        },
        {
          "name": "releaseDate",
          "title": "Release Date",
          "type": "`$STRING`",
          "short": "Release date of the chapter",
          "format": "date"
        },
        {
          "name": "saga",
          "title": "Saga",
          "type": "`$STRING`",
          "short": "Saga this chapter belongs to"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the chapter"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "chapter",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/chapters",
              "segments": [
                {
                  "lit": "chapters"
                }
              ],
              "parts": [
                "chapters"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/chapters/{id}",
              "segments": [
                {
                  "lit": "chapters"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "chapters",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "character": {
      "fields": [
        {
          "name": "age",
          "title": "Age",
          "type": "`$INTEGER`",
          "short": "Age of the character"
        },
        {
          "name": "bounty",
          "title": "Bounty",
          "type": "`$INTEGER`",
          "short": "Bounty of the character"
        },
        {
          "name": "crew",
          "title": "Crew",
          "type": "`$STRING`",
          "short": "Crew affiliation"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the character"
        },
        {
          "name": "devilFruit",
          "title": "Devil Fruit",
          "type": "`$STRING`",
          "short": "Devil Fruit ability if applicable"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the character"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the character"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "character",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/characters",
              "segments": [
                {
                  "lit": "characters"
                }
              ],
              "parts": [
                "characters"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/characters/{id}",
              "segments": [
                {
                  "lit": "characters"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "characters",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "crew": {
      "fields": [
        {
          "name": "captain",
          "title": "Captain",
          "type": "`$STRING`",
          "short": "Captain of the crew"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the crew"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the crew"
        },
        {
          "name": "members",
          "title": "Members",
          "type": "`$ARRAY`",
          "short": "Members of the crew"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the crew"
        },
        {
          "name": "ship",
          "title": "Ship",
          "type": "`$STRING`",
          "short": "Name of the crew's ship"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "crew",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/crews",
              "segments": [
                {
                  "lit": "crews"
                }
              ],
              "parts": [
                "crews"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/crews/{id}",
              "segments": [
                {
                  "lit": "crews"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "crews",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "dial": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the dial's function"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the dial"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the dial"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of dial"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "dial",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/dials",
              "segments": [
                {
                  "lit": "dials"
                }
              ],
              "parts": [
                "dials"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/dials/{id}",
              "segments": [
                {
                  "lit": "dials"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "dials",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "episode": {
      "fields": [
        {
          "name": "airDate",
          "title": "Air Date",
          "type": "`$STRING`",
          "short": "Air date of the episode",
          "format": "date"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the episode"
        },
        {
          "name": "number",
          "title": "Number",
          "type": "`$INTEGER`",
          "short": "Episode number"
        },
        {
          "name": "saga",
          "title": "Saga",
          "type": "`$STRING`",
          "short": "Saga this episode belongs to"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the episode"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "episode",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/episodes",
              "segments": [
                {
                  "lit": "episodes"
                }
              ],
              "parts": [
                "episodes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/episodes/{id}",
              "segments": [
                {
                  "lit": "episodes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "episodes",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "film": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the film"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the film"
        },
        {
          "name": "releaseDate",
          "title": "Release Date",
          "type": "`$STRING`",
          "short": "Release date of the film",
          "format": "date"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the film"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "film",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/films",
              "segments": [
                {
                  "lit": "films"
                }
              ],
              "parts": [
                "films"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/films/{id}",
              "segments": [
                {
                  "lit": "films"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "films",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "fruit": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the Devil Fruit's powers"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the Devil Fruit"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the Devil Fruit"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of Devil Fruit (Paramecia, Zoan, Logia)"
        },
        {
          "name": "user",
          "title": "User",
          "type": "`$STRING`",
          "short": "Current or known user of the fruit"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "fruit",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/fruits",
              "segments": [
                {
                  "lit": "fruits"
                }
              ],
              "parts": [
                "fruits"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/fruits/{id}",
              "segments": [
                {
                  "lit": "fruits"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "fruits",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "gear": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the gear's abilities"
        },
        {
          "name": "firstAppearance",
          "title": "First Appearance",
          "type": "`$STRING`",
          "short": "First appearance of this gear"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the gear"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the gear form"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "gear",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/gears",
              "segments": [
                {
                  "lit": "gears"
                }
              ],
              "parts": [
                "gears"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/gears/{id}",
              "segments": [
                {
                  "lit": "gears"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "gears",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "haki": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the Haki type"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the Haki type"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the Haki type"
        },
        {
          "name": "users",
          "title": "Users",
          "type": "`$ARRAY`",
          "short": "Known users of this Haki type"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "haki",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/hakis",
              "segments": [
                {
                  "lit": "hakis"
                }
              ],
              "parts": [
                "hakis"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/hakis/{id}",
              "segments": [
                {
                  "lit": "hakis"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "hakis",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "location": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the location"
        },
        {
          "name": "firstAppearance",
          "title": "First Appearance",
          "type": "`$STRING`",
          "short": "First appearance of this location"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the location"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the location"
        },
        {
          "name": "type",
          "title": "Type",
          "type": "`$STRING`",
          "short": "Type of location (island, sea, etc.)"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "location",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/locations",
              "segments": [
                {
                  "lit": "locations"
                }
              ],
              "parts": [
                "locations"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/locations/{id}",
              "segments": [
                {
                  "lit": "locations"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "locations",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "saga": {
      "fields": [
        {
          "name": "chapters",
          "title": "Chapters",
          "type": "`$ARRAY`",
          "short": "Chapter IDs included in this saga"
        },
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the saga"
        },
        {
          "name": "episodes",
          "title": "Episodes",
          "type": "`$ARRAY`",
          "short": "Episode IDs included in this saga"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the saga"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the saga"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "saga",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/sagas",
              "segments": [
                {
                  "lit": "sagas"
                }
              ],
              "parts": [
                "sagas"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/sagas/{id}",
              "segments": [
                {
                  "lit": "sagas"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "sagas",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "sword": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the sword"
        },
        {
          "name": "grade",
          "title": "Grade",
          "type": "`$STRING`",
          "short": "Grade of the sword"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the sword"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the sword"
        },
        {
          "name": "owner",
          "title": "Owner",
          "type": "`$STRING`",
          "short": "Current owner of the sword"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "sword",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/swords",
              "segments": [
                {
                  "lit": "swords"
                }
              ],
              "parts": [
                "swords"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/swords/{id}",
              "segments": [
                {
                  "lit": "swords"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "swords",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "technique": {
      "fields": [
        {
          "name": "description",
          "title": "Description",
          "type": "`$STRING`",
          "short": "Description of the technique"
        },
        {
          "name": "gear",
          "title": "Gear",
          "type": "`$STRING`",
          "short": "Associated gear form if applicable"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the technique"
        },
        {
          "name": "name",
          "title": "Name",
          "type": "`$STRING`",
          "short": "Name of the technique"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "technique",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/techniques",
              "segments": [
                {
                  "lit": "techniques"
                }
              ],
              "parts": [
                "techniques"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/techniques/{id}",
              "segments": [
                {
                  "lit": "techniques"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "techniques",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "volume": {
      "fields": [
        {
          "name": "chapters",
          "title": "Chapters",
          "type": "`$ARRAY`",
          "short": "Chapter IDs included in this volume"
        },
        {
          "name": "id",
          "title": "Id",
          "type": "`$INTEGER`",
          "short": "Unique identifier for the volume"
        },
        {
          "name": "number",
          "title": "Number",
          "type": "`$INTEGER`",
          "short": "Volume number"
        },
        {
          "name": "releaseDate",
          "title": "Release Date",
          "type": "`$STRING`",
          "short": "Release date of the volume",
          "format": "date"
        },
        {
          "name": "title",
          "title": "Title",
          "type": "`$STRING`",
          "short": "Title of the volume"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
      },
      "name": "volume",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/volumes",
              "segments": [
                {
                  "lit": "volumes"
                }
              ],
              "parts": [
                "volumes"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {},
              "select": {}
            }
          ]
        },
        "load": {
          "input": "data",
          "name": "load",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/volumes/{id}",
              "segments": [
                {
                  "lit": "volumes"
                },
                {
                  "var": "id"
                }
              ],
              "parts": [
                "volumes",
                "{id}"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "args": {
                "params": [
                  {
                    "name": "id",
                    "orig": "id",
                    "type": "`$INTEGER`",
                    "kind": "param",
                    "reqd": true
                  }
                ]
              },
              "select": {
                "exist": [
                  "id"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

