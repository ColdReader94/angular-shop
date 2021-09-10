import { ICategories } from "../core/models/categories.model";
import { IUserDataState } from "./models/user-data-state.model";

export interface AppState {
    userData: IUserDataState;
    categories: ICategories[];
}
