
const envlocal = __dirname + '/../../../.env.local'
require('dotenv').config({ quiet: true, path: [envlocal] })

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'


import { OnePieceSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveDelay,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


describe('ChapterEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when ONEPIECE_TEST_LIVE=TRUE.
  afterEach(liveDelay('ONEPIECE_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OnePieceSDK.test()
    const ent = testsdk.Chapter()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (maybeSkipControl(t, 'entityOp', 'chapter.' + op, live)) return
    }

    const setup = basicSetup()
    // The basic flow consumes synthetic IDs and field values from the
    // fixture (entity TestData.json). Those don't exist on the live API.
    // Skip live runs unless the user provided a real ENTID env override.
    if (setup.syntheticOnly) {
      t.skip('live entity test uses synthetic IDs from fixture — set ONE_PIECE_TEST_CHAPTER_ENTID JSON to run live')
      return
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let chapter_ref01_data = Object.values(setup.data.existing.chapter)[0] as any

    // LIST
    const chapter_ref01_ent = client.Chapter()
    const chapter_ref01_match: any = {}

    const chapter_ref01_list = await chapter_ref01_ent.list(chapter_ref01_match)


    // LOAD
    const chapter_ref01_match_dt0: any = {}
    chapter_ref01_match_dt0.id = chapter_ref01_data.id
    const chapter_ref01_data_dt0 = await chapter_ref01_ent.load(chapter_ref01_match_dt0)
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

  // Detect whether the user provided a real ENTID JSON via env var. The
  // basic flow consumes synthetic IDs from the fixture file; without an
  // override those synthetic IDs reach the live API and 4xx. Surface this
  // to the test so it can skip rather than fail.
  const idmapEnvVal = process.env['ONE_PIECE_TEST_CHAPTER_ENTID']
  const idmapOverridden = null != idmapEnvVal && idmapEnvVal.trim().startsWith('{')

  const env = envOverride({
    'ONE_PIECE_TEST_CHAPTER_ENTID': idmap,
    'ONE_PIECE_TEST_LIVE': 'FALSE',
    'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
    'ONE_PIECE_APIKEY': 'NONE',
  })

  idmap = env['ONE_PIECE_TEST_CHAPTER_ENTID']

  const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE

  if (live) {
    client = new OnePieceSDK(merge([
      {
        apikey: env.ONE_PIECE_APIKEY,
      },
      extra
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
    syntheticOnly: live && !idmapOverridden,
    now: Date.now(),
  }

  return setup
}
  
