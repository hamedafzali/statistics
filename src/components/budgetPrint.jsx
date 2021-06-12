import React, { Component } from "react";
import * as htmlToImage from "html-to-image";
import XLSX from "xlsx";
import thousandSeperator from "../utils/thousandSeparator";
import Num2persian from "../utils/num2persian";
//import tinyNumToWord from '../utils/num2persian';
//import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

import {
  BudgetDocumentDetailGetData,
  BudgetDocumentGetData,
  BudgetDocumentSummary,
} from "../services/budget";

class BudgetPrint extends Component {
  state = {
    pageContent: { title: "سرفصل بودجه" },
    BudgetDocumentDetail: [],
    selectedDocumentId: new URLSearchParams(window.location.search).get("id"),
    BudgetSummary: { Sum: 0, SumTotal: 0, SumAll: 0 },
    // data: {
    //   cols: [
    //     { name: "A", key: 0 },
    //     { name: "B", key: 1 },
    //     { name: "C", key: 2 },
    //   ],
    //   data: [
    //     ["id", "name", "value"],
    //     [1, "sheetjs", 7262],
    //     [2, "js-xlsx", 6969],
    //   ],
    // },
  };
  componentDidMount() {
    this.getBudgetDocumentDetail();
    this.getBudgetDocumentSummary();
    // console.log(Num2persian(123));
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
          }}
        >
          <i
            onClick={this.downloadImage}
            className={` btn-outline-success fa fa-fw fa-download`}
            style={{ fontSize: "2em" }}
          />
          <div className="row" id="title">
            بدینوسیله با ابلاغ مبلغ
            {thousandSeperator(this.state.BudgetSummary.Sum)} ریال حکم شماره
            {this.state.BudgetSummary.PId} مورخ {this.state.BudgetSummary.Date}
            به شرح ذیل اصلاح و جمع کل اعتبارات آن مدیریت مبلغ
            {thousandSeperator(this.state.BudgetSummary.SumAll)} ریال تعیین
            میگردد
          </div>
          <div id="my-node">
            {/* <div className="row">
            <div className="col">شماره سند:121321</div>
            <div className="col">مقصد: فارس</div>
          </div>
          <div className="row">
            <div className="col"> مبلغ:22500000</div>
            <div className="col"> توضیحات:سند بودجه</div>
          </div> */}

            {/* {console.log(document.getElementById("my-node"))} */}

            <table className="table table-sm " style={{ fontSize: 12 }}>
              {/* <caption>سند بودجه استان آذر غربی</caption> */}
              <thead className="thead-light">
                <tr key="header">
                  <th scope="col">ردیف</th>
                  {/* <th scope="col">شماره سند</th> */}
                  {/* <th scope="col">کد سرفصل</th> */}
                  <th scope="col">عنوان هزینه</th>
                  <th scope="col">تعداد</th>
                  <th scope="col">شرح </th>
                  <th scope="col">مبلغ(ریال)</th>
                </tr>
              </thead>
              <tbody>
                {this.state.BudgetDocumentDetail.map((i, index) => (
                  <tr key={i.PId}>
                    <td>{index + 1}</td>
                    {/* <td>{i.PId}</td> */}
                    {/* <td>{i.Code}</td> */}
                    <td>{i.Title}</td>
                    <td>{i.Count === 0 ? "-" : i.Count}</td>
                    <td>{i.Description}</td>
                    <td>{thousandSeperator(i.Amount)}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="border border-dark bg-secondary text-light ">
                <tr>
                  <td colSpan="2">جمع:</td>
                  <td colSpan="2">
                    {Num2persian(this.state.BudgetSummary.Sum)} ریال
                  </td>

                  <td>{thousandSeperator(this.state.BudgetSummary.Sum)}</td>
                </tr>
                <tr>
                  <td colSpan="2">جمع اعتبار ابلاغ شده:</td>
                  <td colSpan="2">
                    {Num2persian(this.state.BudgetSummary.SumTotal)} ریال
                  </td>

                  <td>
                    {thousandSeperator(this.state.BudgetSummary.SumTotal)}
                  </td>
                </tr>
                <tr>
                  <td colSpan="2">جمع اعتبار ابلاغ شده تاکنون:</td>
                  <td colSpan="2">
                    {Num2persian(this.state.BudgetSummary.SumAll)} ریال
                  </td>

                  <td>{thousandSeperator(this.state.BudgetSummary.SumAll)}</td>
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
