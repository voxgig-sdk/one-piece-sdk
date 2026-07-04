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

# Match filter for Boat#list (any subset of Boat fields).
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

# Match filter for Bow#list (any subset of Bow fields).
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
# @!attribute [rw] release_date
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
  :release_date,
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

# Match filter for Chapter#list (any subset of Chapter fields).
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] release_date
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
  :release_date,
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
# @!attribute [rw] devil_fruit
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
  :devil_fruit,
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

# Match filter for Character#list (any subset of Character fields).
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
# @!attribute [rw] devil_fruit
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
  :devil_fruit,
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
# @!attribute [rw] member
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
  :member,
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

# Match filter for Crew#list (any subset of Crew fields).
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
# @!attribute [rw] member
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
  :member,
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

# Match filter for Dial#list (any subset of Dial fields).
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
# @!attribute [rw] air_date
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
  :air_date,
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

# Match filter for Episode#list (any subset of Episode fields).
#
# @!attribute [rw] air_date
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
  :air_date,
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
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Film = Struct.new(
  :description,
  :id,
  :release_date,
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

# Match filter for Film#list (any subset of Film fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
FilmListMatch = Struct.new(
  :description,
  :id,
  :release_date,
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

# Match filter for Fruit#list (any subset of Fruit fields).
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
# @!attribute [rw] first_appearance
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Gear = Struct.new(
  :description,
  :first_appearance,
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

# Match filter for Gear#list (any subset of Gear fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] first_appearance
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
GearListMatch = Struct.new(
  :description,
  :first_appearance,
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
# @!attribute [rw] user
#   @return [Array, nil]
Haki = Struct.new(
  :description,
  :id,
  :name,
  :user,
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

# Match filter for Haki#list (any subset of Haki fields).
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
# @!attribute [rw] user
#   @return [Array, nil]
HakiListMatch = Struct.new(
  :description,
  :id,
  :name,
  :user,
  keyword_init: true
)

# Location entity data model.
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] first_appearance
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
  :first_appearance,
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

# Match filter for Location#list (any subset of Location fields).
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] first_appearance
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
  :first_appearance,
  :id,
  :name,
  :type,
  keyword_init: true
)

# Saga entity data model.
#
# @!attribute [rw] chapter
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] episode
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
Saga = Struct.new(
  :chapter,
  :description,
  :episode,
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

# Match filter for Saga#list (any subset of Saga fields).
#
# @!attribute [rw] chapter
#   @return [Array, nil]
#
# @!attribute [rw] description
#   @return [String, nil]
#
# @!attribute [rw] episode
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
SagaListMatch = Struct.new(
  :chapter,
  :description,
  :episode,
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

# Match filter for Sword#list (any subset of Sword fields).
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

# Match filter for Technique#list (any subset of Technique fields).
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
# @!attribute [rw] chapter
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
Volume = Struct.new(
  :chapter,
  :id,
  :number,
  :release_date,
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

# Match filter for Volume#list (any subset of Volume fields).
#
# @!attribute [rw] chapter
#   @return [Array, nil]
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] number
#   @return [Integer, nil]
#
# @!attribute [rw] release_date
#   @return [String, nil]
#
# @!attribute [rw] title
#   @return [String, nil]
VolumeListMatch = Struct.new(
  :chapter,
  :id,
  :number,
  :release_date,
  :title,
  keyword_init: true
)

