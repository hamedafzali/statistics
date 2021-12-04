import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";
export function getKarnamehO(paydate) {
  return http.get(apiUrl + `/karaneh/getkarnameho/${paydate}`);
}
export function getKarnamehSH(paydate) {
  return http.get(apiUrl + `/karaneh/getkarnamehsh/${paydate}`);
}

export function getKarnamehSummary() {
  return http.get(apiUrl + `/karaneh/karnamehsummary`);
}

export function getKarnameh(date) {
  //return http.get(apiUrl + `/baje/bajemanabeh/${date}`);
}

export function readKarnameh(data) {
  return http.post(apiUrl + `/karaneh/karnamehread`, data);
}

export function getBranchAdditionSummary() {
  return http.get(apiUrl + `/karaneh/branchadditionsummary`);
}

export function getBranchAddition(date) {
  //return http.get(apiUrl + `/baje/bajemanabeh/${date}`);
}

export function readBranchAddition(data) {
  return http.post(apiUrl + `/karaneh/branchadditionread`, data);
}
