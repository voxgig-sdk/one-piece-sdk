import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Chapter, ChapterLoadMatch, ChapterListMatch } from '../OnePieceTypes';
declare class ChapterEntity extends OnePieceEntityBase<Chapter> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: ChapterEntity): ChapterEntity;
    load(this: any, reqmatch?: ChapterLoadMatch, ctrl?: Control): Promise<ChapterEntity>;
    list(this: any, reqmatch?: ChapterListMatch, ctrl?: Control): Promise<ChapterEntity[]>;
}
export { ChapterEntity };
