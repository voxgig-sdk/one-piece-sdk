import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Episode, EpisodeLoadMatch, EpisodeListMatch } from '../OnePieceTypes';
declare class EpisodeEntity extends OnePieceEntityBase<Episode> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: EpisodeEntity): EpisodeEntity;
    load(this: any, reqmatch?: EpisodeLoadMatch, ctrl?: Control): Promise<EpisodeEntity>;
    list(this: any, reqmatch?: EpisodeListMatch, ctrl?: Control): Promise<EpisodeEntity[]>;
}
export { EpisodeEntity };
