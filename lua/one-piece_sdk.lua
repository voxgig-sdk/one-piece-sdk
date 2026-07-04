-- OnePiece SDK

local vs = require("utility.struct.struct")
local Utility = require("core.utility_type")
local Spec = require("core.spec")
local helpers = require("core.helpers")

-- Load utility registration (populates Utility._registrar)
require("utility.register")

-- Load features
local BaseFeature = require("feature.base_feature")
local features_factory = require("features")


local OnePieceSDK = {}
OnePieceSDK.__index = OnePieceSDK


local function _make_feature(name)
  local factory = features_factory[name]
  if factory ~= nil then
    return factory()
  end
  return features_factory.base()
end

OnePieceSDK._make_feature = _make_feature


function OnePieceSDK.new(options)
  local self = setmetatable({}, OnePieceSDK)
  self.mode = "live"
  self.features = {}
  self.options = nil

  local utility = Utility.new()
  self._utility = utility

  local config = require("config")()

  self._rootctx = utility.make_context({
    client = self,
    utility = utility,
    config = config,
    options = options or {},
    shared = {},
  }, nil)

  self.options = utility.make_options(self._rootctx)

  if vs.getpath(self.options, "feature.test.active") == true then
    self.mode = "test"
  end

  self._rootctx.options = self.options

  -- Add features from config.
  local feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
  if feature_opts ~= nil then
    local feature_items = vs.items(feature_opts)
    if feature_items ~= nil then
      for _, item in ipairs(feature_items) do
        local fname = item[1]
        local fopts = helpers.to_map(item[2])
        if fopts ~= nil and fopts["active"] == true then
          utility.feature_add(self._rootctx, _make_feature(fname))
        end
      end
    end
  end

  -- Add extension features.
  local extend = vs.getprop(self.options, "extend")
  if type(extend) == "table" then
    for _, f in ipairs(extend) do
      if type(f) == "table" and type(f.get_name) == "function" then
        utility.feature_add(self._rootctx, f)
      end
    end
  end

  -- Initialize features.
  for _, f in ipairs(self.features) do
    utility.feature_init(self._rootctx, f)
  end

  utility.feature_hook(self._rootctx, "PostConstruct")

  -- #BuildFeatures

  return self
end


function OnePieceSDK:options_map()
  local out = vs.clone(self.options)
  if type(out) == "table" then
    return out
  end
  return {}
end


function OnePieceSDK:get_utility()
  return Utility.copy(self._utility)
end


function OnePieceSDK:get_root_ctx()
  return self._rootctx
end


function OnePieceSDK:prepare(fetchargs)
  local utility = self._utility

  fetchargs = fetchargs or {}

  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "prepare",
    ctrl = ctrl,
  }, self._rootctx)

  local options = self.options

  local path = vs.getprop(fetchargs, "path") or ""
  if type(path) ~= "string" then path = "" end

  local method = vs.getprop(fetchargs, "method") or "GET"
  if type(method) ~= "string" then method = "GET" end

  local params = helpers.to_map(vs.getprop(fetchargs, "params")) or {}
  local query = helpers.to_map(vs.getprop(fetchargs, "query")) or {}

  local headers = utility.prepare_headers(ctx)

  local base = vs.getprop(options, "base") or ""
  if type(base) ~= "string" then base = "" end
  local prefix = vs.getprop(options, "prefix") or ""
  if type(prefix) ~= "string" then prefix = "" end
  local suffix = vs.getprop(options, "suffix") or ""
  if type(suffix) ~= "string" then suffix = "" end

  ctx.spec = Spec.new({
    base = base,
    prefix = prefix,
    suffix = suffix,
    path = path,
    method = method,
    params = params,
    query = query,
    headers = headers,
    body = vs.getprop(fetchargs, "body"),
    step = "start",
  })

  -- Merge user-provided headers.
  local uh = vs.getprop(fetchargs, "headers")
  if type(uh) == "table" then
    for k, v in pairs(uh) do
      ctx.spec.headers[k] = v
    end
  end

  local _, err = utility.prepare_auth(ctx)
  if err ~= nil then
    return nil, err
  end

  return utility.make_fetch_def(ctx)
end


function OnePieceSDK:direct(fetchargs)
  local utility = self._utility

  local fetchdef, err = self:prepare(fetchargs)
  if err ~= nil then
    return { ok = false, err = err }, nil
  end

  fetchargs = fetchargs or {}
  local ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl")) or {}

  local ctx = utility.make_context({
    opname = "direct",
    ctrl = ctrl,
  }, self._rootctx)

  local url = fetchdef["url"] or ""
  local fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

  if fetch_err ~= nil then
    return { ok = false, err = fetch_err }, nil
  end

  if fetched == nil then
    return {
      ok = false,
      err = ctx:make_error("direct_no_response", "response: undefined"),
    }, nil
  end

  if type(fetched) == "table" then
    local status = helpers.to_int(vs.getprop(fetched, "status"))
    local headers = vs.getprop(fetched, "headers") or {}

    -- No-body responses (204, 304) and explicit zero content-length
    -- must skip JSON parsing — calling json() on an empty body errors.
    local content_length = nil
    if type(headers) == "table" then
      content_length = headers["content-length"]
    end
    local no_body = status == 204 or status == 304 or tostring(content_length) == "0"

    local json_data = nil
    if not no_body then
      local jf = vs.getprop(fetched, "json")
      if type(jf) == "function" then
        local ok, result = pcall(jf)
        if ok then
          json_data = result
        end
        -- Non-JSON body: json_data stays nil, status/headers preserved.
      end
    end

    return {
      ok = status >= 200 and status < 300,
      status = status,
      headers = headers,
      data = json_data,
    }, nil
  end

  return {
    ok = false,
    err = ctx:make_error("direct_invalid", "invalid response type"),
  }, nil
