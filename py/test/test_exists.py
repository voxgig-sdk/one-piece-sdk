# OnePiece SDK exists test

import pytest
from onepiece_sdk import OnePieceSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = OnePieceSDK.test(None, None)
        assert testsdk is not None
