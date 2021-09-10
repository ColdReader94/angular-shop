export interface IGoodsBaseItem {
    id: string;
    name: string;
    imageUrls: string[];
    availableAmount: number;
    price: number;
    rating: number;
    description: number;
    isInCart?: boolean;
    isFavorite?: boolean;
}

export interface IGoodsResponse {
    goods: {
        [key: string]: {
            [key: string]: IGoodsBaseItem[];
        };
    };
}
