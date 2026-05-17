package voxgigonepiecesdk

import (
	"github.com/voxgig-sdk/one-piece-sdk/go/core"
	"github.com/voxgig-sdk/one-piece-sdk/go/entity"
	"github.com/voxgig-sdk/one-piece-sdk/go/feature"
	_ "github.com/voxgig-sdk/one-piece-sdk/go/utility"
)

// Type aliases preserve external API.
type OnePieceSDK = core.OnePieceSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type OnePieceEntity = core.OnePieceEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type OnePieceError = core.OnePieceError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewBoatEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewBoatEntity(client, entopts)
	}
	core.NewBowEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewBowEntity(client, entopts)
	}
	core.NewChapterEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewChapterEntity(client, entopts)
	}
	core.NewCharacterEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewCharacterEntity(client, entopts)
	}
	core.NewCrewEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewCrewEntity(client, entopts)
	}
	core.NewDialEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewDialEntity(client, entopts)
	}
	core.NewEpisodeEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewEpisodeEntity(client, entopts)
	}
	core.NewFilmEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewFilmEntity(client, entopts)
	}
	core.NewFruitEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewFruitEntity(client, entopts)
	}
	core.NewGearEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewGearEntity(client, entopts)
	}
	core.NewHakiEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewHakiEntity(client, entopts)
	}
	core.NewLocationEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewLocationEntity(client, entopts)
	}
	core.NewSagaEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewSagaEntity(client, entopts)
	}
	core.NewSwordEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewSwordEntity(client, entopts)
	}
	core.NewTechniqueEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewTechniqueEntity(client, entopts)
	}
	core.NewVolumeEntityFunc = func(client *core.OnePieceSDK, entopts map[string]any) core.OnePieceEntity {
		return entity.NewVolumeEntity(client, entopts)
	}
}

// Constructor re-exports.
var NewOnePieceSDK = core.NewOnePieceSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
