

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


describe('FruitEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ONE_PIECE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OnePieceSDK.test()
    const ent = testsdk.Fruit()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'fruit.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the Devil Fruit's powers","t":"`$STRING`","key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the Devil Fruit","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the Devil Fruit","t":"`$STRING`","key$":"name","index$":2},"type":{"a":true,"h":"Type","n":"type","r":false,"sh":"Type of Devil Fruit (Paramecia, Zoan, Logia)","t":"`$STRING`","key$":"type","index$":3},"user":{"a":true,"h":"User","n":"user","r":false,"sh":"Current or known user of the fruit","t":"`$STRING`","key$":"user","index$":4}},"id":{"field":"id","name":"id"},"name":"fruit","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /fruits","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/fruits","q":{},"r":{},"s":[{"lit":"fruits"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /fruits/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/fruits/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"fruits"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"fruit","name__orig":"fruit","Name":"Fruit","name_":"fruit","name-":"fruit","NAME":"FRUIT","index$":8}, {"active":true,"entity":"fruit","key$":"BasicFruitFlow","kind":"basic","name":"BasicFruitFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"fruit_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"fruit_ref01","srcdatavar":"fruit_ref01_data","suffix":"_dt0"},"m":{"id":"fruit01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-fruit_ref01"}}],"index$":1}]}, 'Fruit', {"GET /fruits":{"protocol":"http","operationId":"getFruits","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the Devil Fruit","key$":"id"},"name":{"type":"string","description":"Name of the Devil Fruit","key$":"name"},"type":{"type":"string","description":"Type of Devil Fruit (Paramecia, Zoan, Logia)","key$":"type"},"description":{"type":"string","description":"Description of the Devil Fruit's powers","key$":"description"},"user":{"type":"string","description":"Current or known user of the fruit","key$":"user"}},"x-ref":"#/components/schemas/Fruit","index$":0}}}}}},"parameters":[],"securitySource":"unspecified"},"GET /fruits/{id}":{"protocol":"http","operationId":"getFruitById","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"id":{"type":"integer","description":"Unique identifier for the Devil Fruit","key$":"id"},"name":{"type":"string","description":"Name of the Devil Fruit","key$":"name"},"type":{"type":"string","description":"Type of Devil Fruit (Paramecia, Zoan, Logia)","key$":"type"},"description":{"type":"string","description":"Description of the Devil Fruit's powers","key$":"description"},"user":{"type":"string","description":"Current or known user of the fruit","key$":"user"}},"x-ref":"#/components/schemas/Fruit","index$":0}}}},"404":{"description":"Fruit not found"}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"description":"The ID of the Devil Fruit","index$":0}],"securitySource":"unspecified"}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let fruit_ref01_data = Object.values(setup.data.existing.fruit)[0] as any

    // LIST
    const fruit_ref01_ent = client.Fruit()
    const fruit_ref01_match: any = {}

    const fruit_ref01_list = (await fruit_ref01_ent.list(fruit_ref01_match)).map((e: any) => e.data())


    // LOAD
    const fruit_ref01_match_dt0: any = {}
    fruit_ref01_match_dt0.id = fruit_ref01_data.id
    const fruit_ref01_data_dt0 = (await fruit_ref01_ent.load(fruit_ref01_match_dt0)).data()
    assert(fruit_ref01_data_dt0.id === fruit_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/fruit/FruitTestData.json')

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
    ['fruit01','fruit02','fruit03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ONE_PIECE_TEST_FRUIT_ENTID': idmap,
    'ONE_PIECE_TEST_LIVE': 'FALSE',
    'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ONE_PIECE_TEST_FRUIT_ENTID']

  const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ONE_PIECE_TEST_FRUIT_ENTID']
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
  
