import { Context } from './Context';
declare class OnePieceError extends Error {
    isOnePieceError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { OnePieceError };
