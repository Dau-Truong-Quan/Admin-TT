const initialState = {
  history: {},
};

export const HistoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_HISTORY": {
      state.history = action.history;
      console.log(state.history);
      return { ...state };
    }

    default:
      return { ...state };
  }
};
