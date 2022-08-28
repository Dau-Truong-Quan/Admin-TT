const initialState = {
  visible: false,
};

export const FormAddProductToImpotReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_FORM_ADD_PRODUCT": {
      return { ...state, visible: true };
    }
    case "CLOSE_FORM_ADD_PRODUCT": {
      return { ...state, visible: false };
    }

    default:
      return { ...state };
  }
};