end



-- Idiomatic facade: client:Boat():list() / client:Boat():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Boat(data)
  local EntityMod = require("entity.boat_entity")
  if data == nil then
    if self._boat == nil then
      self._boat = EntityMod.new(self, nil)
    end
    return self._boat
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Bow():list() / client:Bow():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Bow(data)
  local EntityMod = require("entity.bow_entity")
  if data == nil then
    if self._bow == nil then
      self._bow = EntityMod.new(self, nil)
    end
    return self._bow
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Chapter():list() / client:Chapter():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Chapter(data)
  local EntityMod = require("entity.chapter_entity")
  if data == nil then
    if self._chapter == nil then
      self._chapter = EntityMod.new(self, nil)
    end
    return self._chapter
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Character():list() / client:Character():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Character(data)
  local EntityMod = require("entity.character_entity")
  if data == nil then
    if self._character == nil then
      self._character = EntityMod.new(self, nil)
    end
    return self._character
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Crew():list() / client:Crew():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Crew(data)
  local EntityMod = require("entity.crew_entity")
  if data == nil then
    if self._crew == nil then
      self._crew = EntityMod.new(self, nil)
    end
    return self._crew
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Dial():list() / client:Dial():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Dial(data)
  local EntityMod = require("entity.dial_entity")
  if data == nil then
    if self._dial == nil then
      self._dial = EntityMod.new(self, nil)
    end
    return self._dial
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Episode():list() / client:Episode():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Episode(data)
  local EntityMod = require("entity.episode_entity")
  if data == nil then
    if self._episode == nil then
      self._episode = EntityMod.new(self, nil)
    end
    return self._episode
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Film():list() / client:Film():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Film(data)
  local EntityMod = require("entity.film_entity")
  if data == nil then
    if self._film == nil then
      self._film = EntityMod.new(self, nil)
    end
    return self._film
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Fruit():list() / client:Fruit():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Fruit(data)
  local EntityMod = require("entity.fruit_entity")
  if data == nil then
    if self._fruit == nil then
      self._fruit = EntityMod.new(self, nil)
    end
    return self._fruit
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Gear():list() / client:Gear():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Gear(data)
  local EntityMod = require("entity.gear_entity")
  if data == nil then
    if self._gear == nil then
      self._gear = EntityMod.new(self, nil)
    end
    return self._gear
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Haki():list() / client:Haki():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Haki(data)
  local EntityMod = require("entity.haki_entity")
  if data == nil then
    if self._haki == nil then
      self._haki = EntityMod.new(self, nil)
    end
    return self._haki
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Location():list() / client:Location():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Location(data)
  local EntityMod = require("entity.location_entity")
  if data == nil then
    if self._location == nil then
      self._location = EntityMod.new(self, nil)
    end
    return self._location
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Saga():list() / client:Saga():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Saga(data)
  local EntityMod = require("entity.saga_entity")
  if data == nil then
    if self._saga == nil then
      self._saga = EntityMod.new(self, nil)
    end
    return self._saga
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Sword():list() / client:Sword():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Sword(data)
  local EntityMod = require("entity.sword_entity")
  if data == nil then
    if self._sword == nil then
      self._sword = EntityMod.new(self, nil)
    end
    return self._sword
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Technique():list() / client:Technique():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Technique(data)
  local EntityMod = require("entity.technique_entity")
  if data == nil then
    if self._technique == nil then
      self._technique = EntityMod.new(self, nil)
    end
    return self._technique
  end
  return EntityMod.new(self, data)
end


-- Idiomatic facade: client:Volume():list() / client:Volume():load({ id = ... })
-- Entity access is capitalised (PascalCase) for parity with the other SDKs.
function OnePieceSDK:Volume(data)
  local EntityMod = require("entity.volume_entity")
  if data == nil then
    if self._volume == nil then
      self._volume = EntityMod.new(self, nil)
    end
    return self._volume
  end
  return EntityMod.new(self, data)
end




function OnePieceSDK.test(testopts, sdkopts)
  sdkopts = sdkopts or {}
  sdkopts = vs.clone(sdkopts)
  if type(sdkopts) ~= "table" then
    sdkopts = {}
  end

  testopts = testopts or {}
  testopts = vs.clone(testopts)
  if type(testopts) ~= "table" then
    testopts = {}
  end
  testopts["active"] = true

  vs.setpath(sdkopts, "feature.test", testopts)

  local sdk = OnePieceSDK.new(sdkopts)
  sdk.mode = "test"

  return sdk
end


return OnePieceSDK
