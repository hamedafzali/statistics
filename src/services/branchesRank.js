import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";
export function getBranchesRank(ratio, paydate) {
  return http.get(apiUrl + `/karaneh/getbranchesrank/${ratio}/${paydate}`);
}
