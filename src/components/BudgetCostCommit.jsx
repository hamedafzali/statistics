import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  budgetInsert,
  BudgetDocumentGetData,
  BudgetDocumentDetailGetData,
  budgetCommit,
  budgetUnCommit,
} from "../services/budget";
import Overlay from "react-overlay-component";
class BudgetCostCommit extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "تایید درخواست بودجه" },
    BudgetDocuments: [],
    isOpen: false,
    BudgetDocumentDetail: [],
    configs: {
      animate: true,
      clickDismiss: true,
      escapeDismiss: false,
      focusOutline: false,
      top: `5em`,
    },
    selectedRequestId: new URLSearchParams(window.location.search).get("id"),
    document: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    //this.fillGrid();
    this.getBudgetDocuments();
  }
  getBudgetDocumentDetail = async () => {
    const { data: BudgetDocumentDetail } = await BudgetDocumentDetailGetData(
      this.state.selectedDocumentId
    );
    this.setState({ BudgetDocumentDetail });
  };
  handleClose = () => {
    this.setState({ isOpen: false });
  };
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
  handleUnCommit = async (id) => {
    const { data } = await budgetUnCommit({
      id,
      nationalcode: this.props.employee.NationalCode,
    });
    if (!data) {
      this.showMessage("خطا در ردتایید", "error");
    } else {
      this.showMessage("ردتایید انجام شد", "success");
      this.getBudgetDocuments();
    }
  };
  handleChange = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
    //console.log(this.state);
  };
  getBudgetDocuments = async () => {
    const { data: BudgetDocuments } = await BudgetDocumentGetData(
      this.props.employee.NationalCode
    );
    console.log(this.props.employee);
    console.log(BudgetDocuments);
    const id = new URLSearchParams(window.location.search).get("Id");
    if (BudgetDocuments) {
      const BudgetDocumentsData = BudgetDocuments.filter(
        (i) =>
          i.UnitCode === id || i.UnitCode === this.props.employee.BranchCode
      );
      console.log(BudgetDocuments);
      this.setState({
        BudgetDocuments: BudgetDocumentsData,
      });
    }
  };
  handleSave = async () => {
    // if (this.state.documentTypeId === 0) {
    //   this.showMessage("نوع سند انتخاب نشده است", "error");
    //   return false;
    // } else if (this.state.documentTitle.length === 0) {
    //   this.showMessage("عنوان سند را وارد کنید", "error");
    //   return false;
    // } else if (this.state.unitId === 0) {
    //   this.showMessage("واحد مقصد انتخاب نشده است", "error");
    //   return false;
    // }
    const { data } = await budgetInsert({
      title: this.state.title,
      code: this.state.code,
    });

    if (!data) {
      this.showMessage("نوع سند انتخاب نشده است", "error");
      return false;
    } else {
      this.showMessage("سند ثبت شد", "success");
      this.fillGrid();
      this.setState({ title: "", code: "" });
    }
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
                    {/* <div className="row">
                      <div className=" col-lg-6 col-md-12 mt-1">
                        <InputPrepend
                          type="text"
                          name="title"
                          id="title"
                          label="عنوان سرفصل بودجه"
                          error=""
                          placeholder=""
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className=" col-lg-4 col-md-12 mt-1">
                        <InputPrepend
                          type="text"
                          name="code"
                          id="code"
                          label="کد سرفصل بودجه"
                          error=""
                          placeholder=""
                          value={this.state.code}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className=" col-lg-2 col-md-12 mt-2">
                        <div
                          className="  btn btn-outline-danger btn m2 btn-block"
                          onClick={this.handleSave}
                        >
                          ذخیره
                        </div>
                      </div>
                    </div> */}
                    <div className="row">
                      <div className="col col-12">
                        <table
                          className="table table-striped "
                          style={{
                            width: "100%",
                            fontSize: 14,
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
                              <th scope="col">وضعیت سند</th>
                              <th scope="col">ثبت کننده</th>
                              <th scope="col">تایید مدیریت</th>
                              {/* <th scope="col">ثبت کننده</th>
                              <th scope="col">تایید اول</th>
                              <th scope="col">تایید دوم</th>
                              <th scope="col">تایید نهایی</th> */}
                              <th scope="col"></th>
                              {/* <th scope="col"></th> */}
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.BudgetDocuments.length &&
                              this.state.BudgetDocuments.filter(
                                (i) => i.Status >= 0
                              ).map((i) => (
                                <tr key={i.Id}>
                                  <td>{i.Date}</td>
                                  <td>{i.Id}</td>
                                  <td>{i.DocumentType}</td>
                                  <td>{i.Title}</td>
                                  <td>{i.Amount}</td>
                                  <td>{i.Branch + "-" + i.BranchCode}</td>
                                  <td>{i.StatusTitle}</td>
                                  <td>{i.Registrar}</td>
                                  <td>{i.Commit1}</td>
                                  {/* <td>{i.Registrar}</td>
                                <td>{i.Commit1}</td>
                                <td>{i.Commit2}</td>
                                <td>{i.Commit3}</td> */}
                                  <td>
                                    <div className="row">
                                      <div
                                        className={
                                          i.Status === 1 &&
                                          this.props.employee.GroupId === 2
                                            ? "d-inline  btn btn-success  m-1 col"
                                            : "d-inline  btn btn-light  m-1 disabled col"
                                        }
                                        //onClick={() => this.handleCommit(i.Id)}
                                        onClick={() =>
                                          i.Status === 1 &&
                                          this.props.employee.GroupId === 2
                                            ? this.handleCommit(i.Id)
                                            : null
                                        }
                                      >
                                        تایید
                                      </div>

                                      <div
                                        className={
                                          i.Status === 1 &&
                                          this.props.employee.GroupId === 2
                                            ? "d-inline text-nowrap btn btn-danger btn-md m-1 col"
                                            : "d-inline text-nowrap btn btn-light btn-md m-1 disabled col"
                                        }
                                        //onClick={() => this.handleUnCommit(i.Id)}
                                        onClick={() =>
                                          i.Status === 1 &&
                                          this.props.employee.GroupId === 2
                                            ? this.handleUnCommit(i.Id)
                                            : null
                                        }
                                      >
                                        رد تایید
                                      </div>
                                    </div>
                                  </td>
                                  {/* <td>
                                    <div className="row">
                                      <Link
                                        to={`/budgetrequesttodocument/?Id=${i.Id}`}
                                        className={
                                          i.Status === 2 &&
                                          (this.props.employee.GroupId === 11 ||
                                            this.props.employee.GroupId === 8)
                                            ? "d-inline  btn btn-warning m-1 col"
                                            : "d-inline  btn btn-light  m-1 disabled col"
                                        }
                                      >
                                        صدور سند
                                      </Link>
                                      <div
                                        className="d-inline text-nowrap btn btn-outline-danger btn-md m-1 col"
                                        onClick={() => {
                                          window.open(
                                            `/budgetprint/?id=${i.Id}`
                                          );
                                        }}
                                      >
                                        چاپ
                                      </div>
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
        {/* <Overlay
          configs={this.state.configs}
          isOpen={this.state.isOpen}
          closeOverlay={this.handleClose}
        >
          <div className="row">
            <div className="col">شماره سند:{this.state.document.Id}</div>
            <div className="col">
              مقصد:
              {this.state.document.Branch +
                "-" +
                this.state.document.BranchCode}
            </div>
          </div>
          <div className="row">
            <div className="col"> مبلغ:{this.state.document.Amount}</div>
            <div className="col"> توضیحات:{this.state.document.Title}</div>
          </div>
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
                <th scope="col">شرح سند</th>
              </tr>
            </thead>
            <tbody>
              {this.state.BudgetDocumentDetail.map((i) => (
                <tr key={i.PId}>
                  <td>{i.PId}</td>
                  <td>{i.Code}</td>
                  <td>{i.Title}</td>
                  <td>{i.Amount}</td>
                  <td>{i.Description}</td>
                </tr>
              ))}
            </tbody>
            
          </table>
        </Overlay> */}
      </main>
    );
  }
}

export default BudgetCostCommit;
