export interface IUser {
    login: string;
    password: string;
    avatar?: string;
    firstName: string;
    lastName: string;
    token: string;
    cart: any[];
    favourites: any[];
    orders: any[];
}