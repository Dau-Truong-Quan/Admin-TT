import {
  GET_ALL_IMPORT,
  GET_ID_IMPORT,
} from "../../util/constant/ImportConstant";

const initialState = {
  arrImport: [],
  id: 0,
};

export const ImportReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_IMPORT:
      return { ...state, arrImport: action.arrImport };
    case GET_ID_IMPORT:
      return { ...state, id: action.id };
    default:
      return state;
  }
};
