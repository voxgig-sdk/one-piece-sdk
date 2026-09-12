import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Sword, SwordLoadMatch, SwordListMatch } from '../OnePieceTypes';
declare class SwordEntity extends OnePieceEntityBase<Sword> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: SwordEntity): SwordEntity;
    load(this: any, reqmatch?: SwordLoadMatch, ctrl?: Control): Promise<SwordEntity>;
    list(this: any, reqmatch?: SwordListMatch, ctrl?: Control): Promise<SwordEntity[]>;
}
export { SwordEntity };
