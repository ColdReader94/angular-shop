export interface IBaseCategory {
    id: string;
    name: string;
}

export const initialCategories = [];

export interface ICategories extends IBaseCategory {
    subCategories: IBaseCategory[];
}
