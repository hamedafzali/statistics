import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import moment from "jalali-moment";
import thousandSeperator from "../utils/thousandSeparator";
import TreeMenu, { defaultChildren } from "react-simple-tree-menu";
import InputPrepend from "./common/inputPrepend";
import SelectPrepend from "./common/selectPrepend";
import {
  BudgetGetData,
  BudgetBalance,
  budgetDocumentInsert,
  budgetDocumentDetailInsert,
  BudgetDocumentGetData,
} from "../services/budget";
class BudgetTotalReg extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "ثبت بودجه کل ابلاغ شده" },
    titleData: [],
    Dates: [{ id: 1400, name: 1400 }],
    selectedTitle: "",
    selectedTitleCode: "",
    selectedTitleId: 0,
    selectedTitleSum: 0,
    BudgetBalanceData: [],
    amount: 0,
    year: "1400",
    BudgetDocuments: [],
    description: "",
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.fillGrid();
    this.getBudgetGetData();
    this.getBudgetDocuments();
  }
  getBudgetDocuments = async () => {
    const { data: BudgetDocuments } = await BudgetDocumentGetData(
      this.props.employee.NationalCode
    );
    this.setState({ BudgetDocuments });
  };
  BudgetDocument = async () => {
    if (this.state.selectedTitle.length === 0) {
      this.showMessage("عنوان سرفصل را انتخاب کنید", "error");
      return false;
    } else if (
      this.state.selectedTitleCode.length === 0 ||
      this.state.selectedTitleCode === 0
    ) {
      this.showMessage("کد سند اشتباه است", "error");
      return false;
    } else if (this.state.amount === 0) {
      this.showMessage("مبلغ اشتباه است", "error");
      return false;
    } else if (
      parseInt(this.state.budgetType) !== -1 &&
      parseInt(this.state.budgetType) !== -2
    ) {
      this.showMessage("نوع سند را انتخاب کنید", "error");
      return false;
    }
    const { data } = await budgetDocumentInsert({
      date: moment().locale("fa").format("YYYY/MM/DD"),
      documentTypeId: 10,
      documentTitle: "سند ثبت بودجه ابلاغی",
      destinationCode: "M8001",
      unitCode: "M8001",
      registrar: this.props.employee.NationalCode,
      status: this.state.budgetType,
    });
    if (!data) {
      this.showMessage("اشکال در ثبت سند", "error");
      return false;
    }
    const { data: DocumentDetailData } = await budgetDocumentDetailInsert({
      id: 0,
      pid: data.Id,
      title: this.state.selectedTitle,
      code: this.state.selectedTitleCode,
      amount: thousandSeperator(this.state.amount, -1),
      description: this.state.selectedTitle + "-" + this.state.description,
      count: thousandSeperator(1, -1),
    });
    //console.log(DocumentDetailData);
    if (!DocumentDetailData) {
      this.showMessage("اشکال در ثبت ردیف سند", "error");
      return false;
    }
    this.showMessage("مبلغ با موفقیت ثبت شد", "success");
    this.getBudgetBalance(this.state.selectedTitleCode);
    this.getBudgetDocuments();
    this.setState({ amount: 0 });
  };
  handleChange = (e) => {
    //alert(e.currentTarget.value);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
  };
  handleSelectChange = (row) => {
    //console.log(row);
    const newState = { ...this.state };
    newState.budgetTitle = row.Title;
    newState.accountCode = row.Code;
    newState.selectedOption = row;
    this.setState(newState);
  };

  fillGrid = () => {
    this.setState({ data: null }, async () => {
      const { data: titleData } = await BudgetGetData();
      this.setState({ titleData });
    });
  };
  getBudgetGetData = async () => {
    const { data: BudgetData } = await BudgetGetData();
    this.setState({ BudgetData });
  };
  getBudgetBalance = async (code) => {
    const { data: BudgetBalanceData } = await BudgetBalance(code);
    this.setState({ BudgetBalanceData });
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
                    <div className="row">
                      <div
                        className="col-md-12 col-lg-5"
                        data-aos="fade-left"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                      >
                        <div className="row border border-success rounded p-2 m-1">
                          <div className=" col-12 mt-1 text-right ">
                            بودجه سال:
                            <strong className={"text-success mr-2"}>
                              {this.state.year}
                            </strong>
                          </div>
                          <div className=" col-12 mt-1 text-right ">
                            سرفصل انتخاب شده:
                            <strong
                              className={
                                this.state.selectedTitleCode === "" ||
                                this.state.selectedTitleCode === "0" ||
                                this.state.isEndPoint === 0
                                  ? "text-danger mr-2"
                                  : "text-success mr-2"
                              }
                            >
                              {this.state.selectedTitle}
                            </strong>
                          </div>
                          <div className=" col-12 mt-1 text-right ">
                            کد سرفصل انتخاب شده:
                            <strong
                              className={
                                !this.state.selectedTitleId
                                  ? "text-danger mr-2"
                                  : "text-success mr-2"
                              }
                            >
                              {this.state.selectedTitleCode}
                            </strong>
                          </div>
                          <div className=" col-12 mt-1 text-right ">
                            مبلغ تخصیص داده شده تاکنون:
                            <strong
                              className={
                                !this.state.selectedTitleId
                                  ? "text-danger mr-2"
                                  : "text-success mr-2"
                              }
                            >
                              {thousandSeperator(
                                this.state.BudgetBalanceData.Balance
                              )}
                            </strong>
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className=" col mt-1">
                            <Select
                              onChange={this.handleChange}
                              name="paydate"
                              label="بودجه سال"
                              error=""
                              options={this.state.Dates}
                            />
                          </div>
                        </div> */}
                        {this.state.isEndPoint ? (
                          <>
                            <div className="row">
                              <div className=" col mt-1">
                                <SelectPrepend
                                  name="budgetType"
                                  id="budgetType"
                                  label="نوع سند"
                                  error=""
                                  placeholder=""
                                  options={[
                                    { id: -1, name: "بودجه مصوب" },
                                    {
                                      id: -2,
                                      name: "بودجه اصلاحیه",
                                    },
                                  ]}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className=" col mt-1">
                                <InputPrepend
                                  type="text"
                                  name="amount"
                                  id="amount"
                                  label="مبلغ "
                                  error=""
                                  placeholder=""
                                  value={thousandSeperator(this.state.amount)}
                                  onChange={this.handleChange}
                                  maxlength="19"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className=" col mt-1">
                                <InputPrepend
                                  type="text"
                                  name="description"
                                  id="description"
                                  label="توضیحات"
                                  error=""
                                  placeholder=""
                                  value={this.state.description}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div className="col mt-2">
                                <div
                                  className="  btn btn-outline-danger btn m2 btn-block"
                                  onClick={this.BudgetDocument}
                                >
                                  ذخیره
                                </div>
                              </div>
                            </div>
                          </>
                        ) : (
                          ""
                        )}
                      </div>
                      <div
                        className="col-md-12 col-lg-7"
                        data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                      >
                        <div
                          className=" col mt-1 border border-dark rounded pt-2"
                          style={{
                            overflow: "scroll",
                            height: 500,
                            direction: "ltr",
                          }}
                        >
                          <TreeMenu
                            data={this.state.titleData}
                            onClickItem={({ ...props }) => {
                              //console.log(props);
                              this.getBudgetBalance(props.value);
                              this.setState(
                                {
                                  selectedTitle: props.label,
                                  selectedTitleCode: props.value,
                                  selectedTitleId: parseInt(
                                    props.key.split("/")[
                                      props.key.split("/").length - 1
                                    ]
                                  ),
                                  isEndPoint: props.isEndPoint,
                                  level: props.level,
                                },
                                () => console.log(this.state)
                              );
                            }}
                          >
                            {({ search, items }) => (
                              <div className=" p-1 ">
                                <div className="input-group input-group-sm mb-3">
                                  <input
                                    onChange={(e) => search(e.target.value)}
                                    placeholder="جستجو"
                                    className="form-control text-right "
                                    aria-label="Small"
                                    aria-describedby="inputGroup-sizing-sm"
                                  />
                                </div>

                                {defaultChildren({ items })}
                              </div>
                            )}
                          </TreeMenu>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col">
                        <table
                          className="table table-striped border text-center initialism"
                          style={{ textAlign: "center" }}
                        >
                          <thead>
                            <tr>
                              <th scope="col">تاریخ</th>
                              <th scope="col">عنوان</th>
                              <th scope="col">شرح</th>
                              <th scope="col">کد</th>
                              <th scope="col">نوع</th>
                              <th scope="col">ثبت کننده</th>
                              <th scope="col">مبلغ</th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.BudgetDocuments.filter(
                              (i) => i.Status < 0
                            ).map((i) => (
                              <tr>
                                <td>{i.Date}</td>
                                <td>{i.Title}</td>
                                <td>{i.Description}</td>
                                <td>{i.Code}</td>
                                <td>
                                  {i.Status === -1
                                    ? "بودجه مصوب"
                                    : "بودجه اصلاحیه"}
                                </td>
                                <td>{i.Registrar}</td>
                                <td>{i.Amount}</td>
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
      </main>
    );
  }
}

export default BudgetTotalReg;
