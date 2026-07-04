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

export type BoatListMatch = Partial<Boat>

export interface Bow {
  description?: string
  id?: number
  name?: string
  owner?: string
}

export interface BowLoadMatch {
  id: number
}

export type BowListMatch = Partial<Bow>

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

export type ChapterListMatch = Partial<Chapter>

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

export type CharacterListMatch = Partial<Character>

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

export type CrewListMatch = Partial<Crew>

export interface Dial {
  description?: string
  id?: number
  name?: string
  type?: string
}

export interface DialLoadMatch {
  id: number
}

export type DialListMatch = Partial<Dial>

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

export type EpisodeListMatch = Partial<Episode>

export interface Film {
  description?: string
  id?: number
  release_date?: string
  title?: string
}

export interface FilmLoadMatch {
  id: number
}

export type FilmListMatch = Partial<Film>

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

export type FruitListMatch = Partial<Fruit>

export interface Gear {
  description?: string
  first_appearance?: string
  id?: number
  name?: string
}

export interface GearLoadMatch {
  id: number
}

export type GearListMatch = Partial<Gear>

export interface Haki {
  description?: string
  id?: number
  name?: string
  user?: any[]
}

export interface HakiLoadMatch {
  id: number
}

export type HakiListMatch = Partial<Haki>

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

export type LocationListMatch = Partial<Location>

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

export type SagaListMatch = Partial<Saga>

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

export type SwordListMatch = Partial<Sword>

export interface Technique {
  description?: string
  gear?: string
  id?: number
  name?: string
}

export interface TechniqueLoadMatch {
  id: number
}

export type TechniqueListMatch = Partial<Technique>

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

export type VolumeListMatch = Partial<Volume>

