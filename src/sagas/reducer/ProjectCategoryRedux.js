const initialState = {
  arrCategory: [],
};

export const ProjectCategoryRedux = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ARRCATEGORY": {
      state.arrCategory = action.data;
      return { ...state };
    }

    default:
      return { ...state };
  }
};
