package = "voxgig-sdk-one-piece"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/one-piece-sdk.git"
}
description = {
  summary = "OnePiece SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["one-piece_sdk"] = "one-piece_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
