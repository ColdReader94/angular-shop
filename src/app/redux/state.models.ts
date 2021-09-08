import { ICategories } from "./models/categories.model";
import { IUserDataState } from "./models/user-data-state.model";

export interface AppState {
    userData: IUserDataState;
    categories: ICategories[];
}
