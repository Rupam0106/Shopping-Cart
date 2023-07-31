import { environment } from 'src/environments/environment';

const BASE_URL = environment.production
  ? ''
  : 'https://ecommerce-backend-xp0v.onrender.com/api/v1';

export const USER_PROFILE_URL = BASE_URL + '/me';
export const DELETE_USER_URL = USER_PROFILE_URL + '/delete';
export const REGISTER_USER_URL = BASE_URL + '/register';
export const LOGIN_USER_URL = BASE_URL + '/login';
export const FORGOT_USER_URL = BASE_URL + '/password/forgot';
export const UPDATE_PASSWORD_URL = BASE_URL + 'password/update';
export const REFREASH_TOKEN_URL = BASE_URL + '/refresh-token';
export const RESET_PASSWORD_URL = BASE_URL + '/password/reset/:token';
export const LOGOUT_URL = BASE_URL + '/logout';

export const PRODUCTS_URL = BASE_URL + '/product/all';
