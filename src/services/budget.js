import http from "./httpService";

import { apiUrl } from "../config.json";

export function getBudgetTitle(code) {
  return http.get(apiUrl + `/budget/getbudgettitle/${code}`);
}
export function getBudgetUnits() {
  return http.get(apiUrl + `/budget/getbudgetunits`);
}
export function budgetDocumentInsert(data) {
  //console.log(budgetDocument);
  return http.post(apiUrl + `/budget/budgetDocumentInsert`, data);
}

export function budgetCommit(data) {
  //console.log(budgetDocument);
  return http.post(apiUrl + `/budget/budgetcommit`, data);
}
export function budgetUnCommit(data) {
  //console.log(budgetDocument);
  return http.post(apiUrl + `/budget/budgetuncommit`, data);
}
export function budgetDetailDelete(data) {
  //console.log(data);
  return http.post(apiUrl + `/budget/budgetdetaildelete`, data);
}

export function budgetInsert(data) {
  //console.log(budgetDocument);
  return http.post(apiUrl + `/budget/budgetInsert`, data);
}
export function budgetDocumentDetailInsert(data) {
  return http.post(apiUrl + `/budget/budgetdocumentdetailinsert`, data);
}
export function BudgetGetData() {
  return http.get(apiUrl + `/budget/budgetgetdata`);
}
export function BudgetGetDataWithCode() {
  return http.get(apiUrl + `/budget/budgetgetdatawithcode`);
}
export function BudgetDocumentGetData(nationalcode) {
  return http.get(apiUrl + `/budget/budgetdocumentgetdata/${nationalcode}`);
}
export function BudgetBalanceDocument(unitCode, code) {
  return http.get(apiUrl + `/budget/budgetbalancedocument/${unitCode}/${code}`);
}
export function BudgetSummary(unitCode, code) {
  return http.get(apiUrl + `/budget/budgetsummary`);
}
export function BudgetDocumentGetRow(id) {
  return http.get(apiUrl + `/budget/budgetdocumentgetrow/${id}`);
}

export function BudgetDocumentDetailGetData(pid) {
  return http.get(apiUrl + `/budget/budgetdocumentdetailgetdata/${pid}`);
}

export function BudgetDocumentSummary(pid) {
  return http.get(apiUrl + `/budget/budgetdocumentsummary/${pid}`);
}

export function BudgetBalance(code) {
  return http.get(apiUrl + `/budget/budgetbalance/${code}`);
}

export function BudgetBalanceEblagh(code) {
  return http.get(apiUrl + `/budget/budgetbalanceeblagh/${code}`);
}

export function BudgetBalanceEslahieh(code) {
  return http.get(apiUrl + `/budget/budgetbalanceeslahieh/${code}`);
}

export function budgetRequestInsert(data) {
  return http.post(apiUrl + `/budget/budgetRequestInsert`, data);
}
