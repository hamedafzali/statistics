import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";
export function getBajeManabehSummary() {
  return http.get(apiUrl + `/baje/bajemanabehsummary`);
}

export function getBajeManabeh(date) {
  return http.get(apiUrl + `/baje/bajemanabeh/${date}`);
}

export function readBajeManabeh(data) {
  return http.post(apiUrl + `/baje/bajemanabehread`, data);
}

export function getBajeManabehDehyariSummary() {
  return http.get(apiUrl + `/baje/bajemanabehdehyarisummary`);
}

export function getBajeManabehDehyari(date) {
  return http.get(apiUrl + `/baje/bajemanabehdehyari/${date}`);
}

export function readBajeManabehDehyari(data) {
  return http.post(apiUrl + `/baje/bajemanabehdehyariread`, data);
}
