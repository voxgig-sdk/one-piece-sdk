# OnePiece SDK feature factory

from feature.base_feature import OnePieceBaseFeature
from feature.test_feature import OnePieceTestFeature


def _make_feature(name):
    features = {
        "base": lambda: OnePieceBaseFeature(),
        "test": lambda: OnePieceTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
