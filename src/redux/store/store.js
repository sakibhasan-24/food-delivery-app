import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../user/userSlice";
import searchReducer from "../searchReducer/searchReducer";
import cartReducer from "../cartReducer/cartReducer";
import { modalReducer } from "../modalReducer/modalReducer";
import { couponReducer } from "../couponReducer/couponReducer";
// import { cashReducer } from "../CashReducer/cashReducer";
import { cashReducer } from "../CashReducer/cashReducer";
// import userReducer from "./store/userSlice";

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  itemCart: cartReducer,
  modalReducer: modalReducer,
  couponReducer: couponReducer,
  cash: cashReducer,
});
// console.log(rootReducer);
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  //   reducer: {
  //     // Add the generated reducer as a specific top-level slice
  //     user: userReducer,
  //   },

  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
export const persistor = persistStore(store);
export default store;
