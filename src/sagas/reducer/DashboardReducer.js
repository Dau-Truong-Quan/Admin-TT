const initialState = {
  valueHeader: [],
  list: [],
  compare: {},
};

export const DashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DASHBOARD":
 
      return { ...state, valueHeader: action.valueHeader };
    case "SET_COMPARE":
     
      return { ...state, compare: action.compare };
    case "SET_LIST":
      return { ...state, list: action.list };
    default:
      return state;
  }
};
