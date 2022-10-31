import { GET_ALL_STATUS } from "../../util/constant/StatusConstant";
import { GET_ALL_TASKTYPE } from "../../util/constant/TaskTypeConstant";
import {
  GET_FILE_IMAGE,
  UPLOAD_IMAGE_PRODUCT,
} from "../../util/constant/UploadImageConstant";
import { UPLOAD_IMAGE_USER } from "../../util/constant/UserContant";

const initialState = {
  fileImage: [],
  imageProduct: "",
  imageUser: "",
};

export const UploadImageReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FILE_IMAGE:
      console.log(action.fileImage);
      return { ...state, fileImage: action.fileImage };
    case UPLOAD_IMAGE_PRODUCT:
      return { ...state, imageProduct: action.imageProduct };
    case UPLOAD_IMAGE_USER:
      return { ...state, imageUser: action.imageUser };

    default:
      return state;
  }
};
