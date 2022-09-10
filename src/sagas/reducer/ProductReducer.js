import { GET_ALL_PRIORITY } from "../../util/constant/PriorityConstant";
import {
  GET_ALL_PRODUCT,
  GET_DETAIL_PRODUCT,
} from "../../util/constant/ProductConstant";
import { GET_ALL_TASKTYPE } from "../../util/constant/TaskTypeConstant";

const initialState = {
  arrProduct: [],
  detailProduct: [],
};

export const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PRODUCT:
      return { ...state, arrProduct: action.arrProduct };
    case GET_DETAIL_PRODUCT:
      return { ...state, detailProduct: action.detailProduct };

    default:
      return state;
  }
};
