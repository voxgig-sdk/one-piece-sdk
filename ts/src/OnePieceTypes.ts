// Typed models for the OnePiece SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Boat {
  crew?: string
  description?: string
  id?: number
  name?: string
  type?: string
}

export interface BoatLoadMatch {
  id: number
}

export interface BoatListMatch {
  crew?: string
  description?: string
  id?: number
  name?: string
  type?: string
}

export interface Bow {
  description?: string
  id?: number
  name?: string
  owner?: string
}

export interface BowLoadMatch {
  id: number
}

export interface BowListMatch {
  description?: string
  id?: number
  name?: string
  owner?: string
}

export interface Chapter {
  id?: number
  number?: number
  release_date?: string
  saga?: string
  title?: string
}

export interface ChapterLoadMatch {
  id: number
}

export interface ChapterListMatch {
  id?: number
  number?: number
  release_date?: string
  saga?: string
  title?: string
}

export interface Character {
  age?: number
  bounty?: number
  crew?: string
  description?: string
  devil_fruit?: string
  id?: number
  name?: string
}

export interface CharacterLoadMatch {
  id: number
}

export interface CharacterListMatch {
  age?: number
  bounty?: number
  crew?: string
  description?: string
  devil_fruit?: string
  id?: number
  name?: string
}

export interface Crew {
  captain?: string
  description?: string
  id?: number
  member?: any[]
  name?: string
  ship?: string
}

export interface CrewLoadMatch {
  id: number
}

export interface CrewListMatch {
  captain?: string
  description?: string
  id?: number
  member?: any[]
  name?: string
  ship?: string
}

export interface Dial {
  description?: string
  id?: number
  name?: string
  type?: string
}

export interface DialLoadMatch {
  id: number
}

export interface DialListMatch {
  description?: string
  id?: number
  name?: string
  type?: string
}

export interface Episode {
  air_date?: string
  id?: number
  number?: number
  saga?: string
  title?: string
}

export interface EpisodeLoadMatch {
  id: number
}

export interface EpisodeListMatch {
  air_date?: string
  id?: number
  number?: number
  saga?: string
  title?: string
}

export interface Film {
  description?: string
  id?: number
  release_date?: string
  title?: string
}

export interface FilmLoadMatch {
  id: number
}

export interface FilmListMatch {
  description?: string
  id?: number
  release_date?: string
  title?: string
}

export interface Fruit {
  description?: string
  id?: number
  name?: string
  type?: string
  user?: string
}

export interface FruitLoadMatch {
  id: number
}

export interface FruitListMatch {
  description?: string
  id?: number
  name?: string
  type?: string
  user?: string
}

export interface Gear {
  description?: string
  first_appearance?: string
  id?: number
  name?: string
}

export interface GearLoadMatch {
  id: number
}

export interface GearListMatch {
  description?: string
  first_appearance?: string
  id?: number
  name?: string
}

export interface Haki {
  description?: string
  id?: number
  name?: string
  user?: any[]
}

export interface HakiLoadMatch {
  id: number
}

export interface HakiListMatch {
  description?: string
  id?: number
  name?: string
  user?: any[]
}

export interface Location {
  description?: string
  first_appearance?: string
  id?: number
  name?: string
  type?: string
}

export interface LocationLoadMatch {
  id: number
}

export interface LocationListMatch {
  description?: string
  first_appearance?: string
  id?: number
  name?: string
  type?: string
}

export interface Saga {
  chapter?: any[]
  description?: string
  episode?: any[]
  id?: number
  name?: string
}

export interface SagaLoadMatch {
  id: number
}

export interface SagaListMatch {
  chapter?: any[]
  description?: string
  episode?: any[]
  id?: number
  name?: string
}

export interface Sword {
  description?: string
  grade?: string
  id?: number
  name?: string
  owner?: string
}

export interface SwordLoadMatch {
  id: number
}

export interface SwordListMatch {
  description?: string
  grade?: string
  id?: number
  name?: string
  owner?: string
}

export interface Technique {
  description?: string
  gear?: string
  id?: number
  name?: string
}

export interface TechniqueLoadMatch {
  id: number
}

export interface TechniqueListMatch {
  description?: string
  gear?: string
  id?: number
  name?: string
}

export interface Volume {
  chapter?: any[]
  id?: number
  number?: number
  release_date?: string
  title?: string
}

export interface VolumeLoadMatch {
  id: number
}

export interface VolumeListMatch {
  chapter?: any[]
  id?: number
  number?: number
  release_date?: string
  title?: string
}

