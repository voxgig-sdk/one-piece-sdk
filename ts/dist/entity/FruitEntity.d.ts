import { OnePieceEntityBase } from '../OnePieceEntityBase';
import type { OnePieceSDK } from '../OnePieceSDK';
import type { Control } from '../types';
import type { Fruit, FruitLoadMatch, FruitListMatch } from '../OnePieceTypes';
declare class FruitEntity extends OnePieceEntityBase<Fruit> {
    constructor(client: OnePieceSDK, entopts: any);
    make(this: FruitEntity): FruitEntity;
    load(this: any, reqmatch?: FruitLoadMatch, ctrl?: Control): Promise<FruitEntity>;
    list(this: any, reqmatch?: FruitListMatch, ctrl?: Control): Promise<FruitEntity[]>;
}
export { FruitEntity };
