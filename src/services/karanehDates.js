import http from "./httpService";
import { apiUrl } from "../config.json";

export function getKaranehDates() {
  return http.get(apiUrl + `/karaneh/getkaranehdates`);
}
