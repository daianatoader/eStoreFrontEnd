import {Product} from '../product/product'
import {User} from '../user/user'
export class Order {
    id: number;
    price: number;
    paymentMethod: string;
    shippingMethod: string;
    orderStatus: string;
    user: User;
    products: Product[];
}
