export const cashReducer = (state = false, action) => {
  switch (action.type) {
    case "CASH":
      return action.payload;
    default:
      return state;
  }
};
