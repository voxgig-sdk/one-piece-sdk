import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Saga, SagaLoadMatch, SagaListMatch } from '../OnePieceTypes';
declare class SagaEntity extends OnePieceEntityBase<Saga> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: SagaEntity): SagaEntity;
    load(this: any, reqmatch?: SagaLoadMatch, ctrl?: Control): Promise<SagaEntity>;
    list(this: any, reqmatch?: SagaListMatch, ctrl?: Control): Promise<SagaEntity[]>;
}
export { SagaEntity };
