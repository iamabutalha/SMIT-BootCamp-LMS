import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../../store/slices/authSlice";
import taskReducer from "../../store/slices/taskSlice";
import teamReducer from "../../store/slices/teamSlice";

const rootReducer = combineReducers({
  auth: authReducer,
  task: taskReducer,
  team: teamReducer,
});

export default rootReducer;

