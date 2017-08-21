import {Product} from '../product/product'
import {Client} from '../client/client'
export class Order {
    id: number;
    price: number;
    paymentMethod: string;
    shippingMethod: string;
    orderStatus: string;
    client: Client;
    products: Product[];
}
