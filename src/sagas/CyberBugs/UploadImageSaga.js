import {
  call,
  delay,
  fork,
  takeEvery,
  takeLatest,
  put,
  select,
} from "@redux-saga/core/effects";
import { taskService } from "../../services/TaskService";
import { history } from "../../util/lib/history";
import {
  GET_FILE_IMAGE,
  UPLOAD_IMAGE_PRODUCT,
  UPLOAD_IMAGE_PRODUCT_SAGA,
} from "../../util/constant/UploadImageConstant";
import axios from "axios";
import { API_ROOT } from "../../constants/CyberBugs/CyberBug";
function* updaloadImageProduct(action) {
  try {
    let loginData = JSON.parse(localStorage.getItem("login"));
    const formData = new FormData();
    formData.append("file", action.file);

    axios
      .post(
        `${API_ROOT}/api/image/user2/${loginData?.dataLogin.id}`,
        formData,
        {
          headers: {
            Authorization: "Bearer " + loginData.dataLogin.accessToken,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
    } else if (error.request) {
      console.log("request");
    } else if (error.message) {
      console.log(error.message);
    }
  }
}

export function* theodoiupdaloadImageProduct() {
  yield takeLatest(UPLOAD_IMAGE_PRODUCT_SAGA, updaloadImageProduct);
}
