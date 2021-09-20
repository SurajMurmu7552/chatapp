import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";
import registerReducer from "./registerSlice";
import contactReducer from "./contactSlice";

export default configureStore({
  reducer: {
    login: loginReducer,
    register: registerReducer,
    contact: contactReducer,
  },
});
