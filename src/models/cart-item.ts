import Product from "./product";

export default class CartItem {
  _id!: string;
  productId!: string;
  quantity!: number;
  price!: number;
  total!: number;
  product!: Product;
  observations?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
