import { combineReducers } from "redux";
import { fetchStatusSliceReducer } from "./appSlice";

export const rootReducer = combineReducers({
  appState: fetchStatusSliceReducer,
});

export { FetchEnumStatus, fetchStatusSliceActions } from "./appSlice";
