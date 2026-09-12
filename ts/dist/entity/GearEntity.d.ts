import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Gear, GearLoadMatch, GearListMatch } from '../OnePieceTypes';
declare class GearEntity extends OnePieceEntityBase<Gear> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: GearEntity): GearEntity;
    load(this: any, reqmatch?: GearLoadMatch, ctrl?: Control): Promise<GearEntity>;
    list(this: any, reqmatch?: GearListMatch, ctrl?: Control): Promise<GearEntity[]>;
}
export { GearEntity };
