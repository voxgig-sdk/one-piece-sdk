import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Volume, VolumeLoadMatch, VolumeListMatch } from '../OnePieceTypes';
declare class VolumeEntity extends OnePieceEntityBase<Volume> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: VolumeEntity): VolumeEntity;
    load(this: any, reqmatch?: VolumeLoadMatch, ctrl?: Control): Promise<VolumeEntity>;
    list(this: any, reqmatch?: VolumeListMatch, ctrl?: Control): Promise<VolumeEntity[]>;
}
export { VolumeEntity };
