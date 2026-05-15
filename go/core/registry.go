package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewBoatEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewBowEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewChapterEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewCharacterEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewCrewEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewDialEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewEpisodeEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewFilmEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewFruitEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewGearEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewHakiEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewLocationEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewSagaEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewSwordEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewTechniqueEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

var NewVolumeEntityFunc func(client *OnePieceSDK, entopts map[string]any) OnePieceEntity

