# frozen_string_literal: true

# Typed models for the OnePiece SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Boat entity data model.
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Boat = Struct.new(
  :crew,
  :description,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Request payload for Boat#load.
#
# @!attribute [rw] id
#   @return [Integer]
BoatLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Boat#list.
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
BoatListMatch = Struct.new(
  :crew,
  :description,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Bow entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
Bow = Struct.new(
  :description,
  :id,
  :name,
  :owner,
  keyword_init: true
)

# Request payload for Bow#load.
#
# @!attribute [rw] id
#   @return [Integer]
BowLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Bow#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
BowListMatch = Struct.new(
  :description,
  :id,
  :name,
  :owner,
  keyword_init: true
)

# Chapter entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] saga
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Chapter = Struct.new(
  :id,
  :number,
  :releaseDate,
  :saga,
  :title,
  keyword_init: true
)

# Request payload for Chapter#load.
#
# @!attribute [rw] id
#   @return [Integer]
ChapterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Chapter#list.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] saga
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
ChapterListMatch = Struct.new(
  :id,
  :number,
  :releaseDate,
  :saga,
  :title,
  keyword_init: true
)

# Character entity data model.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] bounty
#   @return [Integer, nil]
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] devilFruit
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Character = Struct.new(
  :age,
  :bounty,
  :crew,
  :description,
  :devilFruit,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Character#load.
#
# @!attribute [rw] id
#   @return [Integer]
CharacterLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Character#list.
#
# @!attribute [rw] age
#   @return [Integer, nil]
#
# @!attribute [rw] bounty
#   @return [Integer, nil]
#
# @!attribute [rw] crew
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] devilFruit
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
CharacterListMatch = Struct.new(
  :age,
  :bounty,
  :crew,
  :description,
  :devilFruit,
  :id,
  :name,
  keyword_init: true
)

# Crew entity data model.
#
# @!attribute [rw] captain
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] members
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] ship
#   @return [String, nil]
Crew = Struct.new(
  :captain,
  :description,
  :id,
  :members,
  :name,
  :ship,
  keyword_init: true
)

# Request payload for Crew#load.
#
# @!attribute [rw] id
#   @return [Integer]
CrewLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Crew#list.
#
# @!attribute [rw] captain
#   @return [String, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] members
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] ship
#   @return [String, nil]
CrewListMatch = Struct.new(
  :captain,
  :description,
  :id,
  :members,
  :name,
  :ship,
  keyword_init: true
)

# Dial entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Dial = Struct.new(
  :description,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Request payload for Dial#load.
#
# @!attribute [rw] id
#   @return [Integer]
DialLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Dial#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
DialListMatch = Struct.new(
  :description,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Episode entity data model.
#
# @!attribute [rw] airDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] saga
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Episode = Struct.new(
  :airDate,
  :id,
  :number,
  :saga,
  :title,
  keyword_init: true
)

# Request payload for Episode#load.
#
# @!attribute [rw] id
#   @return [Integer]
EpisodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Episode#list.
#
# @!attribute [rw] airDate
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] saga
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
EpisodeListMatch = Struct.new(
  :airDate,
  :id,
  :number,
  :saga,
  :title,
  keyword_init: true
)

# Film entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Film = Struct.new(
  :description,
  :id,
  :releaseDate,
  :title,
  keyword_init: true
)

# Request payload for Film#load.
#
# @!attribute [rw] id
#   @return [Integer]
FilmLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Film#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
FilmListMatch = Struct.new(
  :description,
  :id,
  :releaseDate,
  :title,
  keyword_init: true
)

# Fruit entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [String, nil]
Fruit = Struct.new(
  :description,
  :id,
  :name,
  :type,
  :user,
  keyword_init: true
)

# Request payload for Fruit#load.
#
# @!attribute [rw] id
#   @return [Integer]
FruitLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Fruit#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [String, nil]
FruitListMatch = Struct.new(
  :description,
  :id,
  :name,
  :type,
  :user,
  keyword_init: true
)

# Gear entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] firstAppearance
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Gear = Struct.new(
  :description,
  :firstAppearance,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Gear#load.
#
# @!attribute [rw] id
#   @return [Integer]
GearLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Gear#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] firstAppearance
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
GearListMatch = Struct.new(
  :description,
  :firstAppearance,
  :id,
  :name,
  keyword_init: true
)

# Haki entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] users
#   @return [Array, nil]
Haki = Struct.new(
  :description,
  :id,
  :name,
  :users,
  keyword_init: true
)

# Request payload for Haki#load.
#
# @!attribute [rw] id
#   @return [Integer]
HakiLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Haki#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] users
#   @return [Array, nil]
HakiListMatch = Struct.new(
  :description,
  :id,
  :name,
  :users,
  keyword_init: true
)

# Location entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] firstAppearance
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
Location = Struct.new(
  :description,
  :firstAppearance,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Request payload for Location#load.
#
# @!attribute [rw] id
#   @return [Integer]
LocationLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Location#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] firstAppearance
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] type
#   @return [String, nil]
LocationListMatch = Struct.new(
  :description,
  :firstAppearance,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Saga entity data model.
#
# @!attribute [rw] chapters
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] episodes
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Saga = Struct.new(
  :chapters,
  :description,
  :episodes,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Saga#load.
#
# @!attribute [rw] id
#   @return [Integer]
SagaLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Saga#list.
#
# @!attribute [rw] chapters
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] episodes
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
SagaListMatch = Struct.new(
  :chapters,
  :description,
  :episodes,
  :id,
  :name,
  keyword_init: true
)

# Sword entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] grade
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
Sword = Struct.new(
  :description,
  :grade,
  :id,
  :name,
  :owner,
  keyword_init: true
)

# Request payload for Sword#load.
#
# @!attribute [rw] id
#   @return [Integer]
SwordLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Sword#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] grade
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] owner
#   @return [String, nil]
SwordListMatch = Struct.new(
  :description,
  :grade,
  :id,
  :name,
  :owner,
  keyword_init: true
)

# Technique entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] gear
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Technique = Struct.new(
  :description,
  :gear,
  :id,
  :name,
  keyword_init: true
)

# Request payload for Technique#load.
#
# @!attribute [rw] id
#   @return [Integer]
TechniqueLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Technique#list.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] gear
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
TechniqueListMatch = Struct.new(
  :description,
  :gear,
  :id,
  :name,
  keyword_init: true
)

# Volume entity data model.
#
# @!attribute [rw] chapters
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Volume = Struct.new(
  :chapters,
  :id,
  :number,
  :releaseDate,
  :title,
  keyword_init: true
)

# Request payload for Volume#load.
#
# @!attribute [rw] id
#   @return [Integer]
VolumeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# Request payload for Volume#list.
#
# @!attribute [rw] chapters
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] releaseDate
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
VolumeListMatch = Struct.new(
  :chapters,
  :id,
  :number,
  :releaseDate,
  :title,
  keyword_init: true
)

