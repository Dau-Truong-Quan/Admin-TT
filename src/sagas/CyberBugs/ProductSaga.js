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
import { NotificationCycberbug } from "../../util/Notification/NotificationCycberbug";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../util/constant/StatusConstant";
import { statusService } from "../../services/StatusService";
import { projectService } from "../../services/ProjectService";

import { productService } from "../../services/ProductService";
import {
  DELETE_PRODUCT_SAGA,
  GET_ALL_PRODUCT,
  GET_ALL_PRODUCT_SAGA,
  GET_DETAIL_PRODUCT,
  GET_DETAIL_PRODUCT_SAGA,
} from "../../util/constant/ProductConstant";
import {
  GET_ALL_CATEGORY,
  GET_ALL_CATEGORY_SAGA,
} from "../../util/constant/CategoryConstant";
import {
  GET_ALL_BRAND,
  GET_ALL_BRAND_SAGA,
} from "../../util/constant/BrandConstant";
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
function* getDetailProduct(action) {
  console.log(action.id);
  try {
    const { data, status } = yield call(() =>
      productService.getDetailProduct(action.id)
    );

    yield put({
      type: GET_DETAIL_PRODUCT,
      detailProduct: data,
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

export function* theodoigetDetailProduct() {
  yield takeLatest(GET_DETAIL_PRODUCT_SAGA, getDetailProduct);
}
function* deleteProduct(action) {
  console.log(action.id);
  try {
    const { data, status } = yield call(() =>
      productService.deleteProduct(action.id)
    );
    console.log(data);
    yield put({
      type: GET_ALL_PRODUCT_SAGA,
    });
  } catch (error) {
    if (error.response) {
      console.log(error.response);
      NotificationCycberbug("error", error.response.data.message);
    } else if (error.request) {
      console.log("request");
    } else if (error.message) {
      console.log(error.message);
    }
  }
}

export function* theodoideleteProduct() {
  yield takeLatest(DELETE_PRODUCT_SAGA, deleteProduct);
}
function* getAllCategory(action) {
  try {
    const { data, status } = yield call(() => productService.getAllCategory());
    yield put({
      type: GET_ALL_CATEGORY,
      arrCategory: data,
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

export function* theodoigetAllCategory() {
  yield takeLatest(GET_ALL_CATEGORY_SAGA, getAllCategory);
}
function* getAllBrand(action) {
  try {
    const { data, status } = yield call(() => productService.getAllBrand());

    yield put({
      type: GET_ALL_BRAND,
      arrBrand: data,
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

export function* theodoigetAllBrand() {
  yield takeLatest(GET_ALL_BRAND_SAGA, getAllBrand);
}
