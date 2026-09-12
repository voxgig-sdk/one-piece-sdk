import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Technique, TechniqueLoadMatch, TechniqueListMatch } from '../OnePieceTypes';
declare class TechniqueEntity extends OnePieceEntityBase<Technique> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: TechniqueEntity): TechniqueEntity;
    load(this: any, reqmatch?: TechniqueLoadMatch, ctrl?: Control): Promise<TechniqueEntity>;
    list(this: any, reqmatch?: TechniqueListMatch, ctrl?: Control): Promise<TechniqueEntity[]>;
}
export { TechniqueEntity };
