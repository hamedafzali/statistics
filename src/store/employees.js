//Action Types
export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const REMOVE_LAST_EMPLOYEE = "REMOVE_LAST_EMPLOYEE";
export const REMOVE_ALL_EMPLOYEE = "REMOVE_ALL_EMPLOYEE";

//Actions
export const addEmployee = (obj) => ({
  type: ADD_EMPLOYEE,
  payload: obj,
});
export const removeLastEmployee = () => ({
  type: REMOVE_LAST_EMPLOYEE,
});
export const removeAllEmployee = () => ({
  type: REMOVE_ALL_EMPLOYEE,
});

//Reducers
export const employees = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_EMPLOYEE: {
      return state.concat(payload);
    }
    case REMOVE_LAST_EMPLOYEE: {
      return state.reverse().slice(1).reverse();
    }
    case REMOVE_ALL_EMPLOYEE: {
      return [];
    }
    default:
      return state;
  }
};
