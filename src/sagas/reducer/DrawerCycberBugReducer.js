const initialState = {
  visible: false,
  title: "",
  ComponentDrawer: <p>default</p>,
  CallbackSubmit: () => {
    alert("alter");
  },
};

export const DrawerCycberbugReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER": {
      return { ...state, visible: true };
    }
    case "CLOSE_DRAWER": {
      return { ...state, visible: false };
    }
    case "OPEN_FORM_EDIT_DRAWER": {
      console.log(action.Component);
      return {
        ...state,
        visible: true,
        ComponentDrawer: action.Component,
        title: action.title,
      };
    }
    case "SUBMIT_EDIT_DRAWER": {
      console.log(action);
      return { ...state, CallbackSubmit: action.Submition };
    }
    case "SUBMIT_CREATE_TASK": {
      console.log(action);
      return { ...state, CallbackSubmit: action.Submition };
    }
    case "OPEN_FORM_CREATE_TASK": {
      console.log(action.Component);
      return {
        ...state,
        visible: true,
        ComponentDrawer: action.Component,
        title: action.title,
      };
    }
    default:
      return { ...state };
  }
};
