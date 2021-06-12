import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAllUnits() {
  return http.get(apiUrl + `/messages/messageallunits`);
}
