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
import { history } from "../../util/lib/history";
function* createTaskSaga(action) {
  try {
    const { data, status } = yield call(() =>
      taskService.createTask(action.taskObject)
    );
    NotificationWithIcon("success", "Create task success");
    history.push("/projectManager");
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

export function* theodoicreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}
