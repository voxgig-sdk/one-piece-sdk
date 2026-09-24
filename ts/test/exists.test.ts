
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OnePieceSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OnePieceSDK.test()
    equal(testsdk instanceof OnePieceSDK, true,
      'OnePieceSDK.test() must return a client synchronously')
  })

})
