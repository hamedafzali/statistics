import http from "./httpService";
//import { apiUrl } from "../config.json";
import { api as apiUrl } from "./apiUrl";

function getAccessControl(groupid, link) {
  return http.get(apiUrl + `/auth/accesscontrol/${groupid}/${link}`);
}

export async function accessControl(groupid, link) {
  const { data } = await getAccessControl(groupid, link);
  //console.log(link, data.length);
  let res;
  if (data.length === 0) {
    res = false;
  } else {
    res = true;
  }
  //console.log(res);
  return res;
}
