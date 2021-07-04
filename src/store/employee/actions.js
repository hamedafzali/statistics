export const ADD_EMPLOYEE = "ADD_EMPLOYEE";
export const REMOVE_LAST_EMPLOYEE = "REMOVE_LAST_EMPLOYEE";
export const REMOVE_ALL_EMPLOYEE = "REMOVE_ALL_EMPLOYEE";
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
