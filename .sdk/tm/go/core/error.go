package core

type OnePieceError struct {
	IsOnePieceError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewOnePieceError(code string, msg string, ctx *Context) *OnePieceError {
	return &OnePieceError{
		IsOnePieceError: true,
		Sdk:              "OnePiece",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *OnePieceError) Error() string {
	return e.Msg
}
