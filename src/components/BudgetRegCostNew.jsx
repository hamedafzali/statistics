import React, { Component } from "react";
import FileUpload from "./FileUpload";
import Input from "./common/input";
import SelectSearchable from "./common/selectSearchable";
import { ToastContainer } from "react-toastify";
import {
  BudgetGetDataWithCode,
  BudgetBalanceDocument,
} from "../services/budget";
import CreateGuid from "../utils/GUID";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import thousandSeperator from "../utils/thousandSeparator";
import { fileURL, list } from "../services/files";
class BudgetRegCostNew extends Component {
  state = {
    width: 0,
    height: 0,
    pageContent: { title: "ثبت هزینه بودجه" },
    GUID: CreateGuid(),
    files: [],
  };

  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.getBudgetGetData();
    this.getList();
  }
  getBudgetGetData = async () => {
    const { data: BudgetData } = await BudgetGetDataWithCode();
    this.setState({ BudgetData });
  };
  handleSelectChange = (row) => {
    //console.log(row);
    const newState = { ...this.state };
    newState.budgetTitle = row.label;
    newState.accountCode = row.value;
    newState.selectedOption = row;
    this.setState(newState);
    //console.log(row.Title, row.Code);
    this.handleBalance(row.value);
  };
  handleBalance = async (code) => {
    //console.log(code);
    const { data: accountBalance } = await BudgetBalanceDocument(
      this.props.employee.BranchCode,
      code
    );
    //console.log(accountBalance);
    this.setState({ balance: accountBalance.Balance });
  };
  getFile = async (folder, file) => {
    return await fileURL(folder, file);
  };
  getList = async () => {
    const { data: files } = await list(`/budgetcost${this.state.GUID}`);
    this.setState({ files });

    //console.log(data);
  };
  render() {
    // const configs = {
    //   animate: true,
    //   // focusOutline: false,
    //   clickDismiss: false,
    //   escapeDismiss: false,
    // };
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    //const colsize = 3;
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
                <div className="card-title btn-secondary p-1">
                  <h4>{this.state.pageContent.title}</h4>
                </div>
                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  {/* <div className="row border">
                    <div className="col-lg-12 col-md-12 p-1">
                      {this.props.employee.BranchName}
                      {this.props.employee.BranchCode}
                    </div>
                  </div> */}
                  <div className="row ">
                    <div className="col-lg-4 col-md-12">
                      <Input
                        type="number"
                        name="amount"
                        id="amount"
                        label="مبلغ"
                        error=""
                        title="ریال"
                        maxLength={12}
                        placeholder="مبلغ به ریال"
                        value={this.state.amount}
                        onChange={this.handleChange}
                      />
                    </div>
                    <div className="col-lg-8 col-md-12 ">
                      <Input
                        type="text"
                        name="description"
                        id="description"
                        label="توضیحات"
                        error=""
                        maxLength={500}
                        placeholder=""
                        value={this.state.description}
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-lg-4 col-md-12 ">
                      <SelectSearchable
                        name="accountCode"
                        data={this.state.BudgetData}
                        onChange={(e) => this.handleSelectChange(e)}
                        //onChange={(e) => this.handleSelectChange(e, i)}
                        // selectedValue={
                        //   this.state.BudgetRDocumentDetail.filter(
                        //     (r) => r.Code === i.Code
                        //   ).Code
                        // }
                      />
                    </div>
                    <div class="input-group input-group-sm mb-3 col-lg-8 col-md-12">
                      <div class="input-group-prepend">
                        <span
                          class="input-group-text"
                          id="inputGroup-sizing-sm"
                        >
                          مانده سرفصل
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        aria-label="Small"
                        aria-describedby="inputGroup-sizing-sm"
                        readOnly
                        value={thousandSeperator(this.state.balance)}
                      />
                    </div>
                    {/* <div className="col-lg-8 col-md-12 bg-light border rounded">
                      مانده
                    </div> */}
                  </div>
                  <div className="row ">
                    <div className="col text-right">
                      <FileUpload
                        URL={`/budgetcost${this.state.GUID}`}
                        callback={() => this.getList()}
                        type="full"
                        label="فایل "
                        size="5"
                      />
                      <ul className="text-danger">
                        <strong>نکات:</strong>
                        <li className="li">حداکثر حجم مجاز فایل 5 مگابایت</li>
                        <li className="li">
                          نام گذاری فایلها مطابق با سرفصهای هزینه ای باشد
                        </li>

                        <li className="li">
                          پیشنهاد میشود فایل به صورت فشرده بارگذاری شود
                        </li>
                      </ul>
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
                                    this.state.GUID
                                      ? this.getFile(
                                          `budgetcost${this.state.GUID}`,
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
                  <div className="btn btn-block btn-success">ثبت اطلاعات</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}

export default BudgetRegCostNew;
