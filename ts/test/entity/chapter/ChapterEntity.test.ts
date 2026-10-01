

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


describe('ChapterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ONE_PIECE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OnePieceSDK.test()
    const ent = testsdk.Chapter()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'chapter.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Unique identifier for the chapter","t":"`$INTEGER`","key$":"id","index$":0},"number":{"a":true,"h":"Number","n":"number","r":false,"sh":"Chapter number","t":"`$INTEGER`","key$":"number","index$":1},"releaseDate":{"a":true,"fo":"date","h":"Release Date","n":"releaseDate","r":false,"sh":"Release date of the chapter","t":"`$STRING`","key$":"releaseDate","index$":2},"saga":{"a":true,"h":"Saga","n":"saga","r":false,"sh":"Saga this chapter belongs to","t":"`$STRING`","key$":"saga","index$":3},"title":{"a":true,"h":"Title","n":"title","r":false,"sh":"Title of the chapter","t":"`$STRING`","key$":"title","index$":4}},"id":{"field":"id","name":"id"},"name":"chapter","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /chapters","source":"openapi3","version":2},"g":{},"k":"http","m":"GET","o":"/chapters","q":{},"r":{},"s":[{"lit":"chapters"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /chapters/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$INTEGER`","index$":0}]},"k":"http","m":"GET","o":"/chapters/{id}","q":{"exist":["id"]},"r":{},"s":[{"lit":"chapters"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"chapter","name__orig":"chapter","Name":"Chapter","name_":"chapter","name-":"chapter","NAME":"CHAPTER","index$":2}, {"active":true,"entity":"chapter","key$":"BasicChapterFlow","kind":"basic","name":"BasicChapterFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"chapter_ref01"}}],"index$":0},{"a":true,"d":{},"i":{"ref":"chapter_ref01","srcdatavar":"chapter_ref01_data","suffix":"_dt0"},"m":{"id":"chapter01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-chapter_ref01"}}],"index$":1}]}, 'Chapter', {"GET /chapters":{"protocol":"http","parameters":[]},"GET /chapters/{id}":{"protocol":"http","parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"integer"},"description":"The ID of the chapter","index$":0}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let chapter_ref01_data = Object.values(setup.data.existing.chapter)[0] as any

    // LIST
    const chapter_ref01_ent = client.Chapter()
    const chapter_ref01_match: any = {}

    const chapter_ref01_list = (await chapter_ref01_ent.list(chapter_ref01_match)).map((e: any) => e.data())


    // LOAD
    const chapter_ref01_match_dt0: any = {}
    chapter_ref01_match_dt0.id = chapter_ref01_data.id
    const chapter_ref01_data_dt0 = (await chapter_ref01_ent.load(chapter_ref01_match_dt0)).data()
    assert(chapter_ref01_data_dt0.id === chapter_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/chapter/ChapterTestData.json')

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
    ['chapter01','chapter02','chapter03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'ONE_PIECE_TEST_CHAPTER_ENTID': idmap,
    'ONE_PIECE_TEST_LIVE': 'FALSE',
    'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['ONE_PIECE_TEST_CHAPTER_ENTID']

  const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['ONE_PIECE_TEST_CHAPTER_ENTID']
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
  
