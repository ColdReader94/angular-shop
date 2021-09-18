export interface IOrderItem {
    id: string;
    amount: number;
}

export interface IOrder {
    items: IOrderItem[];
    details: {
        name: string;
        address: string;
        phone: string;
        timeToDeliver: string;
        comment: string;
    };
}
