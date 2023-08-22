import { environment } from 'src/environments/environment';

const BASE_URL = environment.production
  ? 'https://r-shop.onrender.com/api/v1'
  : 'http://localhost:4000/api/v1';

export const USER_PROFILE_URL = BASE_URL + '/user/me';
export const DELETE_USER_URL = USER_PROFILE_URL + '/delete';
export const REGISTER_USER_URL = BASE_URL + '/user/register';
export const LOGIN_USER_URL = BASE_URL + '/user/login';
export const FORGOT_USER_URL = BASE_URL + '/user/password/forgot';
export const UPDATE_PASSWORD_URL = BASE_URL + 'user/password/update';
export const REFREASH_TOKEN_URL = BASE_URL + '/user/refresh-token';
export const RESET_PASSWORD_URL = BASE_URL + '/user/password/reset/';
export const LOGOUT_URL = BASE_URL + '/user/logout';

export const ADD_PRODUCT_URL = BASE_URL + '/product/new';
export const PRODUCTS_URL = BASE_URL + '/product/all';
export const PRODUCT_BY_ID_URL = BASE_URL + '/product/';
export const UPDATE_PEODUCT_BY_ID_URL = BASE_URL + '/product/';
export const DELETE_PRODUCT_BY_ID_URL = BASE_URL + '/product/';
export const PERODUCT_BY_SEARCH_URL = BASE_URL + '/product/search/';

export const CREATE_CART_URL = BASE_URL + '/user/cart/create';
export const GET_CART_URL = BASE_URL + '/user/cart/all';
export const UPDATE_CART_URL = BASE_URL + '/user/cart/update';
export const UPDATE_LOCAL_CART_URL = BASE_URL + '/user/cart/local-store';

export const CREATE_WISH_LIST_URL = BASE_URL + '/user/wish/create';
export const GET_WISH_LIST_URL = BASE_URL + '/user/wish/get';
export const UPDATE_WISH_LIST_URL = BASE_URL + '/user/wish/update';
export const UPDATE_LOCAL_WISH_LIST_URL = BASE_URL + '/user/wish/local-store';

export const GET_ORDER_URL = BASE_URL + '/user/order/';
export const ORDER_NEW_FOR_CURRENT_USER_URL = BASE_URL + '/user/order/summary';
export const GET_SPECIFIC_ORDER_URL = BASE_URL + '/user/order/get/';
export const CREATE_ORDER_URL = BASE_URL + '/user/order';
export const CANCEL_ORDER_URL = BASE_URL + '/user/order/cancel/';
export const CANCEL_SPECIFIC_ORDER_URL = BASE_URL + '/user/order/';

export const CREATE_PAYMENT_URL = BASE_URL + '/user/order/payment';
export const PAYMENT_STATUS_URL = BASE_URL + '/user/order/payment/status';
export const TRACK_ORDER_STATUS_URL = BASE_URL + '/user/order/payment/track/';
export const PUBLISHABLE_KEY =
  'pk_test_51NdRRlSDTl5cay5Ya0mMX3wKTnSWESpnkR6QOc9xjIKEOLxii5Mn7HDXJEEnx9x2tF8qAusyTrYrEVj0hZhX6FGC00bOC21pb1';
