# OnePiece SDK

require_relative 'utility/struct/voxgig_struct'
require_relative 'core/utility_type'
require_relative 'core/spec'
require_relative 'core/helpers'

# Load utility registration
require_relative 'utility/register'

# Load config and features
require_relative 'config'
require_relative 'feature/base_feature'
require_relative 'features'

# Load typed models (Struct value objects).
require_relative 'OnePiece_types'


class OnePieceSDK
  attr_accessor :mode, :features, :options

  def initialize(options = {})
    @mode = "live"
    @features = []
    @options = nil

    utility = OnePieceUtility.new
    @_utility = utility

    config = OnePieceConfig.make_config

    @_rootctx = utility.make_context.call({
      "client" => self,
      "utility" => utility,
      "config" => config,
      "options" => options || {},
      "shared" => {},
    }, nil)

    @options = utility.make_options.call(@_rootctx)

    if VoxgigStruct.getpath(@options, "feature.test.active") == true
      @mode = "test"
    end

    @_rootctx.options = @options

    # Add features from config.
    feature_opts = OnePieceHelpers.to_map(VoxgigStruct.getprop(@options, "feature"))
    if feature_opts
      items = VoxgigStruct.items(feature_opts)
      if items
        items.each do |item|
          fname = item[0]
          fopts = OnePieceHelpers.to_map(item[1])
          if fopts && fopts["active"] == true
            utility.feature_add.call(@_rootctx, OnePieceFeatures.make_feature(fname))
          end
        end
      end
    end

    # Add extension features.
    extend_val = VoxgigStruct.getprop(@options, "extend")
    if extend_val.is_a?(Array)
      extend_val.each do |f|
        if f.respond_to?(:get_name)
          utility.feature_add.call(@_rootctx, f)
        end
      end
    end

    # Initialize features.
    @features.each do |f|
      utility.feature_init.call(@_rootctx, f)
    end

    utility.feature_hook.call(@_rootctx, "PostConstruct")
  end

  def options_map
    out = VoxgigStruct.clone(@options)
    out.is_a?(Hash) ? out : {}
  end

  def get_utility
    OnePieceUtility.copy(@_utility)
  end

  def get_root_ctx
    @_rootctx
  end

  def prepare(fetchargs = {})
    utility = @_utility
    fetchargs ||= {}

    ctrl = OnePieceHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "prepare",
      "ctrl" => ctrl,
    }, @_rootctx)

    opts = @options
    path = VoxgigStruct.getprop(fetchargs, "path") || ""
    path = "" unless path.is_a?(String)
    method_val = VoxgigStruct.getprop(fetchargs, "method") || "GET"
    method_val = "GET" unless method_val.is_a?(String)
    params = OnePieceHelpers.to_map(VoxgigStruct.getprop(fetchargs, "params")) || {}
    query = OnePieceHelpers.to_map(VoxgigStruct.getprop(fetchargs, "query")) || {}
    headers = utility.prepare_headers.call(ctx)

    base = VoxgigStruct.getprop(opts, "base") || ""
    base = "" unless base.is_a?(String)
    prefix = VoxgigStruct.getprop(opts, "prefix") || ""
    prefix = "" unless prefix.is_a?(String)
    suffix = VoxgigStruct.getprop(opts, "suffix") || ""
    suffix = "" unless suffix.is_a?(String)

    ctx.spec = OnePieceSpec.new({
      "base" => base, "prefix" => prefix, "suffix" => suffix,
      "path" => path, "method" => method_val,
      "params" => params, "query" => query, "headers" => headers,
      "body" => VoxgigStruct.getprop(fetchargs, "body"),
      "step" => "start",
    })

    # Merge user-provided headers.
    uh = VoxgigStruct.getprop(fetchargs, "headers")
    if uh.is_a?(Hash)
      uh.each { |k, v| ctx.spec.headers[k] = v }
    end

    _, err = utility.prepare_auth.call(ctx)
    raise err if err

    utility.make_fetch_def.call(ctx)
  end

  def direct(fetchargs = {})
    utility = @_utility

    # direct() is the raw-HTTP escape hatch: it always returns a result hash
    # ({ "ok" => ..., ... }) and never raises. prepare() raises on error, so
    # trap that and surface it in the hash.
    begin
      fetchdef = prepare(fetchargs)
    rescue OnePieceError => err
      return { "ok" => false, "err" => err }
    end

    fetchargs ||= {}
    ctrl = OnePieceHelpers.to_map(VoxgigStruct.getprop(fetchargs, "ctrl")) || {}

    ctx = utility.make_context.call({
      "opname" => "direct",
      "ctrl" => ctrl,
    }, @_rootctx)

    url = fetchdef["url"] || ""
    fetched, fetch_err = utility.fetcher.call(ctx, url, fetchdef)

    return { "ok" => false, "err" => fetch_err } if fetch_err

    if fetched.nil?
      return {
        "ok" => false,
        "err" => ctx.make_error("direct_no_response", "response: undefined"),
      }
    end

    if fetched.is_a?(Hash)
      status = OnePieceHelpers.to_int(VoxgigStruct.getprop(fetched, "status"))
      headers = VoxgigStruct.getprop(fetched, "headers") || {}

      # No-body responses (204, 304) and explicit zero content-length must
      # skip JSON parsing — calling json() on an empty body errors.
      content_length = headers.is_a?(Hash) ? headers["content-length"] : nil
      no_body = status == 204 || status == 304 || content_length.to_s == "0"

      json_data = nil
      unless no_body
        jf = VoxgigStruct.getprop(fetched, "json")
        if jf.is_a?(Proc)
          begin
            json_data = jf.call
          rescue StandardError
            # Non-JSON body — leave data nil, keep status/headers.
            json_data = nil
          end
        end
      end

      return {
        "ok" => status >= 200 && status < 300,
        "status" => status,
        "headers" => headers,
        "data" => json_data,
      }
    end

    return {
      "ok" => false,
      "err" => ctx.make_error("direct_invalid", "invalid response type"),
    }
  end


  # Idiomatic facade: client.boat.list / client.boat.load({ "id" => ... })
  def boat
    require_relative 'entity/boat_entity'
    @boat ||= BoatEntity.new(self, nil)
  end

  # Deprecated: use client.boat instead.
  def Boat(data = nil)
    require_relative 'entity/boat_entity'
    BoatEntity.new(self, data)
  end


  # Idiomatic facade: client.bow.list / client.bow.load({ "id" => ... })
  def bow
    require_relative 'entity/bow_entity'
    @bow ||= BowEntity.new(self, nil)
  end

  # Deprecated: use client.bow instead.
  def Bow(data = nil)
    require_relative 'entity/bow_entity'
    BowEntity.new(self, data)
  end


  # Idiomatic facade: client.chapter.list / client.chapter.load({ "id" => ... })
  def chapter
    require_relative 'entity/chapter_entity'
    @chapter ||= ChapterEntity.new(self, nil)
  end

  # Deprecated: use client.chapter instead.
  def Chapter(data = nil)
    require_relative 'entity/chapter_entity'
    ChapterEntity.new(self, data)
  end


  # Idiomatic facade: client.character.list / client.character.load({ "id" => ... })
  def character
    require_relative 'entity/character_entity'
    @character ||= CharacterEntity.new(self, nil)
  end

  # Deprecated: use client.character instead.
  def Character(data = nil)
    require_relative 'entity/character_entity'
    CharacterEntity.new(self, data)
  end


  # Idiomatic facade: client.crew.list / client.crew.load({ "id" => ... })
  def crew
    require_relative 'entity/crew_entity'
    @crew ||= CrewEntity.new(self, nil)
  end

  # Deprecated: use client.crew instead.
  def Crew(data = nil)
    require_relative 'entity/crew_entity'
    CrewEntity.new(self, data)
  end


  # Idiomatic facade: client.dial.list / client.dial.load({ "id" => ... })
  def dial
    require_relative 'entity/dial_entity'
    @dial ||= DialEntity.new(self, nil)
  end

  # Deprecated: use client.dial instead.
  def Dial(data = nil)
    require_relative 'entity/dial_entity'
    DialEntity.new(self, data)
  end


  # Idiomatic facade: client.episode.list / client.episode.load({ "id" => ... })
  def episode
    require_relative 'entity/episode_entity'
    @episode ||= EpisodeEntity.new(self, nil)
  end

  # Deprecated: use client.episode instead.
  def Episode(data = nil)
    require_relative 'entity/episode_entity'
    EpisodeEntity.new(self, data)
  end


  # Idiomatic facade: client.film.list / client.film.load({ "id" => ... })
  def film
    require_relative 'entity/film_entity'
    @film ||= FilmEntity.new(self, nil)
  end

  # Deprecated: use client.film instead.
  def Film(data = nil)
    require_relative 'entity/film_entity'
    FilmEntity.new(self, data)
  end


  # Idiomatic facade: client.fruit.list / client.fruit.load({ "id" => ... })
  def fruit
    require_relative 'entity/fruit_entity'
    @fruit ||= FruitEntity.new(self, nil)
  end

  # Deprecated: use client.fruit instead.
  def Fruit(data = nil)
    require_relative 'entity/fruit_entity'
    FruitEntity.new(self, data)
  end


  # Idiomatic facade: client.gear.list / client.gear.load({ "id" => ... })
  def gear
    require_relative 'entity/gear_entity'
    @gear ||= GearEntity.new(self, nil)
  end

  # Deprecated: use client.gear instead.
  def Gear(data = nil)
    require_relative 'entity/gear_entity'
    GearEntity.new(self, data)
  end


  # Idiomatic facade: client.haki.list / client.haki.load({ "id" => ... })
  def haki
    require_relative 'entity/haki_entity'
    @haki ||= HakiEntity.new(self, nil)
  end

  # Deprecated: use client.haki instead.
  def Haki(data = nil)
    require_relative 'entity/haki_entity'
    HakiEntity.new(self, data)
  end


  # Idiomatic facade: client.location.list / client.location.load({ "id" => ... })
  def location
    require_relative 'entity/location_entity'
    @location ||= LocationEntity.new(self, nil)
  end

  # Deprecated: use client.location instead.
  def Location(data = nil)
    require_relative 'entity/location_entity'
    LocationEntity.new(self, data)
  end


  # Idiomatic facade: client.saga.list / client.saga.load({ "id" => ... })
  def saga
    require_relative 'entity/saga_entity'
    @saga ||= SagaEntity.new(self, nil)
  end

  # Deprecated: use client.saga instead.
  def Saga(data = nil)
    require_relative 'entity/saga_entity'
    SagaEntity.new(self, data)
  end


  # Idiomatic facade: client.sword.list / client.sword.load({ "id" => ... })
  def sword
    require_relative 'entity/sword_entity'
    @sword ||= SwordEntity.new(self, nil)
  end

  # Deprecated: use client.sword instead.
  def Sword(data = nil)
    require_relative 'entity/sword_entity'
    SwordEntity.new(self, data)
  end


  # Idiomatic facade: client.technique.list / client.technique.load({ "id" => ... })
  def technique
    require_relative 'entity/technique_entity'
    @technique ||= TechniqueEntity.new(self, nil)
  end

  # Deprecated: use client.technique instead.
  def Technique(data = nil)
    require_relative 'entity/technique_entity'
    TechniqueEntity.new(self, data)
  end


  # Idiomatic facade: client.volume.list / client.volume.load({ "id" => ... })
  def volume
    require_relative 'entity/volume_entity'
    @volume ||= VolumeEntity.new(self, nil)
  end

  # Deprecated: use client.volume instead.
  def Volume(data = nil)
    require_relative 'entity/volume_entity'
    VolumeEntity.new(self, data)
  end



  def self.test(testopts = nil, sdkopts = nil)
    sdkopts = sdkopts || {}
    sdkopts = VoxgigStruct.clone(sdkopts)
    sdkopts = {} unless sdkopts.is_a?(Hash)

    testopts = testopts || {}
    testopts = VoxgigStruct.clone(testopts)
    testopts = {} unless testopts.is_a?(Hash)
    testopts["active"] = true

    VoxgigStruct.setpath(sdkopts, "feature.test", testopts)

    sdk = OnePieceSDK.new(sdkopts)
    sdk.mode = "test"
    sdk
  end
end
