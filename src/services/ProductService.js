import { QuanService } from "./QuanService";

export class ProductService extends QuanService {
  constructor() {
    super();
  }
  getAllProduct = () => {
    return this.get(`product/all`);
  };
  getAllCategory = () => {
    return this.get(`category/all`);
  };
  getAllBrand = () => {
    return this.get(`brand/all`);
  };
  getDetailProduct = (id) => {
    return this.get(`product/${id}`);
  };
  deleteProduct = (id) => {
    return this.delete(`admin/product/${id}`);
  };
}

export const productService = new ProductService();
