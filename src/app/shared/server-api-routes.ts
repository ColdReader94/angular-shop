export const baseUrl = 'http://localhost:3004/';

export enum ServerApiRoutes {
    userFind = 'users/login',
    userGetInfo = 'users/userInfo',
    userRegister = 'users/register',
    getCategories = 'categories',
    searchGoods = 'goods/search?text=',
    getGoods = 'goods/item/',
    favourite = 'users/favorites',
    cart = 'users/cart',
    order = 'users/order'
}

export const getCategoryGoods = '​goods​/category​/';
