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

---@class Bow
---@field description? string
---@field id? number
---@field name? string
---@field owner? string

---@class BowLoadMatch
---@field id number

---@class BowListMatch

---@class Chapter
---@field id? number
---@field number? number
---@field release_date? string
---@field saga? string
---@field title? string

---@class ChapterLoadMatch
---@field id number

---@class ChapterListMatch

---@class Character
---@field age? number
---@field bounty? number
---@field crew? string
---@field description? string
---@field devil_fruit? string
---@field id? number
---@field name? string

---@class CharacterLoadMatch
---@field id number

---@class CharacterListMatch

---@class Crew
---@field captain? string
---@field description? string
---@field id? number
---@field member? table
---@field name? string
---@field ship? string

---@class CrewLoadMatch
---@field id number

---@class CrewListMatch

---@class Dial
---@field description? string
---@field id? number
---@field name? string
---@field type? string

---@class DialLoadMatch
---@field id number

---@class DialListMatch

---@class Episode
---@field air_date? string
---@field id? number
---@field number? number
---@field saga? string
---@field title? string

---@class EpisodeLoadMatch
---@field id number

---@class EpisodeListMatch

---@class Film
---@field description? string
---@field id? number
---@field release_date? string
---@field title? string

---@class FilmLoadMatch
---@field id number

---@class FilmListMatch

---@class Fruit
---@field description? string
---@field id? number
---@field name? string
---@field type? string
---@field user? string

---@class FruitLoadMatch
---@field id number

---@class FruitListMatch

---@class Gear
---@field description? string
---@field first_appearance? string
---@field id? number
---@field name? string

---@class GearLoadMatch
---@field id number

---@class GearListMatch

---@class Haki
---@field description? string
---@field id? number
---@field name? string
---@field user? table

---@class HakiLoadMatch
---@field id number

---@class HakiListMatch

---@class Location
---@field description? string
---@field first_appearance? string
---@field id? number
---@field name? string
---@field type? string

---@class LocationLoadMatch
---@field id number

---@class LocationListMatch

---@class Saga
---@field chapter? table
---@field description? string
---@field episode? table
---@field id? number
---@field name? string

---@class SagaLoadMatch
---@field id number

---@class SagaListMatch

---@class Sword
---@field description? string
---@field grade? string
---@field id? number
---@field name? string
---@field owner? string

---@class SwordLoadMatch
---@field id number

---@class SwordListMatch

---@class Technique
---@field description? string
---@field gear? string
---@field id? number
---@field name? string

---@class TechniqueLoadMatch
---@field id number

---@class TechniqueListMatch

---@class Volume
---@field chapter? table
---@field id? number
---@field number? number
---@field release_date? string
---@field title? string

---@class VolumeLoadMatch
---@field id number

---@class VolumeListMatch

local M = {}

return M
