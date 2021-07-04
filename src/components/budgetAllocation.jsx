import React, { Component } from "react";
import moment from "jalali-moment";
import {
  getBudgetTitle,
  getBudgetUnits,
  budgetDocumentInsert,
  BudgetDocumentGetData,
  BudgetDocumentGetRow,
  budgetDocumentDetailInsert,
  BudgetDocumentDetailGetData,
  budgetCommit,
  budgetDetailDelete,
  BudgetGetData,
} from "../services/budget";

import Select from "./common/select";
import Input from "./common/input";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import thousandSeperator from "../utils/thousandSeparator";
import SelectSearchable from "./common/selectSearchable";
class BudgetAllocation extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "ابلاغ بودجه" },
    budgetTitle: "",
    accountCode: "",
    budgetUnits: [],
    documentId: 1,
    collapse: 1,
    documentTypeId: 0,
    unitId: 0,
    documentTitle: "",
    BudgetDocuments: [],
    BudgetDocumentDetail: [],
    selectedDocumentData: [],
    selectedDocumentId: 0,
    selectedId: 0,
    newDocument: false,
    description: "",
    count: 0,
    BudgetData: [],
    selectedOption: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.handleBudgetUnits();
    this.getBudgetDocuments();
    this.getBudgetGetData();
  }
  handleCommit = async (id) => {
    const { data } = await budgetCommit({
      id,
      nationalcode: this.props.employee.NationalCode,
    });
    if (!data) {
      this.showMessage("خطا در تایید", "error");
    } else {
      this.showMessage("تایید انجام شد", "success");
      this.getBudgetDocuments();
    }
  };
  handleBudgetDetailDelete = async (id) => {
    const { data } = await budgetDetailDelete({
      id,
      nationalcode: this.props.employee.NationalCode,
    });
    if (!data) {
      this.showMessage("خطا در حذف", "error");
    } else {
      this.showMessage("حذف انجام شد", "success");
      this.getBudgetDocumentDetail();
    }
  };
  handleCollapse = (id) => {
    if (id === 1) {
      this.setState({
        newDocument: false,
        selectedDocumentId: 0,
        collapse: id,
      });
      this.getBudgetDocuments();
    } else if (id === 2) {
      if (!this.state.newDocument) {
        this.showMessage("ایجاد سند از مرحله اول قابل انجام است", "error");
        id = 1;
      }
      this.setState({
        collapse: id,
      });
    } else if (id === 3) {
      if (id === 3 && this.state.selectedDocumentId) {
        this.handleBudgetDocumentGetRow();
        this.getBudgetDocumentDetail();
      } else if (id === 3 && !this.state.selectedDocumentId) {
        this.showMessage("هیچ سندی ایجاد یا انتخاب نشده است", "error");
        id = 1;
      }
      this.setState({
        collapse: id,
      });
    } else if (id === 4) {
      this.getBudgetDocuments();
      this.setState({
        collapse: id,
      });
    }
  };
  getBudgetDocuments = async () => {
    const { data: BudgetDocuments } = await BudgetDocumentGetData(
      this.props.employee.NationalCode
    );
    this.setState({ BudgetDocuments });
  };
  getBudgetGetData = async () => {
    const { data: BudgetData } = await BudgetGetData();
    this.setState({ BudgetData });
  };
  getBudgetDocumentDetail = async () => {
    const { data: BudgetDocumentDetail } = await BudgetDocumentDetailGetData(
      this.state.selectedDocumentId
    );
    this.setState({ BudgetDocumentDetail }, () => console.log(this.state));
  };

  handleChange = (e) => {
    console.log(e);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
    console.log(this.state);
  };
  handleSelectChange = (row) => {
    //console.log(row);
    const newState = { ...this.state };
    newState.budgetTitle = row.Title;
    newState.accountCode = row.Code;
    newState.selectedOption = row;
    this.setState(newState);
  };
  handleBudgetDocument = async () => {
    if (this.state.documentTypeId === 0) {
      this.showMessage("نوع سند انتخاب نشده است", "error");
      return false;
    } else if (this.state.documentTitle.length === 0) {
      this.showMessage("عنوان سند را وارد کنید", "error");
      return false;
    } else if (this.state.destinationCode === 0) {
      this.showMessage("واحد مقصد انتخاب نشده است", "error");
      return false;
    }
    const { data } = await budgetDocumentInsert({
      date: moment().locale("fa").format("YYYY/MM/DD"),
      documentTypeId: this.state.documentTypeId,
      documentTitle: this.state.documentTitle,
      destinationCode: this.state.destinationCode,
      unitCode: this.props.employee.BranchCode,
      registrar: this.props.employee.NationalCode,
    });
    //console.log(data);
    if (!data) {
      this.showMessage("نوع سند انتخاب نشده است", "error");
      return false;
    } else {
      this.showMessage("سند ثبت شد", "success");
      this.setState(
        {
          selectedDocumentId: data.Id,
        },
        () => this.handleCollapse(3)
      );
    }
  };
  handleBudgetDocumentGetRow = async () => {
    const { data } = await BudgetDocumentGetRow(this.state.selectedDocumentId);
    const newState = { ...this.state };
    newState.selectedDocumentData = data;
    this.setState(newState);
    console.log(data);
  };
  handleBudgetUnits = async () => {
    const { data } = await getBudgetUnits();

    const newState = { ...this.state };
    newState.budgetUnits = data;
    this.setState(newState);
  };
  handleBudgetDocumentDetail = async () => {
    const {
      amount,
      description,
      selectedDocumentId,
      budgetTitle,
      accountCode,
      count,
      selectedId,
    } = this.state;
    if (amount < 1) {
      this.showMessage("مبلغ صفر یا منفی نمیتواند باشد", "error");
      return false;
    } else if (
      budgetTitle === "سرفصل وارد شده صحیح نمیباشد" ||
      accountCode.length === 0
    ) {
      this.showMessage("سرفصل وارد شده صحیح نمیباشد", "error");
      return false;
    } else if (this.state.destinationCode === 0) {
      this.showMessage("واحد مقصد انتخاب نشده است", "error");
      return false;
    }
    await budgetDocumentDetailInsert({
      id: selectedId,
      pid: selectedDocumentId,
      title: budgetTitle,
      code: accountCode,
      amount: thousandSeperator(amount, -1),
      description,
      count: thousandSeperator(count, -1),
    });
    this.getBudgetDocumentDetail(selectedDocumentId);
    this.setState({
      amount: 0,
      description: "",
      accountCode: "",
      budgetTitle: "",
      count: 0,
      selectedId: 0,
    });
  };
  handleBudgetTitle = async () => {
    // if (this.state.accountCode.length !== 11) {
    //   this.showMessage("فرمت سرفصل صحیح نمی باشد", "error");
    //   return false;
    // }
    const { data } = await getBudgetTitle(this.state.accountCode);

    const newState = { ...this.state };
    data
      ? (newState.budgetTitle = data.Title)
      : (newState.budgetTitle = "سرفصل وارد شده صحیح نمیباشد");

    this.setState(newState);
  };
  handleAccountCode = (e) => {
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    // .split(".")
    // .join("")
    // .match(/.{1,2}/g)
    // .join(".");
    this.setState(newState);
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
  numberWithCommas = (x) => {
    var nf = new Intl.NumberFormat();
    return nf.format(x) === "NaN" ? 0 : nf.format(x);
  };
  render() {
    // const configs = {
    //   animate: true,
    //   // focusOutline: false,
    //   clickDismiss: false,
    //   escapeDismiss: false,
    // };
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const colsize = 3;
    // this.props.employee.GroupId === 1 || this.props.employee.GroupId === 11
    //   ? 3
    //   : 4;
    return (
      <main className="d-flex align-items-center  py-md-0  ">
        <ToastContainer className="text-center" />
        <div className="container ">
          <div className="card login-card ">
            <div className="row no-gutters">
              <div className="col-md">
                <div className="card-title btn-secondary">
                  <h4>{this.state.pageContent.title}</h4>
                </div>
                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <div className="brand-wrapper ">
                    <div id="accordion border">
                      <div className="row">
                        <div
                          style={{ borderRadius: 20, zIndex: 1 }}
                          id="headingOne"
                          className={
                            this.state.collapse === 1
                              ? `col-lg-${colsize} col-md-12 mt-1 card-header shadow p-3 mt-1  bg-success text-light`
                              : `col-lg-${colsize} col-md-12  card-header p-3 mt-1  bg-light btn-block border`
                          }
                          //data-toggle="collapse"
                          //data-target="#collapseOne"
                          //aria-expanded="true"
                          aria-controls="collapseOne"
                          onClick={() => this.handleCollapse(1)}
                        >
                          <h3
                            className={
                              this.state.collapse === 1
                                ? "btn btn-block mb-0  text-light"
                                : "btn btn-block mb-0 text dark"
                            }
                          >
                            مرحله اول - نوع سند
                          </h3>
                        </div>
                        <div
                          style={{ borderRadius: 20, zIndex: 1 }}
                          id="headingTwo"
                          className={
                            this.state.collapse === 2
                              ? `col-lg-${colsize} col-md-12  mt-1 card-header shadow p-3 mt-1  bg-success text-light`
                              : `col-lg-${colsize} col-md-12  card-header p-3 mt-1  bg-light btn-block border`
                          }
                          //data-toggle="collapse"
                          //data-target="#collapseOne"
                          //aria-expanded="true"
                          aria-controls="collapseTwo"
                          onClick={() => this.handleCollapse(2)}
                        >
                          <h3
                            className={
                              this.state.collapse === 2
                                ? "btn btn-block mb-0  text-light"
                                : "btn btn-block mb-0 text dark"
                            }
                          >
                            مرحله دوم - ایجاد سند
                          </h3>
                        </div>

                        <div
                          id="headingThree"
                          style={{ borderRadius: 20, zIndex: 1 }}
                          className={
                            this.state.collapse === 3
                              ? `col-lg-${colsize} col-md-12  mt-1 card-header shadow p-3 mt-1  bg-success text-light`
                              : `col-lg-${colsize} col-md-12  card-header p-3 mt-1  bg-light btn-block border`
                          }
                          //data-toggle="collapse"
                          //data-target="#collapseTwo"
                          //aria-expanded="true"
                          aria-controls="collapseThree"
                          onClick={() => this.handleCollapse(3)}
                        >
                          <h3
                            className={
                              this.state.collapse === 3
                                ? "btn btn-block mb-0  text-light"
                                : "btn btn-block mb-0 text dark"
                            }
                          >
                            مرحله سوم - ثبت سند
                          </h3>
                        </div>

                        <div
                          style={{ borderRadius: 20, zIndex: 1 }}
                          id="headingFour"
                          className={
                            this.state.collapse === 4
                              ? "col-lg-3 col-md-12 mt-1 card-header shadow p-3 mt-1  bg-success text-light"
                              : "col-lg-3 col-md-12 card-header p-3 mt-1 bg-light btn-block border"
                          }
                          //data-toggle="collapse"
                          //data-target="#collapseThree"
                          //aria-expanded="true"
                          aria-controls="collapseFour"
                          onClick={() => this.handleCollapse(4)}
                        >
                          <h3
                            className={
                              this.state.collapse === 4
                                ? "btn btn-block mb-0 text-light"
                                : "btn btn-block mb-0 text dark"
                            }
                          >
                            مرحله چهارم -تایید نهایی
                          </h3>
                        </div>
                      </div>
                      <div
                        className="card border-0"
                        style={{ borderRadius: 20 }}
                      >
                        <div
                          id="collapseOne"
                          className={
                            this.state.collapse === 1
                              ? "collapse show"
                              : "collapse "
                          }
                          aria-labelledby="headingOne"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <div id="accordionNew">
                              <div class="card">
                                <div
                                  class="card-header btn"
                                  id="headingNew"
                                  data-toggle="collapse"
                                  data-target="#collapseNew"
                                  //aria-expanded="false"
                                  aria-controls="collapseNew"
                                >
                                  <h5 class="mb-0">سند جدید</h5>
                                </div>

                                <div
                                  id="collapseNew"
                                  class="collapse show"
                                  aria-labelledby="headingNew"
                                  data-parent="#accordionNew"
                                >
                                  <div class="card-body">
                                    درصورتی که هنوز سندی ایجاد نکرده اید در این
                                    بخش باید با ایجاد سند جدید طبق مراحل نسبت با
                                    تخصیص اقدام فرمایید
                                    <div
                                      className="d-inline  btn btn-outline-danger btn-md m2"
                                      onClick={() => {
                                        this.setState(
                                          { newDocument: true },
                                          () => this.handleCollapse(2)
                                        );
                                      }}
                                    >
                                      ایجاد سند
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div class="card">
                                <div
                                  class="card-header btn"
                                  id="headingOld"
                                  data-toggle="collapse"
                                  data-target="#collapseOld"
                                  //aria-expanded="false"
                                  aria-controls="collapseOld"
                                >
                                  <h5 class="mb-0">اسناد تایید نشده</h5>
                                </div>
                                <div
                                  id="collapseOld"
                                  class="collapse"
                                  aria-labelledby="headingOld"
                                  data-parent="#accordionNew"
                                >
                                  <div class="card-body">
                                    درصورتی که سندی ایجاد کرده اید و هنوز تایید
                                    نهایی نکرده اید میتوانید با انتخاب سند از
                                    لیست زیر نسبت به ویرایش و تایید آن اقدام
                                    نمایید
                                    <table
                                      className="table table-striped"
                                      style={{
                                        width: "100%",
                                      }}
                                    >
                                      <thead className="thead-dark">
                                        <tr key="header">
                                          <th scope="col">تاریخ ثبت</th>
                                          <th scope="col">شماره سند</th>
                                          <th scope="col">نوع سند</th>
                                          <th scope="col">عنوان سند</th>
                                          <th scope="col">جمع مبلغ</th>
                                          <th scope="col">واحد مقصد</th>
                                          <th scope="col">ثبت کننده</th>
                                          <th scope="col"></th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        {this.state.BudgetDocuments.map((i) => (
                                          <tr key={i.Id}>
                                            <td>{i.Date}</td>
                                            <td>{i.Id}</td>
                                            <td>{i.DocumentType}</td>
                                            <td>{i.Title}</td>
                                            <td>{i.Amount}</td>
                                            <td>
                                              {i.Branch + "-" + i.BranchCode}
                                            </td>
                                            <td>{i.Registrar}</td>
                                            <td>
                                              {i.Status === 0 ||
                                              (i.Status !== 0 &&
                                                this.props.employee.GroupId !==
                                                  8) ? (
                                                <div
                                                  className="d-inline  btn btn-outline-danger btn-md m1"
                                                  onClick={() => {
                                                    this.setState(
                                                      {
                                                        selectedDocumentId:
                                                          i.Id,
                                                      },
                                                      () =>
                                                        this.handleCollapse(3)
                                                    );
                                                  }}
                                                >
                                                  ویرایش
                                                </div>
                                              ) : (
                                                <span className="badge badge-warning">
                                                  غیر قابل ویرایش
                                                </span>
                                              )}
                                            </td>
                                          </tr>
                                        ))}
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="card border-0"
                        style={{ borderRadius: 20 }}
                      >
                        <div
                          id="collapseTwo"
                          className={
                            this.state.collapse === 2
                              ? "collapse show"
                              : "collapse "
                          }
                          aria-labelledby="headingTwo"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <div className="row">
                              <div className="col-md-12 col-xl-4">
                                <Select
                                  onChange={this.handleChange}
                                  name="documentTypeId"
                                  label="نوع سند"
                                  error=""
                                  options={[
                                    { id: 1, name: "سند ابلاغ بودجه جاری" },
                                    {
                                      id: 2,
                                      name: "سند ابلاغ بودجه سرمایه ای",
                                    },
                                    { id: 3, name: "سند ترمیم بودجه جاری" },
                                    {
                                      id: 4,
                                      name: "سند ترمیم بودجه سرمایه ای",
                                    },
                                  ]}
                                />
                              </div>
                              <div className="col-md-12 col-xl-4">
                                <Input
                                  type="text"
                                  name="documentTitle"
                                  id="documentTitle"
                                  label="توضیحات سند"
                                  error=""
                                  title={this.props.employee.BranchCode}
                                  maxLength={4000}
                                  placeholder=""
                                  value={this.state.documentTitle}
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div className="col-md-12 col-xl-4">
                                <Select
                                  onChange={this.handleChange}
                                  name="destinationCode"
                                  label="واحد مقصد"
                                  error=""
                                  options={this.state.budgetUnits}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div
                                className="btn btn-outline-danger btn btn-large btn-block"
                                onClick={this.handleBudgetDocument}
                              >
                                ثبت
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card  border-0">
                        {/* <div
                          className="card-header"
                          id="headingTwo"
                          className="btn bg-light"
                          data-toggle="collapse"
                          data-target="#collapseTwo"
                          aria-expanded="true"
                          aria-controls="collapseTwo"
                          onClick={() => this.handleCollapse(1)}
                        >
                          <h4 className="btn btn-block mb-0 bg-light">
                            ثبت سند
                          </h4>
                        </div> */}
                        <div
                          id="collapseThree"
                          className={
                            this.state.collapse === 3
                              ? "collapse show"
                              : "collapse "
                          }
                          aria-labelledby="headingThree"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <div className="row border bg-light rounded">
                              <div className="col-md-12 col-lg-6">
                                <div className="row">
                                  <div className="col">تاریخ ثبت</div>
                                  <div className="col">
                                    {this.state.selectedDocumentData.length
                                      ? this.state.selectedDocumentData[0].Date
                                      : ""}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">عنوان سند</div>
                                  <div className="col">
                                    {this.state.selectedDocumentData.length
                                      ? this.state.selectedDocumentData[0].Title
                                      : ""}
                                  </div>
                                </div>
                                {/* <div className="row">
                                  <div className="col">واحد مقصد</div>
                                  <div className="col">
                                    {this.state.selectedDocumentData.length
                                      ? `${this.state.selectedDocumentData[0].DestinationTitle} ${this.state.selectedDocumentData[0].DestinationCode}`
                                      : ""}
                                  </div>
                                </div> */}
                              </div>
                              <div className="col-md-12 col-lg-6">
                                <div className="row">
                                  <div className="col">شماره سند</div>
                                  <div className="col">
                                    {this.state.selectedDocumentData.length
                                      ? this.state.selectedDocumentData[0].Id
                                      : ""}
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">واحد مقصد</div>
                                  <div className="col">
                                    {this.state.selectedDocumentData.length
                                      ? `${this.state.selectedDocumentData[0].DestinationTitle} ${this.state.selectedDocumentData[0].DestinationCode}`
                                      : ""}
                                  </div>
                                  {/* <div className="col">شماره پیگیری</div>
                                  <div className="col">
                                    {this.state.selectedDocumentData.length
                                      ? this.state.selectedDocumentData[0].GUID
                                      : ""}
                                  </div> */}
                                </div>
                              </div>
                            </div>
                            <div className="row ">
                              <div className="col-lg-6 col-md-12 mt-1">
                                <SelectSearchable
                                  name="accountCode"
                                  data={this.state.BudgetData}
                                  onChange={this.handleSelectChange}
                                  selectedValue={this.state.selectedOption}
                                />
                                {/* <InputPrepend
                                  type="number"
                                  name="accountCode"
                                  id="accountCode"
                                  label="سرفصل بودجه"
                                  error=""
                                  title={this.props.employee.BranchCode}
                                  maxLength={9}
                                  placeholder="XXXXXXXXX"
                                  value={this.state.accountCode}
                                  onChange={this.handleChange}
                                  onBlur={this.handleBudgetTitle}
                                /> */}
                              </div>
                              <div className="col-lg-6 col-md-12 border border-success rounded mt-1">
                                <div className="text-danger">
                                  {this.state.budgetTitle}
                                </div>
                              </div>
                            </div>
                            <div className="row ">
                              <div className="col-lg-4 col-md-12">
                                <Input
                                  type="text"
                                  name="amount"
                                  id="amount"
                                  label="مبلغ"
                                  error=""
                                  title="ریال"
                                  maxLength={15}
                                  placeholder="مبلغ به ریال"
                                  value={thousandSeperator(this.state.amount)}
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div className="col-lg-2 col-md-12">
                                <Input
                                  type="text"
                                  name="count"
                                  id="count"
                                  label="تعداد"
                                  error=""
                                  maxLength={6}
                                  placeholder="تعداد"
                                  value={thousandSeperator(this.state.count)}
                                  onChange={this.handleChange}
                                />
                              </div>
                              <div className="col-lg-6 col-md-12 ">
                                <Input
                                  type="text"
                                  name="description"
                                  id="description"
                                  label="شرح"
                                  error=""
                                  maxLength={500}
                                  placeholder=""
                                  value={this.state.description}
                                  onChange={this.handleChange}
                                />
                              </div>
                              {/* <div className="col col-2 "></div> */}
                              <div
                                className="btn btn-block btn-success m-2"
                                onClick={this.handleBudgetDocumentDetail}
                              >
                                ثبت
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">
                                <table
                                  className="table table-striped"
                                  style={{
                                    width: "100%",
                                  }}
                                >
                                  <thead className="thead-dark">
                                    <tr key="header">
                                      <th scope="col">شماره سند</th>
                                      <th scope="col">کد سرفصل</th>
                                      <th scope="col">عنوان سرفصل</th>
                                      <th scope="col">مبلغ</th>
                                      <th scope="col">تعداد</th>
                                      <th scope="col">شرح سند</th>
                                      <th scope="col"></th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {this.state.BudgetDocumentDetail.map(
                                      (i) => (
                                        <tr key={i.Id}>
                                          <td>{i.PId}</td>
                                          <td>{i.Code}</td>
                                          <td>{i.Title}</td>
                                          <td>{thousandSeperator(i.Amount)}</td>
                                          <td>{thousandSeperator(i.Count)}</td>
                                          <td>{i.Description}</td>
                                          <td>
                                            <div
                                              className=" btn btn-outline-warning btn-sm m-1"
                                              onClick={() =>
                                                this.setState(
                                                  {
                                                    accountCode: i.Code,
                                                    amount: i.Amount,
                                                    description: i.Description,
                                                    count: i.Count,
                                                    selectedId: i.Id,
                                                  },
                                                  () => this.handleBudgetTitle()
                                                )
                                              }
                                            >
                                              ویرایش
                                            </div>
                                            <div
                                              className="  btn btn-outline-danger btn-sm m-1 "
                                              onClick={
                                                () =>
                                                  window.confirm(
                                                    `سرفصل ${i.Title} با کد ${i.Code}حذف شود؟`
                                                  ) === true
                                                    ? this.handleBudgetDetailDelete(
                                                        i.Id
                                                      )
                                                    : null
                                                // this.handleBudgetDetailDelete(
                                                //   i.Id
                                                // )
                                              }
                                            >
                                              حذف
                                            </div>
                                          </td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                  {/* {this.state.BudgetDocumentDetail.map((i) => (
                                    <tr key={i.PId}>
                                      <td>{i.PId}</td>
                                      <td>{i.Code}</td>
                                      <td>{i.Title}</td>
                                      <td>{i.Amount}</td>
                                      <td>{i.Description}</td>
                                    </tr>
                                  ))}
                                  <h4>جمع کل :0</h4> */}
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="card  border-0">
                        {/* <div
                          className="card-header"
                          id="headingThree"
                          className="btn bg-light"
                          data-toggle="collapse"
                          data-target="#collapseThree"
                          aria-expanded="true"
                          aria-controls="collapseThree"
                          onClick={() => this.handleCollapse(2)}
                        >
                          <h4 className="btn btn-block mb-0 bg-light">
                            تایید نهایی
                          </h4>
                        </div> */}
                        <div
                          id="collapseFour"
                          className={
                            this.state.collapse === 4
                              ? "collapse show"
                              : "collapse "
                          }
                          aria-labelledby="headingFour"
                          data-parent="#accordion"
                        >
                          <div className="card-body">
                            <table
                              className="table table-striped"
                              style={{
                                width: "100%",
                              }}
                            >
                              <thead className="thead-dark">
                                <tr key="header">
                                  <th scope="col">تاریخ ثبت</th>
                                  <th scope="col">شماره سند</th>
                                  <th scope="col">نوع سند</th>
                                  <th scope="col">عنوان سند</th>
                                  <th scope="col">مبلغ سند</th>
                                  <th scope="col">واحد مقصد</th>
                                  <th scope="col">ثبت کننده</th>
                                  <th scope="col">وضعیت سند</th>
                                  <th scope="col"></th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.BudgetDocuments.filter(
                                  (i) => i.Status === 0
                                ).map((i) => (
                                  <tr key={i.Id}>
                                    <td>{i.Date}</td>
                                    <td>{i.Id}</td>
                                    <td>{i.DocumentType}</td>
                                    <td>{i.Title}</td>
                                    <td>{i.Amount}</td>
                                    <td>{i.Branch + "-" + i.BranchCode}</td>
                                    <td>{i.Registrar}</td>
                                    <td>{i.StatusTitle}</td>

                                    {i.Status === 0 ? (
                                      <td>
                                        <div
                                          className="d-inline  btn btn-outline-success btn-md m-1"
                                          onClick={() =>
                                            this.handleCommit(i.Id)
                                          }
                                        >
                                          تایید
                                        </div>
                                      </td>
                                    ) : parseInt(i.Status) > 2 ? (
                                      <td>
                                        <div
                                          className="d-inline  btn btn-outline-warning btn-md m-1 "
                                          onClick={() => {
                                            window.open(
                                              `/budgetprint/?id=${i.Id}`
                                            );
                                          }}
                                        >
                                          چاپ
                                        </div>
                                      </td>
                                    ) : (
                                      <td>
                                        <span className="badge badge-warning">
                                          امکان چاپ بعد از تایید نهایی
                                        </span>
                                      </td>
                                    )}
                                    {/* <td>
                                      <div
                                        className="d-inline  btn btn-outline-success btn-md m-1"
                                        onClick={() => this.handleCommit(i.Id)}
                                      >
                                        تایید
                                      </div>
                                      <div
                                        className="d-inline  btn btn-outline-warning btn-md m-1 "
                                        onClick={() => this.handleCollapse(1)}
                                      >
                                        چاپ
                                      </div>
                                    </td> */}
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default BudgetAllocation;
