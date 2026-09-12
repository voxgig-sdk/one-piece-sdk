import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Crew, CrewLoadMatch, CrewListMatch } from '../OnePieceTypes';
declare class CrewEntity extends OnePieceEntityBase<Crew> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: CrewEntity): CrewEntity;
    load(this: any, reqmatch?: CrewLoadMatch, ctrl?: Control): Promise<CrewEntity>;
    list(this: any, reqmatch?: CrewListMatch, ctrl?: Control): Promise<CrewEntity[]>;
}
export { CrewEntity };
