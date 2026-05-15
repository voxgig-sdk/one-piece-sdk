# OnePiece SDK utility: make_context

from core.context import OnePieceContext


def make_context_util(ctxmap, basectx):
    return OnePieceContext(ctxmap, basectx)
