import http from "./httpService";
import { apiUrl } from "../config.json";

export function getPersonsKaraneh(managerNationalCode, paydate) {
  return http.get(
    apiUrl + `/karaneh/getpersonskaraneh/${managerNationalCode}/${paydate}`
  );
}

export function getPersonelKaraneh(paydate, ratiosaf, ratiosetad, ratio) {
  return http.get(
    apiUrl +
      `/karaneh/getpersonelkaraneh/${paydate}/${ratiosaf}/${ratiosetad}/${ratio}`
  );
}

export function karanehInsert(nationalCode, A50, A30, A20, paydate, registrar) {
  return http.get(
    apiUrl +
      `/karaneh/karanehinsert/${nationalCode}/${A50}/${A30}/${A20}/${paydate}/${registrar}`
  );
}
export function getPersonsKaranehRemain(nationalCode, paydate) {
  return http.get(
    apiUrl + `/karaneh/getpersonskaranehremain/${nationalCode}/${paydate}`
  );
}
export function karanehAccress(nationalCode, karanehaccesstype) {
  return http.get(
    apiUrl + `/auth/karanehaccress/${nationalCode}/${karanehaccesstype}`
  );
}
export function getManagersList(paydate) {
  return http.get(apiUrl + `/persons/getmanagerslist/${paydate}`);
}

export function ManagersKaranehInsert(nationalCode, paydate, amount) {
  return http.get(
    apiUrl +
      `/karaneh/managerskaranehinsert/${nationalCode}/${paydate}/${amount}`
  );
}
