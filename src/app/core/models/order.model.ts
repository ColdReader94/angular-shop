export interface IOrderItem {
    id: string;
    price: number;
    amount: number;
    name: string;
    imageUrls: string[];
}

export interface IOrder {
    items: IOrderItem[];
    details: {
        totalPrice: number;
        name: string;
        address: string;
        phone: string;
        timeToDeliver: string;
        dateToDeliver: string;
        comment: string;
    };
    id?: string;
}
