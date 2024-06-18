let initialState = [];

if (typeof window !== "undefined") {
  if (localStorage.getItem("itemCart")) {
    initialState = JSON.parse(localStorage.getItem("itemCart"));
    // console.log(initialState);
  } else {
    initialState = [];
  }
}
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return action.payload;
    default:
      return state;
  }
};

export default cartReducer;
