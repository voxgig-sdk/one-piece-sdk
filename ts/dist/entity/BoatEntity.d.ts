import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Boat, BoatLoadMatch, BoatListMatch } from '../OnePieceTypes';
declare class BoatEntity extends OnePieceEntityBase<Boat> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: BoatEntity): BoatEntity;
    load(this: any, reqmatch?: BoatLoadMatch, ctrl?: Control): Promise<BoatEntity>;
    list(this: any, reqmatch?: BoatListMatch, ctrl?: Control): Promise<BoatEntity[]>;
}
export { BoatEntity };
