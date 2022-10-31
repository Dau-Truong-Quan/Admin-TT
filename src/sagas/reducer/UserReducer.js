import {
  GET_ALL_USER,
  GET_DETAIL_USER,
  GET_ID_USER,
} from "../../util/constant/UserContant";

const initialState = {
  arrUser: [],
  idUser: "",
  detailUser: {},
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USER:
      return { ...state, arrUser: action.arrUser };
    case GET_ID_USER:
      return { ...state, idUser: action.idUser };
    case GET_DETAIL_USER:
      return { ...state, detailUser: action.detailUser };

    default:
      return state;
  }
};
