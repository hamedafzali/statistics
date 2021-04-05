import http from "./httpService";
import { apiUrl } from "../config.json";

export function getKarnamehO(paydate) {
  return http.get(apiUrl + `/karaneh/getkarnameho/${paydate}`);
}
export function getKarnamehSH(paydate) {
  return http.get(apiUrl + `/karaneh/getkarnamehsh/${paydate}`);
}
