import { CartItem } from './CartItem';
import { ShipItem } from './ShipItem';

export class Order {
  id!: any;
  orderDetails!: CartItem[];
  shippingDetails!: ShipItem[];
  status!: string;
  paymentId?: any;
  createdAt!: string;
  updatedAt!: string;
}
