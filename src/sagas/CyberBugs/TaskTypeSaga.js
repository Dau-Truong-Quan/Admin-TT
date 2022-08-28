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
function* getAllTaskType(action) {
  try {
    const { data, status } = yield call(() => taskTypeService.getAllTaskType());

    yield put({
      type: GET_ALL_TASKTYPE,
      arrTaskType: data.content,
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

export function* theodoigetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASKTYPE_SAGA, getAllTaskType);
}
