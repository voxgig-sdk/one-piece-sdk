import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Haki, HakiLoadMatch, HakiListMatch } from '../OnePieceTypes';
declare class HakiEntity extends OnePieceEntityBase<Haki> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: HakiEntity): HakiEntity;
    load(this: any, reqmatch?: HakiLoadMatch, ctrl?: Control): Promise<HakiEntity>;
    list(this: any, reqmatch?: HakiListMatch, ctrl?: Control): Promise<HakiEntity[]>;
}
export { HakiEntity };
