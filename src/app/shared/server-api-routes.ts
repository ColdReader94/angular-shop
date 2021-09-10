export const baseUrl = 'http://localhost:3004/';

export enum ServerApiRoutes {
    userFind = 'users/login',
    userGetInfo = 'users/?token=',
    userRegister = 'users/register',
    getCategories = 'categories',
    searchGoods = 'goods/search?text='
}
