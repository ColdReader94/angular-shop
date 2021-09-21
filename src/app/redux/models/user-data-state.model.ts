import { IUser } from '../../core/models/user.model';

export interface IUserDataState {
    currentCity: string;
    isLoggin: boolean;
    settingsError: string;
    currentUser: IUser;
    token: string;
}

export const initialUserData: IUserDataState = {
    currentCity: '',
    isLoggin: false,
    settingsError: '',
    token: '',
    currentUser: {
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        cart: [],
        favorites: [],
        orders: [],
        avatar: '',
    },
};
