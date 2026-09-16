

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"short":"Unique identifier for the chapter","type":"`$INTEGER`","index$":0},{"active":true,"name":"number","req":false,"short":"Chapter number","type":"`$INTEGER`","index$":1},{"active":true,"format":"date","name":"releaseDate","req":false,"short":"Release date of the chapter","type":"`$STRING`","index$":2},{"active":true,"name":"saga","req":false,"short":"Saga this chapter belongs to","type":"`$STRING`","index$":3},{"active":true,"name":"title","req":false,"short":"Title of the chapter","type":"`$STRING`","index$":4}],"id":{"field":"id","name":"id"},"name":"chapter","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /chapters","json":"{\"operationId\":\"getChapters\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the chapter\",\"type\":\"integer\"},\"number\":{\"description\":\"Chapter number\",\"type\":\"integer\"},\"releaseDate\":{\"description\":\"Release date of the chapter\",\"format\":\"date\",\"type\":\"string\"},\"saga\":{\"description\":\"Saga this chapter belongs to\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the chapter\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/chapters","segments":[{"lit":"chapters"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /chapters/{id}","json":"{\"operationId\":\"getChapterById\",\"parameters\":[{\"description\":\"The ID of the chapter\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the chapter\",\"type\":\"integer\"},\"number\":{\"description\":\"Chapter number\",\"type\":\"integer\"},\"releaseDate\":{\"description\":\"Release date of the chapter\",\"format\":\"date\",\"type\":\"string\"},\"saga\":{\"description\":\"Saga this chapter belongs to\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the chapter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Chapter not found\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/chapters/{id}","segments":[{"lit":"chapters"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"chapter","name__orig":"chapter","Name":"Chapter","name_":"chapter","name-":"chapter","NAME":"CHAPTER","index$":2}, {"active":true,"entity":"chapter","key$":"BasicChapterFlow","kind":"basic","name":"BasicChapterFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"chapter_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"chapter_ref01","srcdatavar":"chapter_ref01_data","suffix":"_dt0"},"match":{"id":"chapter01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-chapter_ref01"}}],"index$":1}]}, 'Chapter')
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
  
