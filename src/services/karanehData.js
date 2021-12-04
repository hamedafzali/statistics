import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";

export function getKaranehData(ratio, diff, paydate) {
  return http.get(apiUrl + `/karaneh/karanehdata/${ratio}/${diff}/${paydate}`);
}
export function getKaranehData1(ratio, diff, paydate, val) {
  return http.get(
    apiUrl + `/karaneh/karanehdata1/${ratio}/${diff}/${paydate}/${val}`
  );
}

export function getKaranehAccessList(type, id) {
  return http.get(apiUrl + `/karaneh/karanehaccesslist/${type}/${id}`);
}

export function karanehAccessUpdate(id) {
  return http.get(apiUrl + `/karaneh/karanehaccessupdate/${id}`);
}

export function karanehAccessUpdateAll(type, status) {
  return http.get(apiUrl + `/karaneh/karanehaccessupdateall/${type}/${status}`);
}

export function GetKarnamehPersonTotal(paydate) {
  return http.get(apiUrl + `/karaneh/getkarnamehpersontotal/${paydate}`);
}
export function GetKarnamehBranchTotal(paydate) {
  return http.get(apiUrl + `/karaneh/getkarnamehbranchtotal/${paydate}`);
}
export function GetKarnamehSupervisorTotal(paydate) {
  return http.get(apiUrl + `/karaneh/getkarnamehsupervisortotal/${paydate}`);
}
export function GetKaranehSummary(unitcode) {
  return http.get(apiUrl + `/karaneh/karanehsummary/${unitcode}`);
}
