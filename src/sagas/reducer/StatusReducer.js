import { GET_ALL_STATUS } from "../../util/constant/StatusConstant";
import { GET_ALL_TASKTYPE } from "../../util/constant/TaskTypeConstant";

const initialState = {
  arrStatus: [],
};

export const StatusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_STATUS:
      return { ...state, arrStatus: action.arrStatus };

    default:
      return state;
  }
};
