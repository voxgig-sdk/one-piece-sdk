# OnePiece SDK

from utility.voxgig_struct import voxgig_struct as vs
from core.utility_type import OnePieceUtility
from core.spec import OnePieceSpec
from core import helpers

# Load utility registration (populates Utility._registrar)
from utility import register

# Load features
from feature.base_feature import OnePieceBaseFeature
from features import _make_feature


class OnePieceSDK:

    def __init__(self, options=None):
        self.mode = "live"
        self.features = []
        self.options = None

        utility = OnePieceUtility()
        self._utility = utility

        from config import make_config
        config = make_config()

        self._rootctx = utility.make_context({
            "client": self,
            "utility": utility,
            "config": config,
            "options": options if options is not None else {},
            "shared": {},
        }, None)

        self.options = utility.make_options(self._rootctx)

        if vs.getpath(self.options, "feature.test.active") is True:
            self.mode = "test"

        self._rootctx.options = self.options

        # Add features from config.
        feature_opts = helpers.to_map(vs.getprop(self.options, "feature"))
        if feature_opts is not None:
            feature_items = vs.items(feature_opts)
            if feature_items is not None:
                for item in feature_items:
                    fname = item[0]
                    fopts = helpers.to_map(item[1])
                    if fopts is not None and fopts.get("active") is True:
                        utility.feature_add(self._rootctx, _make_feature(fname))

        # Add extension features.
        extend = vs.getprop(self.options, "extend")
        if isinstance(extend, list):
            for f in extend:
                if isinstance(f, dict) or (hasattr(f, "get_name") and callable(f.get_name)):
                    utility.feature_add(self._rootctx, f)

        # Initialize features.
        for f in self.features:
            utility.feature_init(self._rootctx, f)

        utility.feature_hook(self._rootctx, "PostConstruct")

        # #BuildFeatures

    def options_map(self):
        out = vs.clone(self.options)
        if isinstance(out, dict):
            return out
        return {}

    def get_utility(self):
        return OnePieceUtility.copy(self._utility)

    def get_root_ctx(self):
        return self._rootctx

    def prepare(self, fetchargs=None):
        utility = self._utility

        if fetchargs is None:
            fetchargs = {}

        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "prepare",
            "ctrl": ctrl,
        }, self._rootctx)

        options = self.options

        path = vs.getprop(fetchargs, "path") or ""
        if not isinstance(path, str):
            path = ""

        method = vs.getprop(fetchargs, "method") or "GET"
        if not isinstance(method, str):
            method = "GET"

        params = helpers.to_map(vs.getprop(fetchargs, "params"))
        if params is None:
            params = {}
        query = helpers.to_map(vs.getprop(fetchargs, "query"))
        if query is None:
            query = {}

        headers = utility.prepare_headers(ctx)

        base = vs.getprop(options, "base") or ""
        if not isinstance(base, str):
            base = ""
        prefix = vs.getprop(options, "prefix") or ""
        if not isinstance(prefix, str):
            prefix = ""
        suffix = vs.getprop(options, "suffix") or ""
        if not isinstance(suffix, str):
            suffix = ""

        ctx.spec = OnePieceSpec({
            "base": base,
            "prefix": prefix,
            "suffix": suffix,
            "path": path,
            "method": method,
            "params": params,
            "query": query,
            "headers": headers,
            "body": vs.getprop(fetchargs, "body"),
            "step": "start",
        })

        # Merge user-provided headers.
        uh = vs.getprop(fetchargs, "headers")
        if isinstance(uh, dict):
            for k, v in uh.items():
                ctx.spec.headers[k] = v

        _, err = utility.prepare_auth(ctx)
        if err is not None:
            raise err

        fetchdef, err = utility.make_fetch_def(ctx)
        if err is not None:
            raise err

        return fetchdef

    def direct(self, fetchargs=None):
        utility = self._utility

        try:
            fetchdef = self.prepare(fetchargs)
        except Exception as err:
            # direct() is the raw-HTTP escape hatch: it never raises, it
            # returns a result object callers branch on via result["ok"].
            return {"ok": False, "err": err}

        if fetchargs is None:
            fetchargs = {}
        ctrl = helpers.to_map(vs.getprop(fetchargs, "ctrl"))
        if ctrl is None:
            ctrl = {}

        ctx = utility.make_context({
            "opname": "direct",
            "ctrl": ctrl,
        }, self._rootctx)

        url = fetchdef.get("url", "")
        fetched, fetch_err = utility.fetcher(ctx, url, fetchdef)

        if fetch_err is not None:
            return {"ok": False, "err": fetch_err}

        if fetched is None:
            return {
                "ok": False,
                "err": ctx.make_error("direct_no_response", "response: undefined"),
            }

        if isinstance(fetched, dict):
            status = helpers.to_int(vs.getprop(fetched, "status"))
            headers = vs.getprop(fetched, "headers") or {}

            # No-body responses (204, 304) and explicit zero content-length
            # must skip JSON parsing — calling json() on an empty body raises.
            content_length = None
            if isinstance(headers, dict):
                content_length = headers.get("content-length")
            no_body = status in (204, 304) or str(content_length) == "0"

            json_data = None
            if not no_body:
                jf = vs.getprop(fetched, "json")
                if callable(jf):
                    try:
                        json_data = jf()
                    except Exception:
                        # Non-JSON body (e.g. text/plain, text/html). Surface
                        # status + headers but leave data as None.
                        json_data = None

            return {
                "ok": status >= 200 and status < 300,
                "status": status,
                "headers": headers,
                "data": json_data,
            }

        return {
            "ok": False,
            "err": ctx.make_error("direct_invalid", "invalid response type"),
        }


    def Boat(self, data=None) -> "BoatEntity":
        """Entity factory: client.Boat().list() / client.Boat().load({"id": ...})."""
        from entity.boat_entity import BoatEntity
        return BoatEntity(self, data)


    def Bow(self, data=None) -> "BowEntity":
        """Entity factory: client.Bow().list() / client.Bow().load({"id": ...})."""
        from entity.bow_entity import BowEntity
        return BowEntity(self, data)


    def Chapter(self, data=None) -> "ChapterEntity":
        """Entity factory: client.Chapter().list() / client.Chapter().load({"id": ...})."""
        from entity.chapter_entity import ChapterEntity
        return ChapterEntity(self, data)


    def Character(self, data=None) -> "CharacterEntity":
        """Entity factory: client.Character().list() / client.Character().load({"id": ...})."""
        from entity.character_entity import CharacterEntity
        return CharacterEntity(self, data)


    def Crew(self, data=None) -> "CrewEntity":
        """Entity factory: client.Crew().list() / client.Crew().load({"id": ...})."""
        from entity.crew_entity import CrewEntity
        return CrewEntity(self, data)


    def Dial(self, data=None) -> "DialEntity":
        """Entity factory: client.Dial().list() / client.Dial().load({"id": ...})."""
        from entity.dial_entity import DialEntity
        return DialEntity(self, data)


    def Episode(self, data=None) -> "EpisodeEntity":
        """Entity factory: client.Episode().list() / client.Episode().load({"id": ...})."""
        from entity.episode_entity import EpisodeEntity
        return EpisodeEntity(self, data)


    def Film(self, data=None) -> "FilmEntity":
        """Entity factory: client.Film().list() / client.Film().load({"id": ...})."""
        from entity.film_entity import FilmEntity
        return FilmEntity(self, data)


    def Fruit(self, data=None) -> "FruitEntity":
        """Entity factory: client.Fruit().list() / client.Fruit().load({"id": ...})."""
        from entity.fruit_entity import FruitEntity
        return FruitEntity(self, data)


    def Gear(self, data=None) -> "GearEntity":
        """Entity factory: client.Gear().list() / client.Gear().load({"id": ...})."""
        from entity.gear_entity import GearEntity
        return GearEntity(self, data)


    def Haki(self, data=None) -> "HakiEntity":
        """Entity factory: client.Haki().list() / client.Haki().load({"id": ...})."""
        from entity.haki_entity import HakiEntity
        return HakiEntity(self, data)


    def Location(self, data=None) -> "LocationEntity":
        """Entity factory: client.Location().list() / client.Location().load({"id": ...})."""
        from entity.location_entity import LocationEntity
        return LocationEntity(self, data)


    def Saga(self, data=None) -> "SagaEntity":
        """Entity factory: client.Saga().list() / client.Saga().load({"id": ...})."""
        from entity.saga_entity import SagaEntity
        return SagaEntity(self, data)


    def Sword(self, data=None) -> "SwordEntity":
        """Entity factory: client.Sword().list() / client.Sword().load({"id": ...})."""
        from entity.sword_entity import SwordEntity
        return SwordEntity(self, data)


    def Technique(self, data=None) -> "TechniqueEntity":
        """Entity factory: client.Technique().list() / client.Technique().load({"id": ...})."""
        from entity.technique_entity import TechniqueEntity
        return TechniqueEntity(self, data)


    def Volume(self, data=None) -> "VolumeEntity":
        """Entity factory: client.Volume().list() / client.Volume().load({"id": ...})."""
        from entity.volume_entity import VolumeEntity
        return VolumeEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None) -> "OnePieceSDK":
        if sdkopts is None:
            sdkopts = {}
        sdkopts = vs.clone(sdkopts)
        if not isinstance(sdkopts, dict):
            sdkopts = {}

        if testopts is None:
            testopts = {}
        testopts = vs.clone(testopts)
        if not isinstance(testopts, dict):
            testopts = {}
        testopts["active"] = True

        vs.setpath(sdkopts, "feature.test", testopts)

        sdk = cls(sdkopts)
        sdk.mode = "test"

        return sdk


from typing import TYPE_CHECKING

if TYPE_CHECKING:
    from entity.boat_entity import BoatEntity
    from entity.bow_entity import BowEntity
    from entity.chapter_entity import ChapterEntity
    from entity.character_entity import CharacterEntity
    from entity.crew_entity import CrewEntity
    from entity.dial_entity import DialEntity
    from entity.episode_entity import EpisodeEntity
    from entity.film_entity import FilmEntity
    from entity.fruit_entity import FruitEntity
    from entity.gear_entity import GearEntity
    from entity.haki_entity import HakiEntity
    from entity.location_entity import LocationEntity
    from entity.saga_entity import SagaEntity
    from entity.sword_entity import SwordEntity
    from entity.technique_entity import TechniqueEntity
    from entity.volume_entity import VolumeEntity
