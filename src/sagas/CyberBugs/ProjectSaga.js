import axios from "axios";
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
  CREATE_PROJECT_SAGA,
  USER_SIGN_API,
} from "../../constants/CyberBugs/CyberBug";
import { cyberbugsService } from "../../services/cyberbugsService";
import { TOKEN_CYBERSOFT, USER_LOGIN } from "../../services/configURL";
import { history } from "../../util/lib/history";
import { projectService } from "../../services/ProjectService";
import { NotificationWithIcon } from "../../util/Notification/NotificationCycberbug";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
} from "../../util/constant/ProjectConstant";
import { GET_USER_BY_PRODUCTID_SAGA } from "../../util/constant/UserContant";
function* createProjectSaga(action) {
  yield delay(500);
  try {
    const { data, status } = yield cyberbugsService.createProject(
      action.newProject
    );

    yield put({
      type: USER_LOGIN,
      userLogin: data.content,
    });

    // let history = yield select((state) => state.HistoryReducer.history);
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

export function* theoDoicreateProjectSaga() {
  yield takeLatest(CREATE_PROJECT_SAGA, createProjectSaga);
}

function* getListProjectSaga(action) {
  yield delay(500);
  try {
    const { data, status } = yield cyberbugsService.getAllProduct();

    yield put({
      type: "GET_LIST_PROJECT",
      data: data.content,
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

export function* theoDoigetListProjectSaga() {
  yield takeLatest("GET_LIST_PROJECT_SAGA", getListProjectSaga);
}

function* updateProjectSaga(action) {
  yield delay(500);
  try {
    const { data, status } = yield cyberbugsService.updateProject(
      action.projectUpdate
    );

    yield put({
      type: "GET_LIST_PROJECT",
    });
    yield put({
      type: "CLOSE_DRAWER",
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

export function* theoDoiupdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

function* deleteProjectSaga(action) {
  try {
    const { data, status } = yield call(() =>
      projectService.deleteProject(action.idProject)
    );
    yield delay(500);
    NotificationWithIcon("success", "Delete successs");
    yield put({
      type: "GET_LIST_PROJECT",
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

export function* theoDoideleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

function* getProjectDetail(action) {
  try {
    const { data, status } = yield call(() =>
      projectService.getProjectDetail(action.idProject)
    );
    console.log(data);
    yield put({
      type: "PUT_PROJECT_DETAIL",
      projectDetail: data.content,
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

export function* theoDoigetProjectDetail() {
  yield takeLatest("GET_PROJECT_DETAIL", getProjectDetail);
}

function* getAllProject(action) {
  try {
    const { data, status } = yield call(() => projectService.getAllProject());
    console.log(data);
    yield put({
      type: GET_ALL_PROJECT,
      arrProject: data.content,
    });
    yield put({
      type: GET_USER_BY_PRODUCTID_SAGA,
      idProject: data.content[0]?.id,
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

export function* theodoigetAllProject() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProject);
}
