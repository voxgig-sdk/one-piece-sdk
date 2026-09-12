import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Dial, DialLoadMatch, DialListMatch } from '../OnePieceTypes';
declare class DialEntity extends OnePieceEntityBase<Dial> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: DialEntity): DialEntity;
    load(this: any, reqmatch?: DialLoadMatch, ctrl?: Control): Promise<DialEntity>;
    list(this: any, reqmatch?: DialListMatch, ctrl?: Control): Promise<DialEntity[]>;
}
export { DialEntity };
