import http from "./httpService";
import { apiUrl } from "../config.json";

export function personLocationSetStatus(
  nationalcode,
  description,
  sourceid,
  registrar,
  paydate
) {
  return http.get(
    apiUrl +
      `/persons/personlocationsetstatus/${nationalcode}/${description}/${sourceid}/${registrar}/${paydate}`
  );
}

export function PostTypeGetallData() {
  return http.get(apiUrl + `/persons/posttypegetalldata`);
}

export function getPersonReport(nationalcode) {
  return http.get(apiUrl + `/persons/getpersons/${nationalcode}`);
}

export function getPersondata(nationalcode) {
  return http.get(apiUrl + `/persons/getpersondata/${nationalcode}`);
}

export function PersonAdditionInsert(
  nationalcode,
  addedhours,
  addedamount,
  paydate,
  additiontypeid
) {
  return http.get(
    apiUrl +
      `/persons/personadditioninsert/${nationalcode}/${addedhours}/${addedamount}/${paydate}/${additiontypeid}`
  );
}
export function PersonAdditiongetAllData(paydate, additiontypeid) {
  return http.get(
    apiUrl + `/persons/personadditiongetalldata/${paydate}/${additiontypeid}`
  );
}
export function EmploymentTypeGetAllData() {
  return http.get(apiUrl + `/persons/employmenttypegetalldata`);
}
export function PostTypeGetAllData() {
  return http.get(apiUrl + `/persons/employmenttypegetalldata`);
}
export function UpdatePersons(nationalcode, status, posttypeid, vajed) {
  return http.get(
    apiUrl +
      `/persons/updatepersons/${nationalcode}/${status}/${posttypeid}/${vajed}`
  );
}
export function personsList() {
  return http.get(apiUrl + `/persons/personslist`);
}
