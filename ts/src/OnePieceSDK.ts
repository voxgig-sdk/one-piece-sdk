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



  Boat(data?: any) {
    const self = this
    return new BoatEntity(self,data)
  }


  Bow(data?: any) {
    const self = this
    return new BowEntity(self,data)
  }


  Chapter(data?: any) {
    const self = this
    return new ChapterEntity(self,data)
  }


  Character(data?: any) {
    const self = this
    return new CharacterEntity(self,data)
  }


  Crew(data?: any) {
    const self = this
    return new CrewEntity(self,data)
  }


  Dial(data?: any) {
    const self = this
    return new DialEntity(self,data)
  }


  Episode(data?: any) {
    const self = this
    return new EpisodeEntity(self,data)
  }


  Film(data?: any) {
    const self = this
    return new FilmEntity(self,data)
  }


  Fruit(data?: any) {
    const self = this
    return new FruitEntity(self,data)
  }


  Gear(data?: any) {
    const self = this
    return new GearEntity(self,data)
  }


  Haki(data?: any) {
    const self = this
    return new HakiEntity(self,data)
  }


  Location(data?: any) {
    const self = this
    return new LocationEntity(self,data)
  }


  Saga(data?: any) {
    const self = this
    return new SagaEntity(self,data)
  }


  Sword(data?: any) {
    const self = this
    return new SwordEntity(self,data)
  }


  Technique(data?: any) {
    const self = this
    return new TechniqueEntity(self,data)
  }


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


