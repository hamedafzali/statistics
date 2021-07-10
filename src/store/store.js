import { createStore, combineReducers } from "redux";
import { employees } from "./employees";
const reducers = { employees };

const rootReducer = combineReducers(reducers);

export const configureStore = () =>
  createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
