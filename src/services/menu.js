import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";

export function getMenu(groupid) {
  return http.get(apiUrl + `/auth/getmenu/${groupid}`);
}
