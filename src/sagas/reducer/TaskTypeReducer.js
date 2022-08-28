import { GET_ALL_TASKTYPE } from "../../util/constant/TaskTypeConstant";

const initialState = {
  arrTaskType: [],
};

export const TaskTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_TASKTYPE:
      return { ...state, arrTaskType: action.arrTaskType };

    default:
      return state;
  }
};
