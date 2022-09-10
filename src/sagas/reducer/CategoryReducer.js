import { GET_ALL_CATEGORY } from "../../util/constant/CategoryConstant";
import { GET_ALL_PRIORITY } from "../../util/constant/PriorityConstant";
import { GET_ALL_TASKTYPE } from "../../util/constant/TaskTypeConstant";

const initialState = {
  arrCategory: [],
};

export const CategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CATEGORY:
      return { ...state, arrCategory: action.arrCategory };

    default:
      return state;
  }
};
