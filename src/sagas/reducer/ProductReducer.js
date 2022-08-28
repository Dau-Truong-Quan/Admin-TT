import { GET_ALL_PRIORITY } from "../../util/constant/PriorityConstant";
import { GET_ALL_PRODUCT } from "../../util/constant/ProductConstant";
import { GET_ALL_TASKTYPE } from "../../util/constant/TaskTypeConstant";

const initialState = {
  arrProduct: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return { ...state, arrProduct: action.arrProduct };

    default:
      return state;
  }
};
