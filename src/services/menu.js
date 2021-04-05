import http from "./httpService";
import { apiUrl } from "../config.json";

export function getMenu(groupid) {
  return http.get(apiUrl + `/auth/getmenu/${groupid}`);
}
