import http from "./httpService";
import { apiUrl } from "../config.json";

// export function changePassword(nationalCode, oldPassword, newPassword) {
//   //console.log("personlocationsetstatus", nationalcode);
//   return http.get(
//     apiUrl +
//       `/auth/changepassword/${nationalCode}/${oldPassword}/${newPassword}`
//   );
// }

export function changePassword(nationalCode, oldPassword, newPassword) {
  //console.log("personlocationsetstatus", nationalcode);
  return http.post(apiUrl + `/auth/changepassword`, {
    nationalcode: nationalCode,
    oldpassword: oldPassword,
    newpassword: newPassword,
  });
}
// export function resetPassword(nationalCode, newPassword) {
//   //console.log("personlocationsetstatus", nationalcode);
//   return http.get(
//     apiUrl + `/auth/resetpassword/${nationalCode}/${newPassword}`
//   );
// }

export function resetPassword(nationalCode, newPassword) {
  return http.post(apiUrl + `/auth/resetpassword`, {
    nationalcode: nationalCode,
    newpassword: newPassword,
  });
}
