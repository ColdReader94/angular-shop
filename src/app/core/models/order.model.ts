export interface IOrderItem {
    id: string;
    price: number;
    amount: number;
    name: string;
    imageUrls: string[];
}

export interface IDetailsOrder {
    totalPrice: number;
    name: string;
    address: string;
    phone: string;
    timeToDeliver: string;
    dateToDeliver: string;
    comment: string;
}

export interface ICart {
    items: IOrderItem[];
    details: IDetailsOrder;
    id?: string;
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
    id?: string;
}
