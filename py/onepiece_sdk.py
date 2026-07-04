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


    @property
    def boat(self):
        """Idiomatic facade: client.boat.list() / client.boat.load({"id": ...})."""
        from entity.boat_entity import BoatEntity
        cached = getattr(self, "_boat", None)
        if cached is None:
            cached = BoatEntity(self, None)
            self._boat = cached
        return cached

    def Boat(self, data=None):
        # Deprecated: use client.boat instead.
        from entity.boat_entity import BoatEntity
        return BoatEntity(self, data)


    @property
    def bow(self):
        """Idiomatic facade: client.bow.list() / client.bow.load({"id": ...})."""
        from entity.bow_entity import BowEntity
        cached = getattr(self, "_bow", None)
        if cached is None:
            cached = BowEntity(self, None)
            self._bow = cached
        return cached

    def Bow(self, data=None):
        # Deprecated: use client.bow instead.
        from entity.bow_entity import BowEntity
        return BowEntity(self, data)


    @property
    def chapter(self):
        """Idiomatic facade: client.chapter.list() / client.chapter.load({"id": ...})."""
        from entity.chapter_entity import ChapterEntity
        cached = getattr(self, "_chapter", None)
        if cached is None:
            cached = ChapterEntity(self, None)
            self._chapter = cached
        return cached

    def Chapter(self, data=None):
        # Deprecated: use client.chapter instead.
        from entity.chapter_entity import ChapterEntity
        return ChapterEntity(self, data)


    @property
    def character(self):
        """Idiomatic facade: client.character.list() / client.character.load({"id": ...})."""
        from entity.character_entity import CharacterEntity
        cached = getattr(self, "_character", None)
        if cached is None:
            cached = CharacterEntity(self, None)
            self._character = cached
        return cached

    def Character(self, data=None):
        # Deprecated: use client.character instead.
        from entity.character_entity import CharacterEntity
        return CharacterEntity(self, data)


    @property
    def crew(self):
        """Idiomatic facade: client.crew.list() / client.crew.load({"id": ...})."""
        from entity.crew_entity import CrewEntity
        cached = getattr(self, "_crew", None)
        if cached is None:
            cached = CrewEntity(self, None)
            self._crew = cached
        return cached

    def Crew(self, data=None):
        # Deprecated: use client.crew instead.
        from entity.crew_entity import CrewEntity
        return CrewEntity(self, data)


    @property
    def dial(self):
        """Idiomatic facade: client.dial.list() / client.dial.load({"id": ...})."""
        from entity.dial_entity import DialEntity
        cached = getattr(self, "_dial", None)
        if cached is None:
            cached = DialEntity(self, None)
            self._dial = cached
        return cached

    def Dial(self, data=None):
        # Deprecated: use client.dial instead.
        from entity.dial_entity import DialEntity
        return DialEntity(self, data)


    @property
    def episode(self):
        """Idiomatic facade: client.episode.list() / client.episode.load({"id": ...})."""
        from entity.episode_entity import EpisodeEntity
        cached = getattr(self, "_episode", None)
        if cached is None:
            cached = EpisodeEntity(self, None)
            self._episode = cached
        return cached

    def Episode(self, data=None):
        # Deprecated: use client.episode instead.
        from entity.episode_entity import EpisodeEntity
        return EpisodeEntity(self, data)


    @property
    def film(self):
        """Idiomatic facade: client.film.list() / client.film.load({"id": ...})."""
        from entity.film_entity import FilmEntity
        cached = getattr(self, "_film", None)
        if cached is None:
            cached = FilmEntity(self, None)
            self._film = cached
        return cached

    def Film(self, data=None):
        # Deprecated: use client.film instead.
        from entity.film_entity import FilmEntity
        return FilmEntity(self, data)


    @property
    def fruit(self):
        """Idiomatic facade: client.fruit.list() / client.fruit.load({"id": ...})."""
        from entity.fruit_entity import FruitEntity
        cached = getattr(self, "_fruit", None)
        if cached is None:
            cached = FruitEntity(self, None)
            self._fruit = cached
        return cached

    def Fruit(self, data=None):
        # Deprecated: use client.fruit instead.
        from entity.fruit_entity import FruitEntity
        return FruitEntity(self, data)


    @property
    def gear(self):
        """Idiomatic facade: client.gear.list() / client.gear.load({"id": ...})."""
        from entity.gear_entity import GearEntity
        cached = getattr(self, "_gear", None)
        if cached is None:
            cached = GearEntity(self, None)
            self._gear = cached
        return cached

    def Gear(self, data=None):
        # Deprecated: use client.gear instead.
        from entity.gear_entity import GearEntity
        return GearEntity(self, data)


    @property
    def haki(self):
        """Idiomatic facade: client.haki.list() / client.haki.load({"id": ...})."""
        from entity.haki_entity import HakiEntity
        cached = getattr(self, "_haki", None)
        if cached is None:
            cached = HakiEntity(self, None)
            self._haki = cached
        return cached

    def Haki(self, data=None):
        # Deprecated: use client.haki instead.
        from entity.haki_entity import HakiEntity
        return HakiEntity(self, data)


    @property
    def location(self):
        """Idiomatic facade: client.location.list() / client.location.load({"id": ...})."""
        from entity.location_entity import LocationEntity
        cached = getattr(self, "_location", None)
        if cached is None:
            cached = LocationEntity(self, None)
            self._location = cached
        return cached

    def Location(self, data=None):
        # Deprecated: use client.location instead.
        from entity.location_entity import LocationEntity
        return LocationEntity(self, data)


    @property
    def saga(self):
        """Idiomatic facade: client.saga.list() / client.saga.load({"id": ...})."""
        from entity.saga_entity import SagaEntity
        cached = getattr(self, "_saga", None)
        if cached is None:
            cached = SagaEntity(self, None)
            self._saga = cached
        return cached

    def Saga(self, data=None):
        # Deprecated: use client.saga instead.
        from entity.saga_entity import SagaEntity
        return SagaEntity(self, data)


    @property
    def sword(self):
        """Idiomatic facade: client.sword.list() / client.sword.load({"id": ...})."""
        from entity.sword_entity import SwordEntity
        cached = getattr(self, "_sword", None)
        if cached is None:
            cached = SwordEntity(self, None)
            self._sword = cached
        return cached

    def Sword(self, data=None):
        # Deprecated: use client.sword instead.
        from entity.sword_entity import SwordEntity
        return SwordEntity(self, data)


    @property
    def technique(self):
        """Idiomatic facade: client.technique.list() / client.technique.load({"id": ...})."""
        from entity.technique_entity import TechniqueEntity
        cached = getattr(self, "_technique", None)
        if cached is None:
            cached = TechniqueEntity(self, None)
            self._technique = cached
        return cached

    def Technique(self, data=None):
        # Deprecated: use client.technique instead.
        from entity.technique_entity import TechniqueEntity
        return TechniqueEntity(self, data)


    @property
    def volume(self):
        """Idiomatic facade: client.volume.list() / client.volume.load({"id": ...})."""
        from entity.volume_entity import VolumeEntity
        cached = getattr(self, "_volume", None)
        if cached is None:
            cached = VolumeEntity(self, None)
            self._volume = cached
        return cached

    def Volume(self, data=None):
        # Deprecated: use client.volume instead.
        from entity.volume_entity import VolumeEntity
        return VolumeEntity(self, data)



    @classmethod
    def test(cls, testopts=None, sdkopts=None):
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
