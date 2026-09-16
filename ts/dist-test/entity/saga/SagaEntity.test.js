"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('SagaEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ONE_PIECE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OnePieceSDK.test();
        const ent = testsdk.Saga();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'saga.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "chapters", "req": false, "short": "Chapter IDs included in this saga", "type": "`$ARRAY`", "index$": 0 }, { "active": true, "name": "description", "req": false, "short": "Description of the saga", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "episodes", "req": false, "short": "Episode IDs included in this saga", "type": "`$ARRAY`", "index$": 2 }, { "active": true, "name": "id", "req": false, "short": "Unique identifier for the saga", "type": "`$INTEGER`", "index$": 3 }, { "active": true, "name": "name", "req": false, "short": "Name of the saga", "type": "`$STRING`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "saga", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /sagas", "json": "{\"operationId\":\"getSagas\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"chapters\":{\"description\":\"Chapter IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"description\":{\"description\":\"Description of the saga\",\"type\":\"string\"},\"episodes\":{\"description\":\"Episode IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique identifier for the saga\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the saga\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sagas", "segments": [{ "lit": "sagas" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /sagas/{id}", "json": "{\"operationId\":\"getSagaById\",\"parameters\":[{\"description\":\"The ID of the saga\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"chapters\":{\"description\":\"Chapter IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"description\":{\"description\":\"Description of the saga\",\"type\":\"string\"},\"episodes\":{\"description\":\"Episode IDs included in this saga\",\"items\":{\"type\":\"integer\"},\"type\":\"array\"},\"id\":{\"description\":\"Unique identifier for the saga\",\"type\":\"integer\"},\"name\":{\"description\":\"Name of the saga\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Saga not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/sagas/{id}", "segments": [{ "lit": "sagas" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "saga", "name__orig": "saga", "Name": "Saga", "name_": "saga", "name-": "saga", "NAME": "SAGA", "index$": 12 }, { "active": true, "entity": "saga", "key$": "BasicSagaFlow", "kind": "basic", "name": "BasicSagaFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "saga_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "saga_ref01", "srcdatavar": "saga_ref01_data", "suffix": "_dt0" }, "match": { "id": "saga01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-saga_ref01" } }], "index$": 1 }] }, 'Saga');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let saga_ref01_data = Object.values(setup.data.existing.saga)[0];
        // LIST
        const saga_ref01_ent = client.Saga();
        const saga_ref01_match = {};
        const saga_ref01_list = (await saga_ref01_ent.list(saga_ref01_match)).map((e) => e.data());
        // LOAD
        const saga_ref01_match_dt0 = {};
        saga_ref01_match_dt0.id = saga_ref01_data.id;
        const saga_ref01_data_dt0 = (await saga_ref01_ent.load(saga_ref01_match_dt0)).data();
        (0, node_assert_1.default)(saga_ref01_data_dt0.id === saga_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/saga/SagaTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OnePieceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['saga01', 'saga02', 'saga03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ONE_PIECE_TEST_SAGA_ENTID': idmap,
        'ONE_PIECE_TEST_LIVE': 'FALSE',
        'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ONE_PIECE_TEST_SAGA_ENTID'];
    const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ONE_PIECE_TEST_SAGA_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OnePieceSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.ONE_PIECE_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=SagaEntity.test.js.map