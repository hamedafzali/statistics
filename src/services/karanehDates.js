import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";
export function getKaranehDates() {
  return http.get(apiUrl + `/karaneh/getkaranehdates`);
}
