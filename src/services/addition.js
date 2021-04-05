import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAddition(paydate) {
  return http.get(apiUrl + `/karaneh/getaddition/${paydate}`);
}
