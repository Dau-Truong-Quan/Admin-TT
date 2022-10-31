import {
  call,
  delay,
  fork,
  takeEvery,
  takeLatest,
  put,
  select,
} from "@redux-saga/core/effects";
import { NotificationCycberbug } from "../../util/Notification/NotificationCycberbug";
import { productService } from "../../services/ProductService";
import {
  DELETE_PRODUCT_SAGA,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_SAGA,
  GET_DETAIL_PRODUCT,
  GET_DETAIL_PRODUCT_SAGA,
} from "../../util/constant/ProductConstant";
import {
  DELETE_USER_SAGA,
  GET_ALL_USER,
  GET_ALL_USER_SAGA,
  GET_DETAIL_USER,
  GET_DETAIL_USER_SAGA,
} from "../../util/constant/UserContant";
import { userService2 } from "../../services/userService";

function* getAllUser(action) {
  try {
    const { data, status } = yield call(() => userService2.getAllUser());
    console.log("come");
    console.log(data);
    yield put({
      type: GET_ALL_USER,
      arrUser: data,
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

export function* theodoigetAllUser() {
  yield takeLatest(GET_ALL_USER_SAGA, getAllUser);
}
function* deleteUser(action) {
  try {
    const { data, status } = yield call(() =>
      userService2.deleteUser(action.id)
    );
    console.log(data);
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

export function* theodoideleteUser() {
  yield takeLatest(DELETE_USER_SAGA, deleteUser);
}
