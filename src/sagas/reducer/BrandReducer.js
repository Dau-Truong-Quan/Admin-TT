import { GET_ALL_BRAND } from "../../util/constant/BrandConstant";
import { GET_ALL_CATEGORY } from "../../util/constant/CategoryConstant";
import { GET_ALL_PRIORITY } from "../../util/constant/PriorityConstant";
import { GET_ALL_TASKTYPE } from "../../util/constant/TaskTypeConstant";

const initialState = {
  arrBrand: [],
};

export const BrandReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_BRAND:
      return { ...state, arrBrand: action.arrBrand };

    default:
      return state;
  }
};
