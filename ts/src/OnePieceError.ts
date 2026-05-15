
import { Context } from './Context'


class OnePieceError extends Error {

  isOnePieceError = true

  sdk = 'OnePiece'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  OnePieceError
}

