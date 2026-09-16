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
(0, node_test_1.describe)('ChapterEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when ONE_PIECE_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('ONE_PIECE_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OnePieceSDK.test();
        const ent = testsdk.Chapter();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.ONE_PIECE_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'chapter.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "short": "Unique identifier for the chapter", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "number", "req": false, "short": "Chapter number", "type": "`$INTEGER`", "index$": 1 }, { "active": true, "format": "date", "name": "releaseDate", "req": false, "short": "Release date of the chapter", "type": "`$STRING`", "index$": 2 }, { "active": true, "name": "saga", "req": false, "short": "Saga this chapter belongs to", "type": "`$STRING`", "index$": 3 }, { "active": true, "name": "title", "req": false, "short": "Title of the chapter", "type": "`$STRING`", "index$": 4 }], "id": { "field": "id", "name": "id" }, "name": "chapter", "op": { "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": {}, "contract": { "id": "GET /chapters", "json": "{\"operationId\":\"getChapters\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the chapter\",\"type\":\"integer\"},\"number\":{\"description\":\"Chapter number\",\"type\":\"integer\"},\"releaseDate\":{\"description\":\"Release date of the chapter\",\"format\":\"date\",\"type\":\"string\"},\"saga\":{\"description\":\"Saga this chapter belongs to\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the chapter\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/chapters", "segments": [{ "lit": "chapters" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "id", "orig": "id", "reqd": true, "type": "`$INTEGER`", "index$": 0 }] }, "contract": { "id": "GET /chapters/{id}", "json": "{\"operationId\":\"getChapterById\",\"parameters\":[{\"description\":\"The ID of the chapter\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"id\":{\"description\":\"Unique identifier for the chapter\",\"type\":\"integer\"},\"number\":{\"description\":\"Chapter number\",\"type\":\"integer\"},\"releaseDate\":{\"description\":\"Release date of the chapter\",\"format\":\"date\",\"type\":\"string\"},\"saga\":{\"description\":\"Saga this chapter belongs to\",\"type\":\"string\"},\"title\":{\"description\":\"Title of the chapter\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"},\"404\":{\"description\":\"Chapter not found\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/chapters/{id}", "segments": [{ "lit": "chapters" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "chapter", "name__orig": "chapter", "Name": "Chapter", "name_": "chapter", "name-": "chapter", "NAME": "CHAPTER", "index$": 2 }, { "active": true, "entity": "chapter", "key$": "BasicChapterFlow", "kind": "basic", "name": "BasicChapterFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": {}, "match": {}, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "chapter_ref01" } }], "index$": 0 }, { "active": true, "data": {}, "input": { "ref": "chapter_ref01", "srcdatavar": "chapter_ref01_data", "suffix": "_dt0" }, "match": { "id": "chapter01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-chapter_ref01" } }], "index$": 1 }] }, 'Chapter');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let chapter_ref01_data = Object.values(setup.data.existing.chapter)[0];
        // LIST
        const chapter_ref01_ent = client.Chapter();
        const chapter_ref01_match = {};
        const chapter_ref01_list = (await chapter_ref01_ent.list(chapter_ref01_match)).map((e) => e.data());
        // LOAD
        const chapter_ref01_match_dt0 = {};
        chapter_ref01_match_dt0.id = chapter_ref01_data.id;
        const chapter_ref01_data_dt0 = (await chapter_ref01_ent.load(chapter_ref01_match_dt0)).data();
        (0, node_assert_1.default)(chapter_ref01_data_dt0.id === chapter_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/chapter/ChapterTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OnePieceSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['chapter01', 'chapter02', 'chapter03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'ONE_PIECE_TEST_CHAPTER_ENTID': idmap,
        'ONE_PIECE_TEST_LIVE': 'FALSE',
        'ONE_PIECE_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['ONE_PIECE_TEST_CHAPTER_ENTID'];
    const live = 'TRUE' === env.ONE_PIECE_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['ONE_PIECE_TEST_CHAPTER_ENTID'];
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
//# sourceMappingURL=ChapterEntity.test.js.map