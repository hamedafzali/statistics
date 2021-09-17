import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";

export function getAllUnits() {
  return http.get(apiUrl + `/messages/messageallunits`);
}
