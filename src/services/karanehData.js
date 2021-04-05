import http from "./httpService";
import { apiUrl } from "../config.json";

export function getKaranehData(ratio, diff, paydate) {
  return http.get(apiUrl + `/karaneh/karanehdata/${ratio}/${diff}/${paydate}`);
}
export function getKaranehData1(ratio, diff, paydate, val) {
  return http.get(
    apiUrl + `/karaneh/karanehdata1/${ratio}/${diff}/${paydate}/${val}`
  );
}

export function getKaranehAccessList(type) {
  return http.get(apiUrl + `/karaneh/karanehaccesslist/${type}`);
}

export function karanehAccessUpdate(id) {
  return http.get(apiUrl + `/karaneh/karanehaccessupdate/${id}`);
}

export function karanehAccessUpdateAll(type, status) {
  return http.get(apiUrl + `/karaneh/karanehaccessupdateall/${type}/${status}`);
}