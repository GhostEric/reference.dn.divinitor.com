import { GeneralHttpClient } from "@/globals";

import RequestCache from "@/models/util/RequestCache";
import ITypedMap from "@/models/util/ITypedMap";

import Store from "@/store";
import { ApiHttpClient } from "@/globals";
import ICharmItemKeyApiResponse from '@/models/items/raw/ICharmItemKeyApiResponse';
import UiStringProvider, { IBulkResponse } from './UiStringProvider';
import IItemState, { zip } from '@/models/items/IItemState';
import { ItemState } from '@/models/items/ItemEnums';
import { ensureRegion } from '@/util/Utils';
import TableProvider from './TableProvider';

export interface IItemProvider {

    getItemCharmRequiredKeys(charmItemId: number, region?: string): Promise<[number, number][]>;
}

class ItemProvider implements IItemProvider {

    public async getItemCharmRequiredKeys(charmItemId: number, region?: string): Promise<[number, number][]> {
        region = ensureRegion(region);

        const resp = await TableProvider.getTableRowsMatching<ICharmItemKeyApiResponse>('charmitemkeytable', '_CharmItemID', 'eq', charmItemId, region);
        
        const rowId = resp.find(() => true);
        if (resp.length > 0) {
            const data = resp[0];
            
            const keyer = (n: number) => `_Key${n}` as keyof ICharmItemKeyApiResponse;
            const keyCoster = (n: number) => `_Key${n}cost` as keyof ICharmItemKeyApiResponse;

            const ret: [number, number][] = [];
            for (let i = 1; i <= 5; ++i) {
                const keyId = Number(data[keyer(i)]);
                const keyCost = Number(data[keyCoster(i)]);
                if (keyId && keyCost) {
                    ret.push([keyId, keyCost]);
                }
            }

            return ret;
        } else {
            return [];
        }
    }
}

export default new ItemProvider() as IItemProvider;
