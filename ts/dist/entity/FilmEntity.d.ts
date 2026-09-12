import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Film, FilmLoadMatch, FilmListMatch } from '../OnePieceTypes';
declare class FilmEntity extends OnePieceEntityBase<Film> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: FilmEntity): FilmEntity;
    load(this: any, reqmatch?: FilmLoadMatch, ctrl?: Control): Promise<FilmEntity>;
    list(this: any, reqmatch?: FilmListMatch, ctrl?: Control): Promise<FilmEntity[]>;
}
export { FilmEntity };
