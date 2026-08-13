# OnePiece SDK feature factory

from onepiece_sdk.feature.base_feature import OnePieceBaseFeature
from onepiece_sdk.feature.test_feature import OnePieceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OnePieceBaseFeature(),
        "test": lambda: OnePieceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
