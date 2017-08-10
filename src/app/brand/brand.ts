import { Product }      from '../product/product';

export class Brand {
  id: number;
  name: string;
  description: string;
  photoPath: string;
  products: Product[];
}