import { USER_LOGIN } from "../../services/configURL";
import { GET_USER_BY_PRODUCTID } from "../../util/constant/UserContant";

let usLogin = {};

if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const stateDefault = {
  userLogin: usLogin,
  arrUser: [],
  userSearch: [],
};
export const UserCyberBugReducer = (state = stateDefault, action) => {
  switch (action.type) {
    case USER_LOGIN: {
      state.userLogin = action.userLogin;
    }
    case "GET_USER_SEARCH": {
      state.userSearch = action.userSearch;
    }
    case GET_USER_BY_PRODUCTID: {
      state.arrUser = action.arrUser;
    }
    default:
      return { ...state };
  }
};
