# OnePiece SDK feature factory

from onepiece_sdk.feature.base_feature import OnePieceBaseFeature
from onepiece_sdk.feature.ratelimit_feature import OnePieceRatelimitFeature
from onepiece_sdk.feature.retry_feature import OnePieceRetryFeature
from onepiece_sdk.feature.test_feature import OnePieceTestFeature
from onepiece_sdk.feature.timeout_feature import OnePieceTimeoutFeature


_FEATURES = {
    "base": lambda: OnePieceBaseFeature(),
    "ratelimit": lambda: OnePieceRatelimitFeature(),
    "retry": lambda: OnePieceRetryFeature(),
    "test": lambda: OnePieceTestFeature(),
    "timeout": lambda: OnePieceTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
