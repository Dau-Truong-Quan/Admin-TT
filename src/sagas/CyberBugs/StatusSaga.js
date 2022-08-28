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
function* getAllStatus(action) {
  try {
    const { data, status } = yield call(() => statusService.getAllStatus());
    yield put({
      type: GET_ALL_STATUS,
      arrStatus: data.content,
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

export function* theodoigetAllStatus() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatus);
}
