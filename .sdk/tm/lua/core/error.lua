-- OnePiece SDK error

local OnePieceError = {}
OnePieceError.__index = OnePieceError


function OnePieceError.new(code, msg, ctx)
  local self = setmetatable({}, OnePieceError)
  self.is_sdk_error = true
  self.sdk = "OnePiece"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OnePieceError:error()
  return self.msg
end


function OnePieceError:__tostring()
  return self.msg
end


return OnePieceError
