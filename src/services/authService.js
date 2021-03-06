import jwtDecode from "jwt-decode";
import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";
const apiEndpoint = apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(username, password, callback) {
  //console.log(process.env);
  const jwt = await http.post(apiEndpoint + `/checkuser/`, {
    username,
    password,
  });
  localStorage.setItem(tokenKey, jwt.headers["x-auth-token"]);
  callback();
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
    //return { ...jwtDecode(jwt), jwt: jwt };
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}
const res = {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
};
export default res;
