export interface IGoodsBaseItem {
    id: string;
    name: string;
    imageUrls: string[];
    availableAmount: number;
    price: number;
    rating: number;
    description: number;
    isInCart: boolean;
    isFavorite: boolean;
    category: string;
    subCategory: string;
}

export interface IGoodsResponse {
    goods: {
        [key: string]: {
            [key: string]: IGoodsBaseItem[];
        };
    };
}
