import { API_ROOT } from "../constants/CyberBugs/CyberBug";
import { TOKEN_CYBERSOFT } from "./configURL";
const { default: Axios } = require("axios");

export class baseService {
  put = (url, model) => {
    return Axios({
      url: `${API_ROOT}/${url}`,
      method: "PUT",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };

  post = (url, model) => {
    return Axios({
      url: `${API_ROOT}/${url}`,
      method: "POST",
      data: model,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };

  get = (url) => {
    return Axios({
      url: `${API_ROOT}/${url}`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };
  delete = (url) => {
    return Axios({
      url: `${API_ROOT}/${url}`,
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  };
}
