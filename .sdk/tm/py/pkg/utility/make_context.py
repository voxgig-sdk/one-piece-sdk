# OnePiece SDK utility: make_context

from projectname_sdk.core.context import OnePieceContext


def make_context_util(ctxmap, basectx):
    return OnePieceContext(ctxmap, basectx)
