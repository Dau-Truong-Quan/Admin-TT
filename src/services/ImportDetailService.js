import { DOMAN_QUAN } from "../util/constant/SettingSystem";
import { QuanService } from "./QuanService";
const { default: Axios } = require("axios");
export class ImportDetailService extends QuanService {
  constructor() {
    super();
  }
  getAllImportDetail = (id) => {
    return this.get(`admin/import/import-detail?importId=${id}`);
  };

  addProductToImport2 = (id, importDetailDTO) => {
    return Axios({
      url: `${DOMAN_QUAN}/admin/import/addProduct?id=${id}`,
      method: "POST",
      data: {
        price: importDetailDTO.price,
        productId: importDetailDTO.productId,
        quantity: importDetailDTO.quantity,
      },
    });
  };
  deleteImportDetail = (id) => {
    return this.post(`admin/import/deleteImportDetail?id=${id}`);
  };
}

export const importDetailService = new ImportDetailService();
