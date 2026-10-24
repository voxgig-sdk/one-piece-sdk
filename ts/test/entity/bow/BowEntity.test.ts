

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OnePieceSDK, BaseFeature, config, stdutil } from '../../..'

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


describe('BowEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ONE_PIECE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OnePieceSDK.test()
    const ent = testsdk.Bow()
    assert(null != ent)
  })


  class FailHook extends BaseFeature {
    name = 'failhook'
    version = '0.0.1'
    active = true
    unexpected = 0
    init() { }
    PreSpec() { throw new Error('bow hook failed') }
    PreUnexpected() { this.unexpected++ }
  }

  test('stream-error', async () => {
    const offline = { net: { offline: true } }
    await assert.rejects(async () => {
      for await (const _item of OnePieceSDK.test(offline).Bow().stream('list')) { }
    }, /offline/)

    for await (const _item of OnePieceSDK.test(offline).Bow()
      .stream('list', undefined, { ctrl: { throw: false } })) { }

    if (null != (config as any).feature?.rbac) {
      const denied = OnePieceSDK.test(undefined, { feature: { rbac: { active: true, deny: true } } })
      await assert.rejects(async () => {
        for await (const _item of denied.Bow().stream('list')) { }
      }, (err: any) => 'rbac_denied' === err.code)
    }
  })

  test('stream-ctrl', async () => {
    const explain: any = {}
    const ctrl: any = { explain }
    for await (const _item of OnePieceSDK.test().Bow().stream('list', undefined, { ctrl })) { }
    assert.deepStrictEqual(Object.keys(ctrl), ['explain'])
    assert(explain === ctrl.explain && 0 < Object.keys(explain).length)
  })

  test('unexpected', async () => {
    const hook = new FailHook()
    const client = new OnePieceSDK({ feature: { test: { active: true } }, extend: [hook] })
    await assert.rejects(client.Bow().list(), /hook failed/)
    assert(0 < hook.unexpected)

    const fired = hook.unexpected
    assert.strictEqual(await client.Bow().list(undefined, { throw: false }), undefined)
    assert(fired < hook.unexpected)
  })

  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = OnePieceSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Bow().list({"description":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'bow.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"description":{"a":true,"h":"Description","n":"description","r":false,"sh":"Description of the bow","t":"`$STRING`","key$":"description","index$":0},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the bow","t":"`$INTEGER`","key$":"id","index$":1},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Name of the bow","t":"`$STRING`","key$":"name","index$":2},"owner":{"a":true,"h":"Owner","n":"owner","r":false,"sh":"Owner of the bow","t":"`$STRING`","key$":"owner","index$":3}},"id":{"field":"id","name":"id"},"name":"bow","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /bows","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/bows","q":{},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"bows"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /bows/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/bows/{id}","q":{"exist":["id"]},"r":{},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"bows"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"bow","name__orig":"bow","Name":"Bow","name_":"bow","name-":"bow","NAME":"BOW","index$":1}, {"active":true,"entity":"bow","key$":"BasicBowFlow","kind":"basic","name":"BasicBowFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"bow_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"bow_ref01","srcdatavar":"bow_ref01_data","suffix":"_dt0"},"m":{"id":"bow01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-bow_ref01"}}],"index$":1}]}, 'Bow', {"GET /bows":{"protocol":"http","parameters":[]},"GET /bows/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"description":"The ID of the bow","index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let bow_ref01_data = Object.values(setup.data.existing.bow)[0] as any

    // LIST
    const bow_ref01_ent = client.Bow()
    const bow_ref01_match: any = {}

    const bow_ref01_list = (await bow_ref01_ent.list(bow_ref01_match)).map((e: any) => e.data())


    // LOAD
    const bow_ref01_match_dt0: any = {}
    bow_ref01_match_dt0.id = bow_ref01_data.id
    const bow_ref01_data_dt0 = (await bow_ref01_ent.load(bow_ref01_match_dt0)).data()
    assert(bow_ref01_data_dt0.id === bow_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/bow/BowTestData.json')

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
    ['bow01','bow02','bow03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ONE_PIECE_TEST_BOW_ENTID': idmap,
    'ONE_PIECE_TEST_LIVE': 'FALSE',
    'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ONE_PIECE_TEST_BOW_ENTID']

  const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ONE_PIECE_TEST_BOW_ENTID']
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
  
