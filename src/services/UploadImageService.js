import axios from "axios";
import { QuanService } from "./QuanService";

export class UploadImageService extends QuanService {
  constructor() {
    super();
  }
}

export const uploadImageService = new UploadImageService();
