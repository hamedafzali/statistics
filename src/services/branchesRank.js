import http from "./httpService";
import { apiUrl } from "../config.json";

export function getBranchesRank(ratio, paydate) {
  return http.get(apiUrl + `/karaneh/getbranchesrank/${ratio}/${paydate}`);
}
