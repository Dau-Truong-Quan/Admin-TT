// import { Axios } from "axios";

import { DOMAN_CYBERBUG, DOMAN_QUAN } from "../util/constant/SettingSystem";
import { TOKEN_CYBERSOFT, USER_LOGIN } from "./configURL";
const { default: Axios } = require("axios");

export const cyberbugsService = {
  signinCyberBugs: (userlogin) => {
    console.log(userlogin);
    return Axios({
      url: `${DOMAN_QUAN}/auth/signin`,
      method: "POST",
      data: {
        username: userlogin.email,
        password: userlogin.passWord,
      },
    });
  },
  getAllProductCategory: () => {
    return Axios({
      url: `${DOMAN_CYBERBUG}/ProjectCategory`,
      method: "GET",
    });
  },
  createProject: (project) => {
    return Axios({
      url: `${DOMAN_CYBERBUG}/Project/createProjectAuthorize`,
      method: "POST",
      data: project,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  },
  updateProject: (project) => {
    return Axios({
      url: `${DOMAN_CYBERBUG}/Project/updateProject?projectId=${project.id}`,
      method: "PUT",
      data: project,
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  },

  getAllProduct: () => {
    return Axios({
      url: `${DOMAN_CYBERBUG}/Project/getAllProject`,
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem(TOKEN_CYBERSOFT),
      },
    });
  },
};
