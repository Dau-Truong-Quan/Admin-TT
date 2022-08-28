import axios from "axios";

export const BASE_URL = "https://casestudy.cyberlearn.vn/api";
export const TOKEN_CYBERSOFT = "ACCESS_TOKEN";
export const USER_LOGIN = "userLogin";
let timeRequestMax;

let getAccesstoken = () => {
  let jsonData = localStorage.getItem("user");
  if (jsonData) {
    return JSON.parse(jsonData).accessToken;
  } else {
    return null;
  }
};
export const httpService = axios.create({
  baseURL: BASE_URL,
  timeout: 1000 * timeRequestMax,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
});
// can thiệp trước khi gọi request
httpService.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("yes request");
    return config;
  },
  function (error) {
    console.log("error: ", error);
    // Do something with request error
    return Promise.reject(error);
  }
);
// can thiệp sau khi có request trả về

httpService.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("error interceptor: ", error);
    // đá ra ngoài login nếu status = 401

    switch (error.response.status) {
      case 401:
      case 403:
        window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
