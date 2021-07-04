import { createStore, combineReducers } from "redux";
import { employees } from "./employee/reducers";
const reducers = { employees };

const rootReducer = combineReducers(reducers);

export const configureStore = () =>
  createStore(
    rootReducer /* preloadedState, */,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
