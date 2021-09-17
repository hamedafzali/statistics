import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";

export function setKaranehParams(paydate, min, max, ratio, setadhour, safhour) {
  //console.log(paydate, min, max, ratio, setadhour, safhour);
  return http.get(
    apiUrl +
      `/karaneh/setkaranehparams/${paydate}/${min}/${max}/${ratio}/${setadhour}/${safhour}`
  );
}
