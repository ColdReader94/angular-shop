import { IOrder } from './order.model';

export interface IUser {
    login: string;
    password: string;
    avatar?: string;
    firstName: string;
    lastName: string;
    cart: string[];
    favorites: string[];
    orders: IOrder[];
    token?: string;
}
