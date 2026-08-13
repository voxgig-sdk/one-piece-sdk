// Typed models for the OnePiece SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/one-piece-sdk/go/core"
)

// Boat is the typed data model for the boat entity.
type Boat struct {
	Crew *string `json:"crew,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// BoatLoadMatch is the typed request payload for Boat.LoadTyped.
type BoatLoadMatch struct {
	Id int `json:"id"`
}

// BoatListMatch is the typed request payload for Boat.ListTyped.
type BoatListMatch struct {
	Crew *string `json:"crew,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Bow is the typed data model for the bow entity.
type Bow struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
}

// BowLoadMatch is the typed request payload for Bow.LoadTyped.
type BowLoadMatch struct {
	Id int `json:"id"`
}

// BowListMatch is the typed request payload for Bow.ListTyped.
type BowListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
}

// Chapter is the typed data model for the chapter entity.
type Chapter struct {
	Id *int `json:"id,omitempty"`
	Number *int `json:"number,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Saga *string `json:"saga,omitempty"`
	Title *string `json:"title,omitempty"`
}

// ChapterLoadMatch is the typed request payload for Chapter.LoadTyped.
type ChapterLoadMatch struct {
	Id int `json:"id"`
}

// ChapterListMatch is the typed request payload for Chapter.ListTyped.
type ChapterListMatch struct {
	Id *int `json:"id,omitempty"`
	Number *int `json:"number,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Saga *string `json:"saga,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Character is the typed data model for the character entity.
type Character struct {
	Age *int `json:"age,omitempty"`
	Bounty *int `json:"bounty,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Description *string `json:"description,omitempty"`
	DevilFruit *string `json:"devilFruit,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// CharacterLoadMatch is the typed request payload for Character.LoadTyped.
type CharacterLoadMatch struct {
	Id int `json:"id"`
}

// CharacterListMatch is the typed request payload for Character.ListTyped.
type CharacterListMatch struct {
	Age *int `json:"age,omitempty"`
	Bounty *int `json:"bounty,omitempty"`
	Crew *string `json:"crew,omitempty"`
	Description *string `json:"description,omitempty"`
	DevilFruit *string `json:"devilFruit,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Crew is the typed data model for the crew entity.
type Crew struct {
	Captain *string `json:"captain,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Members *[]any `json:"members,omitempty"`
	Name *string `json:"name,omitempty"`
	Ship *string `json:"ship,omitempty"`
}

// CrewLoadMatch is the typed request payload for Crew.LoadTyped.
type CrewLoadMatch struct {
	Id int `json:"id"`
}

// CrewListMatch is the typed request payload for Crew.ListTyped.
type CrewListMatch struct {
	Captain *string `json:"captain,omitempty"`
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Members *[]any `json:"members,omitempty"`
	Name *string `json:"name,omitempty"`
	Ship *string `json:"ship,omitempty"`
}

// Dial is the typed data model for the dial entity.
type Dial struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// DialLoadMatch is the typed request payload for Dial.LoadTyped.
type DialLoadMatch struct {
	Id int `json:"id"`
}

// DialListMatch is the typed request payload for Dial.ListTyped.
type DialListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Episode is the typed data model for the episode entity.
type Episode struct {
	AirDate *string `json:"airDate,omitempty"`
	Id *int `json:"id,omitempty"`
	Number *int `json:"number,omitempty"`
	Saga *string `json:"saga,omitempty"`
	Title *string `json:"title,omitempty"`
}

// EpisodeLoadMatch is the typed request payload for Episode.LoadTyped.
type EpisodeLoadMatch struct {
	Id int `json:"id"`
}

// EpisodeListMatch is the typed request payload for Episode.ListTyped.
type EpisodeListMatch struct {
	AirDate *string `json:"airDate,omitempty"`
	Id *int `json:"id,omitempty"`
	Number *int `json:"number,omitempty"`
	Saga *string `json:"saga,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Film is the typed data model for the film entity.
type Film struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Title *string `json:"title,omitempty"`
}

// FilmLoadMatch is the typed request payload for Film.LoadTyped.
type FilmLoadMatch struct {
	Id int `json:"id"`
}

// FilmListMatch is the typed request payload for Film.ListTyped.
type FilmListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Title *string `json:"title,omitempty"`
}

// Fruit is the typed data model for the fruit entity.
type Fruit struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	User *string `json:"user,omitempty"`
}

// FruitLoadMatch is the typed request payload for Fruit.LoadTyped.
type FruitLoadMatch struct {
	Id int `json:"id"`
}

// FruitListMatch is the typed request payload for Fruit.ListTyped.
type FruitListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
	User *string `json:"user,omitempty"`
}

// Gear is the typed data model for the gear entity.
type Gear struct {
	Description *string `json:"description,omitempty"`
	FirstAppearance *string `json:"firstAppearance,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// GearLoadMatch is the typed request payload for Gear.LoadTyped.
type GearLoadMatch struct {
	Id int `json:"id"`
}

// GearListMatch is the typed request payload for Gear.ListTyped.
type GearListMatch struct {
	Description *string `json:"description,omitempty"`
	FirstAppearance *string `json:"firstAppearance,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Haki is the typed data model for the haki entity.
type Haki struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Users *[]any `json:"users,omitempty"`
}

// HakiLoadMatch is the typed request payload for Haki.LoadTyped.
type HakiLoadMatch struct {
	Id int `json:"id"`
}

// HakiListMatch is the typed request payload for Haki.ListTyped.
type HakiListMatch struct {
	Description *string `json:"description,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Users *[]any `json:"users,omitempty"`
}

// Location is the typed data model for the location entity.
type Location struct {
	Description *string `json:"description,omitempty"`
	FirstAppearance *string `json:"firstAppearance,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// LocationLoadMatch is the typed request payload for Location.LoadTyped.
type LocationLoadMatch struct {
	Id int `json:"id"`
}

// LocationListMatch is the typed request payload for Location.ListTyped.
type LocationListMatch struct {
	Description *string `json:"description,omitempty"`
	FirstAppearance *string `json:"firstAppearance,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Type *string `json:"type,omitempty"`
}

// Saga is the typed data model for the saga entity.
type Saga struct {
	Chapters *[]any `json:"chapters,omitempty"`
	Description *string `json:"description,omitempty"`
	Episodes *[]any `json:"episodes,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// SagaLoadMatch is the typed request payload for Saga.LoadTyped.
type SagaLoadMatch struct {
	Id int `json:"id"`
}

// SagaListMatch is the typed request payload for Saga.ListTyped.
type SagaListMatch struct {
	Chapters *[]any `json:"chapters,omitempty"`
	Description *string `json:"description,omitempty"`
	Episodes *[]any `json:"episodes,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Sword is the typed data model for the sword entity.
type Sword struct {
	Description *string `json:"description,omitempty"`
	Grade *string `json:"grade,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
}

// SwordLoadMatch is the typed request payload for Sword.LoadTyped.
type SwordLoadMatch struct {
	Id int `json:"id"`
}

// SwordListMatch is the typed request payload for Sword.ListTyped.
type SwordListMatch struct {
	Description *string `json:"description,omitempty"`
	Grade *string `json:"grade,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	Owner *string `json:"owner,omitempty"`
}

// Technique is the typed data model for the technique entity.
type Technique struct {
	Description *string `json:"description,omitempty"`
	Gear *string `json:"gear,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// TechniqueLoadMatch is the typed request payload for Technique.LoadTyped.
type TechniqueLoadMatch struct {
	Id int `json:"id"`
}

// TechniqueListMatch is the typed request payload for Technique.ListTyped.
type TechniqueListMatch struct {
	Description *string `json:"description,omitempty"`
	Gear *string `json:"gear,omitempty"`
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
}

// Volume is the typed data model for the volume entity.
type Volume struct {
	Chapters *[]any `json:"chapters,omitempty"`
	Id *int `json:"id,omitempty"`
	Number *int `json:"number,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Title *string `json:"title,omitempty"`
}

// VolumeLoadMatch is the typed request payload for Volume.LoadTyped.
type VolumeLoadMatch struct {
	Id int `json:"id"`
}

// VolumeListMatch is the typed request payload for Volume.ListTyped.
type VolumeListMatch struct {
	Chapters *[]any `json:"chapters,omitempty"`
	Id *int `json:"id,omitempty"`
	Number *int `json:"number,omitempty"`
	ReleaseDate *string `json:"releaseDate,omitempty"`
	Title *string `json:"title,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
