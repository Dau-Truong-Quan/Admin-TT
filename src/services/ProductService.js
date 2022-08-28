import { QuanService } from "./QuanService";

export class ProductService extends QuanService {
  constructor() {
    super();
  }
  getAllProduct = () => {
    return this.get(`product/all`);
  };
}

export const productService = new ProductService();
