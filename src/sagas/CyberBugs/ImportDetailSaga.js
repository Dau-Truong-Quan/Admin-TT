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

import {
  ADD_PRODUCT_TO_IMPORT,
  ADD_PRODUCT_TO_IMPORT_SAGA,
  DELETE_IMPORT_DETAIL_SAGA,
  GET_ALL_IMPORTDETAIL,
  GET_ALL_IMPORTDETAIL_SAGA,
} from "../../util/constant/ImportDetailConstant";
import { importDetailService } from "../../services/ImportDetailService";

function* getAllImportDetail(action) {
  console.log(action.id);
  try {
    const { data, status } = yield call(() =>
      importDetailService.getAllImportDetail(action.id)
    );

    yield put({
      type: GET_ALL_IMPORTDETAIL,
      arrImportDetail: data,
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

export function* theodoigetAllImportDetail() {
  yield takeLatest(GET_ALL_IMPORTDETAIL_SAGA, getAllImportDetail);
}
function* addProductToImport(action) {
  let id = yield select((state) => state.ImportReducer.id);
  try {
    const { data, status } = yield call(() =>
      importDetailService.addProductToImport2(id, action.importDetailDTO)
    );

    yield put({
      type: GET_ALL_IMPORTDETAIL_SAGA,
      id,
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

export function* theodoiaddProductToImport() {
  yield takeLatest(ADD_PRODUCT_TO_IMPORT_SAGA, addProductToImport);
}

function* deleteImportDetail(action) {
  let id = yield select((state) => state.ImportReducer.id);
  try {
    const { data, status } = yield call(() =>
      importDetailService.deleteImportDetail(action.idProduct)
    );

    yield put({
      type: GET_ALL_IMPORTDETAIL_SAGA,
      id,
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

export function* theodoideleteImportDetail() {
  yield takeLatest(DELETE_IMPORT_DETAIL_SAGA, deleteImportDetail);
}
