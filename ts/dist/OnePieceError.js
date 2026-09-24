"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnePieceError = void 0;
class OnePieceError extends Error {
    isOnePieceError = true;
    sdk = 'OnePiece';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.OnePieceError = OnePieceError;
//# sourceMappingURL=OnePieceError.js.map