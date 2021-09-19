import { IUser } from '../../core/models/user.model';

export interface IUserDataState {
    currentCity: string;
    isLoggin: boolean;
    settingsError: string;
    currentUser: IUser;
}

export const initialUserData: IUserDataState = {
    currentCity: '',
    isLoggin: false,
    settingsError: '',
    currentUser: {
        login: '',
        password: '',
        firstName: '',
        lastName: '',
        token: '',
        cart: [],
        favorites: [],
        orders: [],
        avatar: '',
    },
};
