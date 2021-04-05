import http from "./httpService";
import { apiUrl } from "../config.json";

export function changePassword(nationalCode, oldPassword, newPassword) {
  //console.log("personlocationsetstatus", nationalcode);
  return http.get(
    apiUrl +
      `/auth/changepassword/${nationalCode}/${oldPassword}/${newPassword}`
  );
}

export function resetPassword(nationalCode, newPassword) {
  //console.log("personlocationsetstatus", nationalcode);
  return http.get(
    apiUrl + `/auth/resetpassword/${nationalCode}/${newPassword}`
  );
}
