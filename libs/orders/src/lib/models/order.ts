import { OrderItem } from './order-item';
import { User } from '@bluebits/users';

export class Order {
  _id?: string;
  orderItems?: OrderItem[];
  shippingAddress1?: string;
  shippingAddress2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
  status?: number;
  totalPrice?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user?: any;
  dateOrdered?: string;
}
