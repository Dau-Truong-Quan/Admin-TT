import { QuanService } from "./QuanService";

export class ImportService extends QuanService {
  constructor() {
    super();
  }
  getAllImport = () => {
    return this.get(`admin/import`);
  };
  createImport = (id) => {
    return this.post(`admin/import?id=${id}`);
  };

  deleteImport = (id) => {
    return this.post(`admin/import/deleteImport?id=${id}`);
  };
}

export const importService = new ImportService();
