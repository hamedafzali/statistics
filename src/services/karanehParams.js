import http from "./httpService";
import { apiUrl } from "../config.json";

export function setKaranehParams(paydate, min, max, ratio, setadhour, safhour) {
  //console.log(paydate, min, max, ratio, setadhour, safhour);
  return http.get(
    apiUrl +
      `/karaneh/setkaranehparams/${paydate}/${min}/${max}/${ratio}/${setadhour}/${safhour}`
  );
}
