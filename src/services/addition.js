import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";
export function getAddition(paydate) {
  return http.get(apiUrl + `/karaneh/getaddition/${paydate}`);
}
