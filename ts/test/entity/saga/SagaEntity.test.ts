

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


describe('SagaEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ONE_PIECE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OnePieceSDK.test()
    const ent = testsdk.Saga()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'saga.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"chapters","req":false,"short":"Chapter IDs included in this saga","type":"`$ARRAY`","index$":0},{"active":true,"name":"description","req":false,"short":"Description of the saga","type":"`$STRING`","index$":1},{"active":true,"name":"episodes","req":false,"short":"Episode IDs included in this saga","type":"`$ARRAY`","index$":2},{"active":true,"name":"id","req":false,"short":"Unique identifier for the saga","type":"`$INTEGER`","index$":3},{"active":true,"name":"name","req":false,"short":"Name of the saga","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"saga","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /sagas","json":"{\"operationId\":\"getSagas\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"chapters\":{\"description\":\"Chapter IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"description\":{\"description\":\"Description of the saga\",\"type\":\"string\"},\"episodes\":{\"description\":\"Episode IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique identifier for the saga\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the saga\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/sagas","segments":[{"lit":"sagas"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /sagas/{id}","json":"{\"operationId\":\"getSagaById\",\"parameters\":[{\"description\":\"The ID of the saga\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"chapters\":{\"description\":\"Chapter IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"description\":{\"description\":\"Description of the saga\",\"type\":\"string\"},\"episodes\":{\"description\":\"Episode IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique identifier for the saga\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the saga\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Saga not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/sagas/{id}","segments":[{"lit":"sagas"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"saga","name__orig":"saga","Name":"Saga","name_":"saga","name-":"saga","NAME":"SAGA","index$":12}, {"active":true,"entity":"saga","key$":"BasicSagaFlow","kind":"basic","name":"BasicSagaFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"saga_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"saga_ref01","srcdatavar":"saga_ref01_data","suffix":"_dt0"},"match":{"id":"saga01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-saga_ref01"}}],"index$":1}]}, 'Saga')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let saga_ref01_data = Object.values(setup.data.existing.saga)[0] as any

    // LIST
    const saga_ref01_ent = client.Saga()
    const saga_ref01_match: any = {}

    const saga_ref01_list = (await saga_ref01_ent.list(saga_ref01_match)).map((e: any) => e.data())


    // LOAD
    const saga_ref01_match_dt0: any = {}
    saga_ref01_match_dt0.id = saga_ref01_data.id
    const saga_ref01_data_dt0 = (await saga_ref01_ent.load(saga_ref01_match_dt0)).data()
    assert(saga_ref01_data_dt0.id === saga_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/saga/SagaTestData.json')

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
    ['saga01','saga02','saga03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ONE_PIECE_TEST_SAGA_ENTID': idmap,
    'ONE_PIECE_TEST_LIVE': 'FALSE',
    'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ONE_PIECE_TEST_SAGA_ENTID']

  const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ONE_PIECE_TEST_SAGA_ENTID']
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
  
