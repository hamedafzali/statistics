import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";

export function getSupervisorsRank(ratio, paydate) {
  return http.get(apiUrl + `/karaneh/getsupervisorsrank/${ratio}/${paydate}`);
}
