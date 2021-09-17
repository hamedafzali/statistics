import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";

export function getSupervisors() {
  return http.get(apiUrl + "/karaneh/getsupervisors");
}
