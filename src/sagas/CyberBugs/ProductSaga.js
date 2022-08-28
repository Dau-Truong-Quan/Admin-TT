import { taskTypeService } from "../../services/TaskTypeService";
import {
  GET_ALL_TASKTYPE,
  GET_ALL_TASKTYPE_SAGA,
} from "../../util/constant/TaskTypeConstant";
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
import { NotificationWithIcon } from "../../util/Notification/NotificationCycberbug";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../util/constant/StatusConstant";
import { statusService } from "../../services/StatusService";
import { projectService } from "../../services/ProjectService";

import { productService } from "../../services/ProductService";
import {
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_SAGA,
} from "../../util/constant/ProductConstant";
function* getAllProduct(action) {
  try {
    const { data, status } = yield call(() => productService.getAllProduct());

    yield put({
      type: GET_ALL_PRODUCT,
      arrProduct: data,
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

export function* theodoigetAllProduct() {
  yield takeLatest(GET_ALL_PRODUCT_SAGA, getAllProduct);
}
