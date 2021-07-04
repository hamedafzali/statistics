import * as actions from "./actions";
export const employees = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.ADD_EMPLOYEE: {
      return state.concat(payload);
    }
    case actions.REMOVE_LAST_EMPLOYEE: {
      return state.splice(0, state.length - 2);
    }
    case actions.REMOVE_ALL_EMPLOYEE: {
      return [];
    }
    default:
      return state;
  }
};
