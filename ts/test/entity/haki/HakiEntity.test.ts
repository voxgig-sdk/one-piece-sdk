

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OnePieceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('HakiEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ONE_PIECE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OnePieceSDK.test()
    const ent = testsdk.Haki()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'haki.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the Haki type","t":"`$STRING`","key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the Haki type","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the Haki type","t":"`$STRING`","key$":"name","index$":2},"users":{"a":true,"h":"Users","n":"users","r":false,"sh":"Known users of this Haki type","t":"`$ARRAY`","key$":"users","index$":3}},"id":{"field":"id","name":"id"},"name":"haki","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /hakis","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/hakis","q":{},"r":{},"s":[{"lit":"hakis"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /hakis/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/hakis/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"hakis"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"haki","name__orig":"haki","Name":"Haki","name_":"haki","name-":"haki","NAME":"HAKI","index$":10}, {"active":true,"entity":"haki","key$":"BasicHakiFlow","kind":"basic","name":"BasicHakiFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"haki_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"haki_ref01","srcdatavar":"haki_ref01_data","suffix":"_dt0"},"m":{"id":"haki01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-haki_ref01"}}],"index$":1}]}, 'Haki', {"GET /hakis":{"protocol":"http","operationId":"getHakis","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the Haki type","key$":"id"},"name":{"type":"string","description":"Name of the Haki type","key$":"name"},"description":{"type":"string","description":"Description of the Haki type","key$":"description"},"users":{"type":"array","items":{"type":"string"},"description":"Known users of this Haki type","key$":"users"}},"x-ref":"#/components/schemas/Haki","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /hakis/{id}":{"protocol":"http","operationId":"getHakiById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the Haki type","key$":"id"},"name":{"type":"string","description":"Name of the Haki type","key$":"name"},"description":{"type":"string","description":"Description of the Haki type","key$":"description"},"users":{"type":"array","items":{"type":"string"},"description":"Known users of this Haki type","key$":"users"}},"x-ref":"#/components/schemas/Haki","index$":0}}}},"404":{"description":"Haki not found"}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"description":"The ID of the Haki","index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let haki_ref01_data = Object.values(setup.data.existing.haki)[0] as any

    // LIST
    const haki_ref01_ent = client.Haki()
    const haki_ref01_match: any = {}

    const haki_ref01_list = (await haki_ref01_ent.list(haki_ref01_match)).map((e: any) => e.data())


    // LOAD
    const haki_ref01_match_dt0: any = {}
    haki_ref01_match_dt0.id = haki_ref01_data.id
    const haki_ref01_data_dt0 = (await haki_ref01_ent.load(haki_ref01_match_dt0)).data()
    assert(haki_ref01_data_dt0.id === haki_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/haki/HakiTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OnePieceSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['haki01','haki02','haki03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ONE_PIECE_TEST_HAKI_ENTID': idmap,
    'ONE_PIECE_TEST_LIVE': 'FALSE',
    'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ONE_PIECE_TEST_HAKI_ENTID']

  const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ONE_PIECE_TEST_HAKI_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OnePieceSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.ONE_PIECE_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
