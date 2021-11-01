import http from "./httpService";
//import { apiUrl } from "../config.json";
import apiUrl from "./apiUrl";
export function upload(folder, data) {
  //console.log(apiUrl + `/files${folder}`);
  return http.post(apiUrl + `/files${folder}`, data);
}
export function list(folder) {
  //console.log(apiUrl + `/files${folder}`);
  return http.get(apiUrl + `/files${folder}`);
}
export function fileURL(folder, file) {
  return `${apiUrl}/files/${folder}/${file}`;
}
