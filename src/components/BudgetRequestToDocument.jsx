import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import moment from "jalali-moment";
import {
  BudgetRDocumentDetailGetData,
  BudgetRDocumentGetRow,
  budgetDocumentInsert,
  budgetDocumentDetailInsert,
} from "../services/budget";
import SelectSearchable from "./common/selectSearchable";
import { BudgetGetDataWithCode } from "../services/budget";
import Select from "./common/select";
import Input from "./common/input";
import thousandSeperator from "../utils/thousandSeparator";
import { fileURL, list } from "../services/files";
//import QRCode from "react-qr-code";
import QRCode from "qrcode.react";
import logo from "../assets/images/Logo Amar without.jpg";
class BudgetRequestToDocument extends Component {
  state = {
    pageContent: { title: "صدور سند" },
    selectedRequestId: new URLSearchParams(window.location.search).get("Id"),
    BudgetRDocumentDetail: [],
    selectedDocumentData: [],
    files: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    //this.handleBudgetUnits();
    this.handleBudgetDocumentGetRow();
    this.getBudgetRDocumentDetail();
    this.getBudgetGetData();
  }
  getFile = (folder, file) => {
    return fileURL(folder, file);
  };
  handleChange = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
  };
  handleBudgetDocumentGetRow = async () => {
    const { data } = await BudgetRDocumentGetRow(this.state.selectedRequestId);
    const newState = { ...this.state };
    newState.selectedDocumentData = data;
    this.setState(newState, () => this.getList());
  };
  getList = async () => {
    if (this.state.selectedDocumentData.length) {
      const { data: files } = await list(
        `/budget${this.state.selectedDocumentData[0].Id}`
      );
      this.setState({ files });
    }
  };
  getBudgetGetData = async () => {
    const { data: BudgetData } = await BudgetGetDataWithCode();
    this.setState({ BudgetData });
  };
  getBudgetRDocumentDetail = async () => {
    const { data: BudgetRDocumentDetail } = await BudgetRDocumentDetailGetData(
      this.state.selectedRequestId
    );
    this.setState({ BudgetRDocumentDetail });
  };
  handleSelectChange = (row, i) => {
    // console.log(
    //   "BudgetRDocumentDetailOld",
    //   this.state.BudgetRDocumentDetail,
    //   i,
    //   row
    // );
    let oldBudgetRDocumentDetail = this.state.BudgetRDocumentDetail.map((r) => {
      if (r === i) {
        r.Code = row.value;
        r.Title = row.label;
        return r;
      } else return r;
    });

    this.setState({ BudgetRDocumentDetail: oldBudgetRDocumentDetail });
  };
  registerDocument() {
    //console.log(this.state.BudgetRDocumentDetail.filter((i) => i.Code !== "0"));
    this.handleBudgetDocument();
  }
  handleBudgetDocument = async () => {
    if (!this.state.documentTypeId) {
      this.showMessage("نوع سند انتخاب نشده است", "error");
      return false;
    } else if (!this.state.documentTitle) {
      this.showMessage("عنوان سند را وارد کنید", "error");
      return false;
    }

    const { data } = await budgetDocumentInsert({
      date: moment().locale("fa").format("YYYY/MM/DD"),
      documentTypeId: this.state.documentTypeId,
      documentTitle: `درخواست شماره:${this.state.selectedDocumentData[0].Id}-${this.state.documentTitle}`,
      destinationCode: this.state.selectedDocumentData[0].UnitCode,
      unitCode: this.props.employee.BranchCode,
      registrar: this.props.employee.NationalCode,
      status: 0,
    });
    console.log(data);
    if (!data) {
      this.showMessage("نوع سند انتخاب نشده است", "error");
      return false;
    } else {
      this.showMessage("سند ثبت شد", "success");
      this.state.BudgetRDocumentDetail.map((i) => {
        console.log(i);
        if (i.Code !== "0") {
          this.handleBudgetDocumentDetail(i, data.Id);
        }
      });
    }
  };
  handleBudgetDocumentDetail = async (row, id) => {
    const { Amount, Code, Count, Description, Title } = row;
    // if (Amount < 1) {
    //   this.showMessage("مبلغ صفر یا منفی نمیتواند باشد", "error");
    //   return false;
    // } else if (
    //   budgetTitle === "سرفصل وارد شده صحیح نمیباشد" ||
    //   accountCode.length === 0
    // ) {
    //   this.showMessage("سرفصل وارد شده صحیح نمیباشد", "error");
    //   return false;
    // } else if (this.state.destinationCode === 0) {
    //   this.showMessage("واحد مقصد انتخاب نشده است", "error");
    //   return false;
    // } else if (this.state.balance - thousandSeperator(Amount, -1) <= 0) {
    //   this.showMessage("مانده کافی نمیباشد", "error");
    //   return false;
    // }
    const { data } = await budgetDocumentDetailInsert({
      id: 0,
      pid: id,
      title: Title,
      code: Code,
      amount: thousandSeperator(Amount, -1),
      description: Description,
      count: Count ? thousandSeperator(Count, -1) : 0,
    });
    
  };
  showMessage = (msg, type) => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  render() {
    return (
      <main className="d-flex align-items-center  py-md-0  ">
        <div className="container ">
          <div className="card login-card ">
            <div className="row no-gutters mb-5">
              <div className="col-md">
                <div className="card-title btn-secondary">
                  <h4>{this.state.pageContent.title}</h4>
                </div>
                <div
                  className="card-body"
                  style={{ minHeight: this.state.height }}
                >
                  <div className="row p-3">
                    <div className="col-md-12 col-lg-4 bg-light rounded border">
                      <div className="row">
                        <div className="col">عنوان درخواست</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].Title
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">تاریخ ثبت</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].Date
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">شماره درخواست</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].Id
                            : ""}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col">کد درخواست دهنده</div>
                        <div className="col">
                          {this.state.selectedDocumentData.length
                            ? this.state.selectedDocumentData[0].UnitCode
                            : ""}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4  bg-light rounded border">
                      <div>
                        <div>شماره پیگیری</div>

                        <div>
                          {this.state.selectedDocumentData.length ? (
                            <>
                              {this.state.selectedDocumentData[0].GUID}
                              <QRCode
                                value={`http://amar.postbank.ir/i?${this.state.selectedDocumentData[0].GUID}`}
                                size={120}
                                imageSettings={{
                                  src: logo,
                                  excavate: true,
                                  height: 20,
                                  width: 20,
                                }}
                              />
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12 col-lg-4 border  rounded">
                      <div className=" btn-block btn-secondary text-light">
                        ضمایم
                      </div>
                      <div
                        style={{
                          overflow: "scroll",
                          height: "10rem",
                          width: "100%",
                          textAlign: "right",
                        }}
                      >
                        {this.state.files &&
                          this.state.files.map((i, index) => (
                            <div
                              className=""
                              style={{
                                display: "flex",
                                width: "95%",
                                backgroundColor: "#f8f9fa",
                                margin: 1,
                                border: "1px solid silver",
                                borderRadius: "0.2rem",
                                padding: "0.2rem",
                              }}
                            >
                              <div>{`فایل شماره ${index + 1}:`}</div>
                              <div>
                                <a
                                  className="m-3 "
                                  href={
                                    this.state.selectedDocumentData.length
                                      ? this.getFile(
                                          `budget${this.state.selectedDocumentData[0].Id}`,
                                          i
                                        )
                                      : ""
                                  }
                                  download
                                >
                                  {i}
                                </a>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="border p-2 rounded my-1">
                    <div className="row">
                      <div className="col-md-12 col-xl-4">
                        <Select
                          onChange={this.handleChange}
                          name="documentTypeId"
                          label="نوع درخواست"
                          error=""
                          options={[
                            { id: 1, name: "جاری" },
                            {
                              id: 2,
                              name: "سرمایه ای",
                            },
                          ]}
                        />
                      </div>
                      <div className="col-md-12 col-xl-8">
                        <Input
                          type="text"
                          name="documentTitle"
                          id="documentTitle"
                          label="توضیحات "
                          error=""
                          title={this.props.employee.BranchCode}
                          maxLength={500}
                          placeholder=""
                          value={this.state.documentTitle}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    {/* <div
                      className="btn btn-success btn-block p-3 mb-2"
                      onClick={() => this.handleBudgetDocument()}
                    >
                      ایجاد سند
                    </div> */}
                  </div>
                  <div className="border p-2 rounded ">
                    <table className="table table-striped ">
                      <thead className="thead-dark">
                        <tr key="header">
                          <th scope="col">شماره درخواست</th>
                          <th scope="col">کد سرفصل</th>
                          <th scope="col">مبلغ</th>
                          <th scope="col">شرح سند</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.BudgetRDocumentDetail &&
                          this.state.BudgetRDocumentDetail.map((i) => (
                            <tr key={i.PId}>
                              <td>{i.PId}</td>
                              <td width="40%">
                                <SelectSearchable
                                  name="accountCode"
                                  data={this.state.BudgetData}
                                  onChange={(e) =>
                                    this.handleSelectChange(e, i)
                                  }
                                  selectedValue={
                                    this.state.BudgetRDocumentDetail.filter(
                                      (r) => r.Code === i.Code
                                    ).Code
                                  }
                                />
                              </td>
                              <td>{i.Amount}</td>
                              <td>{i.Description}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div
                      className="btn btn-success btn-block p-3"
                      onClick={() => this.registerDocument()}
                    >
                      ثبت سند
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer className="text-center" />
      </main>
    );
  }
}

export default BudgetRequestToDocument;
