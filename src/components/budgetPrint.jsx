import React, { Component } from "react";
import * as htmlToImage from "html-to-image";
import XLSX from "xlsx";
import thousandSeperator from "../utils/thousandSeparator";
import Num2persian, { toFarsiNumber } from "../utils/num2persian";

import {
  BudgetDocumentDetailGetData,
  BudgetDocumentSummary,
} from "../services/budget";

class BudgetPrint extends Component {
  state = {
    pageContent: { title: "سرفصل بودجه" },
    BudgetDocumentDetail: [],
    selectedDocumentId: new URLSearchParams(window.location.search).get("id"),
    BudgetSummary: { Sum: 0, SumTotal: 0, SumAll: 0 },
  };
  componentDidMount() {
    this.getBudgetDocumentDetail();
    this.getBudgetDocumentSummary();
  }
  getBudgetDocumentSummary = async () => {
    const { data: BudgetSummary } = await BudgetDocumentSummary(
      this.state.selectedDocumentId
    );
    this.setState({ BudgetSummary });
  };

  getBudgetDocumentDetail = async () => {
    const { data: BudgetDocumentDetail } = await BudgetDocumentDetailGetData(
      this.state.selectedDocumentId
    );
    this.setState({ BudgetDocumentDetail });
  };
  downloadImage = async () => {
    htmlToImage
      .toPng(document.getElementById("my-node"), { quality: 0.95 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${document.getElementById("title").innerText}.png`;
        link.href = dataUrl;
        link.click();
      });
  };
  downloadxlsx = async () => {
    // /* convert from workbook to array of arrays */
    // var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    // var data = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });

    /* convert from array of arrays to workbook */
    var worksheet = XLSX.utils.aoa_to_sheet(this.state.data);
    var new_workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(new_workbook, worksheet, "SheetJS");
    var link = document.createElement("a");
    link.download = `سند بودجه.xlsx`;
    link.href = new_workbook;
    link.click();
  };
  render() {
    return (
      <React.Fragment>
        {/* <i
          onClick={this.downloadxlsx}
          className={` btn-outline-success fa fa-fw fa-file-excel-o`}
          style={{ fontSize: "2em" }}
        /> */}
        <div
          className="bg-white"
          style={{
            width: "700px",
            fontFamily: "B Nazanin",
            padding: "2rem",
          }}
        >
          <i
            onClick={this.downloadImage}
            className={` btn-outline-success fa fa-fw fa-download`}
            style={{ fontSize: "2rem" }}
          />
          <div className="row text-right m-2" id="title">
            بدینوسیله با ابلاغ مبلغ
            {toFarsiNumber(thousandSeperator(this.state.BudgetSummary.Sum))}
            ریال حکم شماره
            {toFarsiNumber(this.state.BudgetSummary.PId)} مورخ{" "}
            {toFarsiNumber(this.state.BudgetSummary.Date)}
            به شرح ذیل اصلاح و جمع کل اعتبارات آن مدیریت مبلغ
            {toFarsiNumber(
              thousandSeperator(this.state.BudgetSummary.SumAll)
            )}{" "}
            ریال تعیین میگردد
          </div>
          <div id="my-node">
            <table
              className="table table-sm table-bordered"
              style={{ fontSize: "0.7rem", fontWeight: 600 }}
            >
              <thead className="thead-light">
                <tr key="header">
                  <th scope="col">ردیف</th>
                  <th scope="col">عنوان هزینه</th>
                  <th scope="col">تعداد</th>
                  <th scope="col">شرح </th>
                  <th scope="col">مبلغ(ریال)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.BudgetDocumentDetail.map((i, index) => (
                  <tr key={i.PId}>
                    <td>{toFarsiNumber(index + 1)}</td>
                    <td>{toFarsiNumber(i.Title)}</td>
                    <td>{i.Count === 0 ? "-" : toFarsiNumber(i.Count)}</td>
                    <td>{toFarsiNumber(i.Description)}</td>
                    <td>{toFarsiNumber(thousandSeperator(i.Amount))}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border border-dark bg-secondary text-light ">
                <tr>
                  <td colSpan="2">جمع:</td>
                  <td colSpan="2">
                    {Num2persian(this.state.BudgetSummary.Sum)} ریال
                  </td>

                  <td>
                    {toFarsiNumber(
                      thousandSeperator(this.state.BudgetSummary.Sum)
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">جمع اعتبار ابلاغ شده:</td>
                  <td colSpan="2">
                    {Num2persian(this.state.BudgetSummary.SumTotal)} ریال
                  </td>

                  <td>
                    {toFarsiNumber(
                      thousandSeperator(this.state.BudgetSummary.SumTotal)
                    )}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">جمع اعتبار ابلاغ شده تاکنون:</td>
                  <td colSpan="2">
                    {Num2persian(this.state.BudgetSummary.SumAll)} ریال
                  </td>

                  <td>
                    {toFarsiNumber(
                      thousandSeperator(this.state.BudgetSummary.SumAll)
                    )}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BudgetPrint;
