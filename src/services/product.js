import http from "./httpService";
import { apiUrl } from "../config.json";

export function GetProductTitle(id) {
  return http.get(apiUrl + `/product/getproducttitle/${id}`);
}

export function GetProductPercent(id) {
  return http.get(apiUrl + `/product/getproductpercent/${id}`);
}

export function GetPersonsProduct(managerNationalCode, paydate, productid) {
  return http.get(
    apiUrl +
      `/product/getpersonsproduct/${managerNationalCode}/${paydate}/${productid}`
  );
}
export function productInsert(
  nationalCode,
  A50,
  A30,
  A20,
  paydate,
  registrar,
  productid
) {
  return http.get(
    apiUrl +
      `/product/productinsert/${nationalCode}/${A50}/${A30}/${A20}/${paydate}/${registrar}/${productid}`
  );
}
export function getPersonsProductRemain(nationalCode, paydate, producttypeid) {
  return http.get(
    apiUrl +
      `/product/getpersonsproductremain/${nationalCode}/${paydate}/${producttypeid}`
  );
}