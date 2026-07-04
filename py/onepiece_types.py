# Typed models for the OnePiece SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Boat(TypedDict, total=False):
    crew: str
    description: str
    id: int
    name: str
    type: str


class BoatLoadMatch(TypedDict):
    id: int


class BoatListMatch(TypedDict, total=False):
    crew: str
    description: str
    id: int
    name: str
    type: str


class Bow(TypedDict, total=False):
    description: str
    id: int
    name: str
    owner: str


class BowLoadMatch(TypedDict):
    id: int


class BowListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str
    owner: str


class Chapter(TypedDict, total=False):
    id: int
    number: int
    release_date: str
    saga: str
    title: str


class ChapterLoadMatch(TypedDict):
    id: int


class ChapterListMatch(TypedDict, total=False):
    id: int
    number: int
    release_date: str
    saga: str
    title: str


class Character(TypedDict, total=False):
    age: int
    bounty: int
    crew: str
    description: str
    devil_fruit: str
    id: int
    name: str


class CharacterLoadMatch(TypedDict):
    id: int


class CharacterListMatch(TypedDict, total=False):
    age: int
    bounty: int
    crew: str
    description: str
    devil_fruit: str
    id: int
    name: str


class Crew(TypedDict, total=False):
    captain: str
    description: str
    id: int
    member: list
    name: str
    ship: str


class CrewLoadMatch(TypedDict):
    id: int


class CrewListMatch(TypedDict, total=False):
    captain: str
    description: str
    id: int
    member: list
    name: str
    ship: str


class Dial(TypedDict, total=False):
    description: str
    id: int
    name: str
    type: str


class DialLoadMatch(TypedDict):
    id: int


class DialListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str
    type: str


class Episode(TypedDict, total=False):
    air_date: str
    id: int
    number: int
    saga: str
    title: str


class EpisodeLoadMatch(TypedDict):
    id: int


class EpisodeListMatch(TypedDict, total=False):
    air_date: str
    id: int
    number: int
    saga: str
    title: str


class Film(TypedDict, total=False):
    description: str
    id: int
    release_date: str
    title: str


class FilmLoadMatch(TypedDict):
    id: int


class FilmListMatch(TypedDict, total=False):
    description: str
    id: int
    release_date: str
    title: str


class Fruit(TypedDict, total=False):
    description: str
    id: int
    name: str
    type: str
    user: str


class FruitLoadMatch(TypedDict):
    id: int


class FruitListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str
    type: str
    user: str


class Gear(TypedDict, total=False):
    description: str
    first_appearance: str
    id: int
    name: str


class GearLoadMatch(TypedDict):
    id: int


class GearListMatch(TypedDict, total=False):
    description: str
    first_appearance: str
    id: int
    name: str


class Haki(TypedDict, total=False):
    description: str
    id: int
    name: str
    user: list


class HakiLoadMatch(TypedDict):
    id: int


class HakiListMatch(TypedDict, total=False):
    description: str
    id: int
    name: str
    user: list


class Location(TypedDict, total=False):
    description: str
    first_appearance: str
    id: int
    name: str
    type: str


class LocationLoadMatch(TypedDict):
    id: int


class LocationListMatch(TypedDict, total=False):
    description: str
    first_appearance: str
    id: int
    name: str
    type: str


class Saga(TypedDict, total=False):
    chapter: list
    description: str
    episode: list
    id: int
    name: str


class SagaLoadMatch(TypedDict):
    id: int


class SagaListMatch(TypedDict, total=False):
    chapter: list
    description: str
    episode: list
    id: int
    name: str


class Sword(TypedDict, total=False):
    description: str
    grade: str
    id: int
    name: str
    owner: str


class SwordLoadMatch(TypedDict):
    id: int


class SwordListMatch(TypedDict, total=False):
    description: str
    grade: str
    id: int
    name: str
    owner: str


class Technique(TypedDict, total=False):
    description: str
    gear: str
    id: int
    name: str


class TechniqueLoadMatch(TypedDict):
    id: int


class TechniqueListMatch(TypedDict, total=False):
    description: str
    gear: str
    id: int
    name: str


class Volume(TypedDict, total=False):
    chapter: list
    id: int
    number: int
    release_date: str
    title: str


class VolumeLoadMatch(TypedDict):
    id: int


class VolumeListMatch(TypedDict, total=False):
    chapter: list
    id: int
    number: int
    release_date: str
    title: str
