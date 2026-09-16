

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


describe('BoatEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ONE_PIECE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OnePieceSDK.test()
    const ent = testsdk.Boat()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'boat.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"crew","req":false,"short":"Crew that owns the boat","type":"`$STRING`","index$":0},{"active":true,"name":"description","req":false,"short":"Description of the boat","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Unique identifier for the boat","type":"`$INTEGER`","index$":2},{"active":true,"name":"name","req":false,"short":"Name of the boat/ship","type":"`$STRING`","index$":3},{"active":true,"name":"type","req":false,"short":"Type of vessel","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"boat","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /boats","json":"{\"operationId\":\"getBoats\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"crew\":{\"description\":\"Crew that owns the boat\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the boat\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the boat\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the boat/ship\",\"type\":\"string\"},\"type\":{\"description\":\"Type of vessel\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boats","segments":[{"lit":"boats"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /boats/{id}","json":"{\"operationId\":\"getBoatById\",\"parameters\":[{\"description\":\"The ID of the boat\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"crew\":{\"description\":\"Crew that owns the boat\",\"type\":\"string\"},\"description\":{\"description\":\"Description of the boat\",\"type\":\"string\"},\"id\":{\"description\":\"Unique identifier for the boat\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the boat/ship\",\"type\":\"string\"},\"type\":{\"description\":\"Type of vessel\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Boat not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/boats/{id}","segments":[{"lit":"boats"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"boat","name__orig":"boat","Name":"Boat","name_":"boat","name-":"boat","NAME":"BOAT","index$":0}, {"active":true,"entity":"boat","key$":"BasicBoatFlow","kind":"basic","name":"BasicBoatFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"boat_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"boat_ref01","srcdatavar":"boat_ref01_data","suffix":"_dt0"},"match":{"id":"boat01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-boat_ref01"}}],"index$":1}]}, 'Boat')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let boat_ref01_data = Object.values(setup.data.existing.boat)[0] as any

    // LIST
    const boat_ref01_ent = client.Boat()
    const boat_ref01_match: any = {}

    const boat_ref01_list = (await boat_ref01_ent.list(boat_ref01_match)).map((e: any) => e.data())


    // LOAD
    const boat_ref01_match_dt0: any = {}
    boat_ref01_match_dt0.id = boat_ref01_data.id
    const boat_ref01_data_dt0 = (await boat_ref01_ent.load(boat_ref01_match_dt0)).data()
    assert(boat_ref01_data_dt0.id === boat_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/boat/BoatTestData.json')

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
    ['boat01','boat02','boat03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ONE_PIECE_TEST_BOAT_ENTID': idmap,
    'ONE_PIECE_TEST_LIVE': 'FALSE',
    'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ONE_PIECE_TEST_BOAT_ENTID']

  const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ONE_PIECE_TEST_BOAT_ENTID']
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
  
