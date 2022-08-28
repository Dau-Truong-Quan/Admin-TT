import { GET_ALL_PROJECT } from "../../util/constant/ProjectConstant";

const initialState = {
  projectList: [],
  arrProject: [],
};

export const ProjectListRedux = (state = initialState, action) => {
  switch (action.type) {
    case "GET_LIST_PROJECT": {
      state.projectList = action.data;
      return { ...state };
    }
    case GET_ALL_PROJECT: {
      state.arrProject = action.arrProject;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
