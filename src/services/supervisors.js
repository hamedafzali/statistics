import http from "./httpService";
import { apiUrl } from "../config.json";

export function getSupervisors() {
  return http.get(apiUrl + "/karaneh/getsupervisors");
}
