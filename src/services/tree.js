import http from "./httpService";
import { apiUrl } from "../config.json";

export function ChartPerson(chartid) {
  //console.log("personlocationsetstatus", nationalcode);
  return http.get(apiUrl + `/persons/chartPerson/${chartid}`);
}
export function Chart(chartid) {
  //console.log("personlocationsetstatus", nationalcode);
  return http.get(apiUrl + `/persons/chart/${chartid}`);
}
