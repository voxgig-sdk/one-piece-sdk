

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"description","req":false,"short":"Description of the Devil Fruit's powers","type":"`$STRING`","index$":0},{"active":true,"name":"id","req":false,"short":"Unique identifier for the Devil Fruit","type":"`$INTEGER`","index$":1},{"active":true,"name":"name","req":false,"short":"Name of the Devil Fruit","type":"`$STRING`","index$":2},{"active":true,"name":"type","req":false,"short":"Type of Devil Fruit (Paramecia, Zoan, Logia)","type":"`$STRING`","index$":3},{"active":true,"name":"user","req":false,"short":"Current or known user of the fruit","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"fruit","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /fruits","json":"{\"operationId\":\"getFruits\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"description\":{\"description\":\"Description of the Devil Fruit's powers\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the Devil Fruit\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the Devil Fruit\",\"type\":\"string\"},\"type\":{\"description\":\"Type of Devil Fruit (Paramecia, Zoan, Logia)\",\"type\":\"string\"},\"user\":{\"description\":\"Current or known user of the fruit\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/fruits","segments":[{"lit":"fruits"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /fruits/{id}","json":"{\"operationId\":\"getFruitById\",\"parameters\":[{\"description\":\"The ID of the Devil Fruit\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"description\":{\"description\":\"Description of the Devil Fruit's powers\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the Devil Fruit\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the Devil Fruit\",\"type\":\"string\"},\"type\":{\"description\":\"Type of Devil Fruit (Paramecia, Zoan, Logia)\",\"type\":\"string\"},\"user\":{\"description\":\"Current or known user of the fruit\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Fruit not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/fruits/{id}","segments":[{"lit":"fruits"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"fruit","name__orig":"fruit","Name":"Fruit","name_":"fruit","name-":"fruit","NAME":"FRUIT","index$":8}, {"active":true,"entity":"fruit","key$":"BasicFruitFlow","kind":"basic","name":"BasicFruitFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"fruit_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"fruit_ref01","srcdatavar":"fruit_ref01_data","suffix":"_dt0"},"match":{"id":"fruit01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-fruit_ref01"}}],"index$":1}]}, 'Fruit')
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
  
