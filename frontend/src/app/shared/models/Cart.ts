import { CartItem } from './CartItem';

export class Cart {
  _id?: any;
  cartItems: CartItem[] = [];
  totalPrice!: number;
  totalItems!: number;
  createdAt?: any;
  updatedAt?: any;
}
