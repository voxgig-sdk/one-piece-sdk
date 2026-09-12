import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Bow, BowLoadMatch, BowListMatch } from '../OnePieceTypes';
declare class BowEntity extends OnePieceEntityBase<Bow> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: BowEntity): BowEntity;
    load(this: any, reqmatch?: BowLoadMatch, ctrl?: Control): Promise<BowEntity>;
    list(this: any, reqmatch?: BowListMatch, ctrl?: Control): Promise<BowEntity[]>;
}
export { BowEntity };
