// OnePiece Ts SDK

import { BoatEntity } from './entity/BoatEntity'
import { BowEntity } from './entity/BowEntity'
import { ChapterEntity } from './entity/ChapterEntity'
import { CharacterEntity } from './entity/CharacterEntity'
import { CrewEntity } from './entity/CrewEntity'
import { DialEntity } from './entity/DialEntity'
import { EpisodeEntity } from './entity/EpisodeEntity'
import { FilmEntity } from './entity/FilmEntity'
import { FruitEntity } from './entity/FruitEntity'
import { GearEntity } from './entity/GearEntity'
import { HakiEntity } from './entity/HakiEntity'
import { LocationEntity } from './entity/LocationEntity'
import { SagaEntity } from './entity/SagaEntity'
import { SwordEntity } from './entity/SwordEntity'
import { TechniqueEntity } from './entity/TechniqueEntity'
import { VolumeEntity } from './entity/VolumeEntity'

export type * from './OnePieceTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { OnePieceEntityBase } from './OnePieceEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class OnePieceSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _boat?: BoatEntity

  // Idiomatic facade: `client.boat.list()` / `client.boat.load({ id })`.
  get boat(): BoatEntity {
    return (this._boat ??= new BoatEntity(this, undefined))
  }

  /** @deprecated Use `client.boat` instead. */
  Boat(data?: any) {
    const self = this
    return new BoatEntity(self,data)
  }


  _bow?: BowEntity

  // Idiomatic facade: `client.bow.list()` / `client.bow.load({ id })`.
  get bow(): BowEntity {
    return (this._bow ??= new BowEntity(this, undefined))
  }

  /** @deprecated Use `client.bow` instead. */
  Bow(data?: any) {
    const self = this
    return new BowEntity(self,data)
  }


  _chapter?: ChapterEntity

  // Idiomatic facade: `client.chapter.list()` / `client.chapter.load({ id })`.
  get chapter(): ChapterEntity {
    return (this._chapter ??= new ChapterEntity(this, undefined))
  }

  /** @deprecated Use `client.chapter` instead. */
  Chapter(data?: any) {
    const self = this
    return new ChapterEntity(self,data)
  }


  _character?: CharacterEntity

  // Idiomatic facade: `client.character.list()` / `client.character.load({ id })`.
  get character(): CharacterEntity {
    return (this._character ??= new CharacterEntity(this, undefined))
  }

  /** @deprecated Use `client.character` instead. */
  Character(data?: any) {
    const self = this
    return new CharacterEntity(self,data)
  }


  _crew?: CrewEntity

  // Idiomatic facade: `client.crew.list()` / `client.crew.load({ id })`.
  get crew(): CrewEntity {
    return (this._crew ??= new CrewEntity(this, undefined))
  }

  /** @deprecated Use `client.crew` instead. */
  Crew(data?: any) {
    const self = this
    return new CrewEntity(self,data)
  }


  _dial?: DialEntity

  // Idiomatic facade: `client.dial.list()` / `client.dial.load({ id })`.
  get dial(): DialEntity {
    return (this._dial ??= new DialEntity(this, undefined))
  }

  /** @deprecated Use `client.dial` instead. */
  Dial(data?: any) {
    const self = this
    return new DialEntity(self,data)
  }


  _episode?: EpisodeEntity

  // Idiomatic facade: `client.episode.list()` / `client.episode.load({ id })`.
  get episode(): EpisodeEntity {
    return (this._episode ??= new EpisodeEntity(this, undefined))
  }

  /** @deprecated Use `client.episode` instead. */
  Episode(data?: any) {
    const self = this
    return new EpisodeEntity(self,data)
  }


  _film?: FilmEntity

  // Idiomatic facade: `client.film.list()` / `client.film.load({ id })`.
  get film(): FilmEntity {
    return (this._film ??= new FilmEntity(this, undefined))
  }

  /** @deprecated Use `client.film` instead. */
  Film(data?: any) {
    const self = this
    return new FilmEntity(self,data)
  }


  _fruit?: FruitEntity

  // Idiomatic facade: `client.fruit.list()` / `client.fruit.load({ id })`.
  get fruit(): FruitEntity {
    return (this._fruit ??= new FruitEntity(this, undefined))
  }

  /** @deprecated Use `client.fruit` instead. */
  Fruit(data?: any) {
    const self = this
    return new FruitEntity(self,data)
  }


  _gear?: GearEntity

  // Idiomatic facade: `client.gear.list()` / `client.gear.load({ id })`.
  get gear(): GearEntity {
    return (this._gear ??= new GearEntity(this, undefined))
  }

  /** @deprecated Use `client.gear` instead. */
  Gear(data?: any) {
    const self = this
    return new GearEntity(self,data)
  }


  _haki?: HakiEntity

  // Idiomatic facade: `client.haki.list()` / `client.haki.load({ id })`.
  get haki(): HakiEntity {
    return (this._haki ??= new HakiEntity(this, undefined))
  }

  /** @deprecated Use `client.haki` instead. */
  Haki(data?: any) {
    const self = this
    return new HakiEntity(self,data)
  }


  _location?: LocationEntity

  // Idiomatic facade: `client.location.list()` / `client.location.load({ id })`.
  get location(): LocationEntity {
    return (this._location ??= new LocationEntity(this, undefined))
  }

  /** @deprecated Use `client.location` instead. */
  Location(data?: any) {
    const self = this
    return new LocationEntity(self,data)
  }


  _saga?: SagaEntity

  // Idiomatic facade: `client.saga.list()` / `client.saga.load({ id })`.
  get saga(): SagaEntity {
    return (this._saga ??= new SagaEntity(this, undefined))
  }

  /** @deprecated Use `client.saga` instead. */
  Saga(data?: any) {
    const self = this
    return new SagaEntity(self,data)
  }


  _sword?: SwordEntity

  // Idiomatic facade: `client.sword.list()` / `client.sword.load({ id })`.
  get sword(): SwordEntity {
    return (this._sword ??= new SwordEntity(this, undefined))
  }

  /** @deprecated Use `client.sword` instead. */
  Sword(data?: any) {
    const self = this
    return new SwordEntity(self,data)
  }


  _technique?: TechniqueEntity

  // Idiomatic facade: `client.technique.list()` / `client.technique.load({ id })`.
  get technique(): TechniqueEntity {
    return (this._technique ??= new TechniqueEntity(this, undefined))
  }

  /** @deprecated Use `client.technique` instead. */
  Technique(data?: any) {
    const self = this
    return new TechniqueEntity(self,data)
  }


  _volume?: VolumeEntity

  // Idiomatic facade: `client.volume.list()` / `client.volume.load({ id })`.
  get volume(): VolumeEntity {
    return (this._volume ??= new VolumeEntity(this, undefined))
  }

  /** @deprecated Use `client.volume` instead. */
  Volume(data?: any) {
    const self = this
    return new VolumeEntity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new OnePieceSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return OnePieceSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'OnePiece' }
  }

  toString() {
    return 'OnePiece ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = OnePieceSDK


export {
  stdutil,

  BaseFeature,
  OnePieceEntityBase,

  OnePieceSDK,
  SDK,
}


