# OnePiece SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

OnePieceUtility.registrar = ->(u) {
  u.clean = OnePieceUtilities::Clean
  u.done = OnePieceUtilities::Done
  u.make_error = OnePieceUtilities::MakeError
  u.feature_add = OnePieceUtilities::FeatureAdd
  u.feature_hook = OnePieceUtilities::FeatureHook
  u.feature_init = OnePieceUtilities::FeatureInit
  u.fetcher = OnePieceUtilities::Fetcher
  u.make_fetch_def = OnePieceUtilities::MakeFetchDef
  u.make_context = OnePieceUtilities::MakeContext
  u.make_options = OnePieceUtilities::MakeOptions
  u.make_request = OnePieceUtilities::MakeRequest
  u.make_response = OnePieceUtilities::MakeResponse
  u.make_result = OnePieceUtilities::MakeResult
  u.make_point = OnePieceUtilities::MakePoint
  u.make_spec = OnePieceUtilities::MakeSpec
  u.make_url = OnePieceUtilities::MakeUrl
  u.param = OnePieceUtilities::Param
  u.prepare_auth = OnePieceUtilities::PrepareAuth
  u.prepare_body = OnePieceUtilities::PrepareBody
  u.prepare_headers = OnePieceUtilities::PrepareHeaders
  u.prepare_method = OnePieceUtilities::PrepareMethod
  u.prepare_params = OnePieceUtilities::PrepareParams
  u.prepare_path = OnePieceUtilities::PreparePath
  u.prepare_query = OnePieceUtilities::PrepareQuery
  u.result_basic = OnePieceUtilities::ResultBasic
  u.result_body = OnePieceUtilities::ResultBody
  u.result_headers = OnePieceUtilities::ResultHeaders
  u.transform_request = OnePieceUtilities::TransformRequest
  u.transform_response = OnePieceUtilities::TransformResponse
}
