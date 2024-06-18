export const modalReducer = (state = false, action) => {
  switch (action.type) {
    case "SET_VISIBLE":
      return action.payload;
    case "CLOSE_MODAL":
      return false;
    default:
      return state;
  }
  // return state;
};
