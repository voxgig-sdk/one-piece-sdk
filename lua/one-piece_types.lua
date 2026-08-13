-- Typed models for the OnePiece SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Boat
---@field crew? string
---@field description? string
---@field id? number
---@field name? string
---@field type? string

---@class BoatLoadMatch
---@field id number

---@class BoatListMatch
---@field crew? string
---@field description? string
---@field id? number
---@field name? string
---@field type? string

---@class Bow
---@field description? string
---@field id? number
---@field name? string
---@field owner? string

---@class BowLoadMatch
---@field id number

---@class BowListMatch
---@field description? string
---@field id? number
---@field name? string
---@field owner? string

---@class Chapter
---@field id? number
---@field number? number
---@field releaseDate? string
---@field saga? string
---@field title? string

---@class ChapterLoadMatch
---@field id number

---@class ChapterListMatch
---@field id? number
---@field number? number
---@field releaseDate? string
---@field saga? string
---@field title? string

---@class Character
---@field age? number
---@field bounty? number
---@field crew? string
---@field description? string
---@field devilFruit? string
---@field id? number
---@field name? string

---@class CharacterLoadMatch
---@field id number

---@class CharacterListMatch
---@field age? number
---@field bounty? number
---@field crew? string
---@field description? string
---@field devilFruit? string
---@field id? number
---@field name? string

---@class Crew
---@field captain? string
---@field description? string
---@field id? number
---@field members? table
---@field name? string
---@field ship? string

---@class CrewLoadMatch
---@field id number

---@class CrewListMatch
---@field captain? string
---@field description? string
---@field id? number
---@field members? table
---@field name? string
---@field ship? string

---@class Dial
---@field description? string
---@field id? number
---@field name? string
---@field type? string

---@class DialLoadMatch
---@field id number

---@class DialListMatch
---@field description? string
---@field id? number
---@field name? string
---@field type? string

---@class Episode
---@field airDate? string
---@field id? number
---@field number? number
---@field saga? string
---@field title? string

---@class EpisodeLoadMatch
---@field id number

---@class EpisodeListMatch
---@field airDate? string
---@field id? number
---@field number? number
---@field saga? string
---@field title? string

---@class Film
---@field description? string
---@field id? number
---@field releaseDate? string
---@field title? string

---@class FilmLoadMatch
---@field id number

---@class FilmListMatch
---@field description? string
---@field id? number
---@field releaseDate? string
---@field title? string

---@class Fruit
---@field description? string
---@field id? number
---@field name? string
---@field type? string
---@field user? string

---@class FruitLoadMatch
---@field id number

---@class FruitListMatch
---@field description? string
---@field id? number
---@field name? string
---@field type? string
---@field user? string

---@class Gear
---@field description? string
---@field firstAppearance? string
---@field id? number
---@field name? string

---@class GearLoadMatch
---@field id number

---@class GearListMatch
---@field description? string
---@field firstAppearance? string
---@field id? number
---@field name? string

---@class Haki
---@field description? string
---@field id? number
---@field name? string
---@field users? table

---@class HakiLoadMatch
---@field id number

---@class HakiListMatch
---@field description? string
---@field id? number
---@field name? string
---@field users? table

---@class Location
---@field description? string
---@field firstAppearance? string
---@field id? number
---@field name? string
---@field type? string

---@class LocationLoadMatch
---@field id number

---@class LocationListMatch
---@field description? string
---@field firstAppearance? string
---@field id? number
---@field name? string
---@field type? string

---@class Saga
---@field chapters? table
---@field description? string
---@field episodes? table
---@field id? number
---@field name? string

---@class SagaLoadMatch
---@field id number

---@class SagaListMatch
---@field chapters? table
---@field description? string
---@field episodes? table
---@field id? number
---@field name? string

---@class Sword
---@field description? string
---@field grade? string
---@field id? number
---@field name? string
---@field owner? string

---@class SwordLoadMatch
---@field id number

---@class SwordListMatch
---@field description? string
---@field grade? string
---@field id? number
---@field name? string
---@field owner? string

---@class Technique
---@field description? string
---@field gear? string
---@field id? number
---@field name? string

---@class TechniqueLoadMatch
---@field id number

---@class TechniqueListMatch
---@field description? string
---@field gear? string
---@field id? number
---@field name? string

---@class Volume
---@field chapters? table
---@field id? number
---@field number? number
---@field releaseDate? string
---@field title? string

---@class VolumeLoadMatch
---@field id number

---@class VolumeListMatch
---@field chapters? table
---@field id? number
---@field number? number
---@field releaseDate? string
---@field title? string

local M = {}

return M
