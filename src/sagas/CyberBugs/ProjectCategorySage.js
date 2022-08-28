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
import { USER_SIGN_API } from "../../constants/CyberBugs/CyberBug";
import { cyberbugsService } from "../../services/cyberbugsService";
import { TOKEN_CYBERSOFT, USER_LOGIN } from "../../services/configURL";
import { history } from "../../util/lib/history";
function* getAllCategory(action) {
  yield delay(500);
  try {
    const { data, status } = yield cyberbugsService.getAllProductCategory();

    yield put({
      type: "ADD_ARRCATEGORY",
      data: data.content,
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

export function* theodoiGetAllCategory() {
  yield takeLatest("GET__ALL__PROJECT__CATEGORY", getAllCategory);
}
