import { DOMAN_QUAN } from "../util/constant/SettingSystem";
import { TOKEN_CYBERSOFT } from "./configURL";
const { default: Axios } = require("axios");

export class QuanService {
  put = (url, model) => {
    return Axios({
      url: `${DOMAN_QUAN}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${DOMAN_QUAN}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };

  get = (url) => {
    return Axios({
      url: `${DOMAN_QUAN}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };
  delete = (url) => {
    return Axios({
      url: `${DOMAN_QUAN}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };
}
