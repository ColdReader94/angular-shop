import { ICategories, IBaseCategory } from "./categories.model";
import { IGoodsBaseItem } from "./goods.model";

export interface ISearchResults {
        categories: ICategories[];
        subCategories: IBaseCategory[];
        goods: IGoodsBaseItem[];
}
