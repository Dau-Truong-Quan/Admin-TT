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
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../../util/constant/PriorityConstant";
import { priorityService } from "../../services/PriorityService";
import {
  CREATE_IMPORT,
  CREATE_IMPORT_SAGA,
  DELETE_IMPORT_SAGA,
  GET_ALL_IMPORT,
  GET_ALL_IMPORT_SAGA,
  GET_ID_IMPORT,
} from "../../util/constant/ImportConstant";
import { importService } from "../../services/ImportService";
import {
  GET_ALL_IMPORTDETAIL,
  GET_ALL_IMPORTDETAIL_SAGA,
} from "../../util/constant/ImportDetailConstant";
import { USER_LOGIN } from "../../services/configURL";
function* getAllImport(action) {
  try {
    const { data, status } = yield call(() => importService.getAllImport());
    console.log(data);
    yield put({
      type: GET_ALL_IMPORT,
      arrImport: data,
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

export function* theodoigetAllImport() {
  yield takeLatest(GET_ALL_IMPORT_SAGA, getAllImport);
}
function* createImport(action) {
  let usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));

  try {
    const { data, status } = yield call(() =>
      importService.createImport(usLogin.id)
    );
    console.log(data);
    yield put({
      type: GET_ALL_IMPORTDETAIL,
      arrImport: [],
    });
    yield put({
      type: GET_ID_IMPORT,
      id: data.id,
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

export function* theodoicreateImport() {
  yield takeLatest(CREATE_IMPORT_SAGA, createImport);
}

function* deleteImport(action) {
  let id = yield select((state) => state.ImportReducer.id);
  try {
    const { data, status } = yield call(() =>
      importService.deleteImport(action.id)
    );
    console.log(data);

    yield put({ type: GET_ALL_IMPORT_SAGA });
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

export function* theodoideleteImport() {
  yield takeLatest(DELETE_IMPORT_SAGA, deleteImport);
}
