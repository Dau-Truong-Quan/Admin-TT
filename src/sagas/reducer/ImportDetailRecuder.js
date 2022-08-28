import { GET_ALL_IMPORT } from "../../util/constant/ImportConstant";
import { GET_ALL_IMPORTDETAIL } from "../../util/constant/ImportDetailConstant";

const initialState = {
  arrImportDetail: [],
};

export const ImportDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_IMPORTDETAIL:
      return { ...state, arrImportDetail: action.arrImportDetail };

    default:
      return state;
  }
};
