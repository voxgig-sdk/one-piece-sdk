package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "OnePiece",
			"slug": "one-piece",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://api-onepiece.com",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"boat": map[string]any{},
				"bow": map[string]any{},
				"chapter": map[string]any{},
				"character": map[string]any{},
				"crew": map[string]any{},
				"dial": map[string]any{},
				"episode": map[string]any{},
				"film": map[string]any{},
				"fruit": map[string]any{},
				"gear": map[string]any{},
				"haki": map[string]any{},
				"location": map[string]any{},
				"saga": map[string]any{},
				"sword": map[string]any{},
				"technique": map[string]any{},
				"volume": map[string]any{},
			},
		},
		"entity": map[string]any{
			"boat": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "crew",
						"short": "Crew that owns the boat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the boat",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the boat",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the boat/ship",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of vessel",
						"type": "`$STRING`",
					},
				},
				"name": "boat",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/boats",
								"parts": []any{
									"boats",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/boats/{id}",
								"parts": []any{
									"boats",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"bow": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the bow",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the bow",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the bow",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"short": "Owner of the bow",
						"type": "`$STRING`",
					},
				},
				"name": "bow",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/bows",
								"parts": []any{
									"bows",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/bows/{id}",
								"parts": []any{
									"bows",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"chapter": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the chapter",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "number",
						"short": "Chapter number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "releaseDate",
						"short": "Release date of the chapter",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "saga",
						"short": "Saga this chapter belongs to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the chapter",
						"type": "`$STRING`",
					},
				},
				"name": "chapter",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/chapters",
								"parts": []any{
									"chapters",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/chapters/{id}",
								"parts": []any{
									"chapters",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"character": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "age",
						"short": "Age of the character",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "bounty",
						"short": "Bounty of the character",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "crew",
						"short": "Crew affiliation",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the character",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "devilFruit",
						"short": "Devil Fruit ability if applicable",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the character",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the character",
						"type": "`$STRING`",
					},
				},
				"name": "character",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/characters",
								"parts": []any{
									"characters",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/characters/{id}",
								"parts": []any{
									"characters",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"crew": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "captain",
						"short": "Captain of the crew",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the crew",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the crew",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "members",
						"short": "Members of the crew",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the crew",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "ship",
						"short": "Name of the crew's ship",
						"type": "`$STRING`",
					},
				},
				"name": "crew",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/crews",
								"parts": []any{
									"crews",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/crews/{id}",
								"parts": []any{
									"crews",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"dial": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the dial's function",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the dial",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the dial",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of dial",
						"type": "`$STRING`",
					},
				},
				"name": "dial",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/dials",
								"parts": []any{
									"dials",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/dials/{id}",
								"parts": []any{
									"dials",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"episode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "airDate",
						"short": "Air date of the episode",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the episode",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "number",
						"short": "Episode number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "saga",
						"short": "Saga this episode belongs to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the episode",
						"type": "`$STRING`",
					},
				},
				"name": "episode",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/episodes",
								"parts": []any{
									"episodes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/episodes/{id}",
								"parts": []any{
									"episodes",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"film": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the film",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the film",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "releaseDate",
						"short": "Release date of the film",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the film",
						"type": "`$STRING`",
					},
				},
				"name": "film",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/films",
								"parts": []any{
									"films",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/films/{id}",
								"parts": []any{
									"films",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"fruit": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the Devil Fruit's powers",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the Devil Fruit",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the Devil Fruit",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of Devil Fruit (Paramecia, Zoan, Logia)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "user",
						"short": "Current or known user of the fruit",
						"type": "`$STRING`",
					},
				},
				"name": "fruit",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/fruits",
								"parts": []any{
									"fruits",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/fruits/{id}",
								"parts": []any{
									"fruits",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"gear": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the gear's abilities",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstAppearance",
						"short": "First appearance of this gear",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the gear",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the gear form",
						"type": "`$STRING`",
					},
				},
				"name": "gear",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/gears",
								"parts": []any{
									"gears",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/gears/{id}",
								"parts": []any{
									"gears",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"haki": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the Haki type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the Haki type",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the Haki type",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "users",
						"short": "Known users of this Haki type",
						"type": "`$ARRAY`",
					},
				},
				"name": "haki",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/hakis",
								"parts": []any{
									"hakis",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/hakis/{id}",
								"parts": []any{
									"hakis",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"location": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "firstAppearance",
						"short": "First appearance of this location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the location",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "type",
						"short": "Type of location (island, sea, etc.)",
						"type": "`$STRING`",
					},
				},
				"name": "location",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/locations",
								"parts": []any{
									"locations",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/locations/{id}",
								"parts": []any{
									"locations",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"saga": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "chapters",
						"short": "Chapter IDs included in this saga",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "description",
						"short": "Description of the saga",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "episodes",
						"short": "Episode IDs included in this saga",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the saga",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the saga",
						"type": "`$STRING`",
					},
				},
				"name": "saga",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/sagas",
								"parts": []any{
									"sagas",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/sagas/{id}",
								"parts": []any{
									"sagas",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"sword": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the sword",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "grade",
						"short": "Grade of the sword",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the sword",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the sword",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "owner",
						"short": "Current owner of the sword",
						"type": "`$STRING`",
					},
				},
				"name": "sword",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/swords",
								"parts": []any{
									"swords",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/swords/{id}",
								"parts": []any{
									"swords",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"technique": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "description",
						"short": "Description of the technique",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "gear",
						"short": "Associated gear form if applicable",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the technique",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Name of the technique",
						"type": "`$STRING`",
					},
				},
				"name": "technique",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/techniques",
								"parts": []any{
									"techniques",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/techniques/{id}",
								"parts": []any{
									"techniques",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"volume": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "chapters",
						"short": "Chapter IDs included in this volume",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "id",
						"short": "Unique identifier for the volume",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "number",
						"short": "Volume number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "releaseDate",
						"short": "Release date of the volume",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "title",
						"short": "Title of the volume",
						"type": "`$STRING`",
					},
				},
				"name": "volume",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/volumes",
								"parts": []any{
									"volumes",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/volumes/{id}",
								"parts": []any{
									"volumes",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
