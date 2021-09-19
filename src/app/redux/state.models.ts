import { ICategories } from '../core/models/categories.model';
import { IGoodsBaseItem } from '../core/models/goods.model';
import { IUserDataState } from './models/user-data-state.model';

export interface AppState {
    userData: IUserDataState;
    categories: ICategories[];
    itemsForSale: IGoodsBaseItem[];
    popularItems: IGoodsBaseItem[];
}
