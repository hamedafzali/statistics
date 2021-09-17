import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";

export function getRelocateRequest(paydate, nationalcode) {
  return http.get(
    apiUrl + `/persons/getrelocaterequest/${paydate}/${nationalcode}`
  );
}

export function CommitRelocateRequest(id, nationalcode) {
  return http.get(
    apiUrl + `/persons/commitrelocaterequest/${id}/${nationalcode}`
  );
}
