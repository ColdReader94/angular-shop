export interface IUser {
    login: string;
    password: string;
    avatar?: string;
    firstName: string;
    lastName: string;
    token: string;
    cart: string[];
    favorites: string[];
    orders: any[];
}
