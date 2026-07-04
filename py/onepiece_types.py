# Typed models for the OnePiece SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Boat:
    crew: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class BoatLoadMatch:
    id: int


@dataclass
class BoatListMatch:
    crew: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Bow:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    owner: Optional[str] = None


@dataclass
class BowLoadMatch:
    id: int


@dataclass
class BowListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    owner: Optional[str] = None


@dataclass
class Chapter:
    id: Optional[int] = None
    number: Optional[int] = None
    release_date: Optional[str] = None
    saga: Optional[str] = None
    title: Optional[str] = None


@dataclass
class ChapterLoadMatch:
    id: int


@dataclass
class ChapterListMatch:
    id: Optional[int] = None
    number: Optional[int] = None
    release_date: Optional[str] = None
    saga: Optional[str] = None
    title: Optional[str] = None


@dataclass
class Character:
    age: Optional[int] = None
    bounty: Optional[int] = None
    crew: Optional[str] = None
    description: Optional[str] = None
    devil_fruit: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class CharacterLoadMatch:
    id: int


@dataclass
class CharacterListMatch:
    age: Optional[int] = None
    bounty: Optional[int] = None
    crew: Optional[str] = None
    description: Optional[str] = None
    devil_fruit: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class Crew:
    captain: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    member: Optional[list] = None
    name: Optional[str] = None
    ship: Optional[str] = None


@dataclass
class CrewLoadMatch:
    id: int


@dataclass
class CrewListMatch:
    captain: Optional[str] = None
    description: Optional[str] = None
    id: Optional[int] = None
    member: Optional[list] = None
    name: Optional[str] = None
    ship: Optional[str] = None


@dataclass
class Dial:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class DialLoadMatch:
    id: int


@dataclass
class DialListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Episode:
    air_date: Optional[str] = None
    id: Optional[int] = None
    number: Optional[int] = None
    saga: Optional[str] = None
    title: Optional[str] = None


@dataclass
class EpisodeLoadMatch:
    id: int


@dataclass
class EpisodeListMatch:
    air_date: Optional[str] = None
    id: Optional[int] = None
    number: Optional[int] = None
    saga: Optional[str] = None
    title: Optional[str] = None


@dataclass
class Film:
    description: Optional[str] = None
    id: Optional[int] = None
    release_date: Optional[str] = None
    title: Optional[str] = None


@dataclass
class FilmLoadMatch:
    id: int


@dataclass
class FilmListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    release_date: Optional[str] = None
    title: Optional[str] = None


@dataclass
class Fruit:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None
    user: Optional[str] = None


@dataclass
class FruitLoadMatch:
    id: int


@dataclass
class FruitListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None
    user: Optional[str] = None


@dataclass
class Gear:
    description: Optional[str] = None
    first_appearance: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class GearLoadMatch:
    id: int


@dataclass
class GearListMatch:
    description: Optional[str] = None
    first_appearance: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class Haki:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    user: Optional[list] = None


@dataclass
class HakiLoadMatch:
    id: int


@dataclass
class HakiListMatch:
    description: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    user: Optional[list] = None


@dataclass
class Location:
    description: Optional[str] = None
    first_appearance: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class LocationLoadMatch:
    id: int


@dataclass
class LocationListMatch:
    description: Optional[str] = None
    first_appearance: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    type: Optional[str] = None


@dataclass
class Saga:
    chapter: Optional[list] = None
    description: Optional[str] = None
    episode: Optional[list] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class SagaLoadMatch:
    id: int


@dataclass
class SagaListMatch:
    chapter: Optional[list] = None
    description: Optional[str] = None
    episode: Optional[list] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class Sword:
    description: Optional[str] = None
    grade: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    owner: Optional[str] = None


@dataclass
class SwordLoadMatch:
    id: int


@dataclass
class SwordListMatch:
    description: Optional[str] = None
    grade: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None
    owner: Optional[str] = None


@dataclass
class Technique:
    description: Optional[str] = None
    gear: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class TechniqueLoadMatch:
    id: int


@dataclass
class TechniqueListMatch:
    description: Optional[str] = None
    gear: Optional[str] = None
    id: Optional[int] = None
    name: Optional[str] = None


@dataclass
class Volume:
    chapter: Optional[list] = None
    id: Optional[int] = None
    number: Optional[int] = None
    release_date: Optional[str] = None
    title: Optional[str] = None


@dataclass
class VolumeLoadMatch:
    id: int


@dataclass
class VolumeListMatch:
    chapter: Optional[list] = None
    id: Optional[int] = None
    number: Optional[int] = None
    release_date: Optional[str] = None
    title: Optional[str] = None

