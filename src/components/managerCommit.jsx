import React, { Component } from "react";
import ManagerCommitTable from "./managerCommitTable";
import Pagination from "./common/pagination";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getPersonsKaraneh,
  karanehInsert,
  getPersonsKaranehRemain,
  karanehAccress,
} from "../services/personsKaraneh";
import _ from "lodash";
import { paginate } from "../utils/paginate";
class ManagerCommit extends Component {
  state = {
    pageContent: { title: "تخصیص فوق العاده عملیاتی" },
    data: [],
    currentPage: 1,
    pageSize: 200,
    sortColumn: { path: "نام شعبه", order: "asc" },
    karanehRemain: [],
    sum: 0,
  };

  componentDidMount() {
    this.checkAccess();
    this.refresh();
  }

  checkAccess = async () => {
    const { data } = await karanehAccress(this.props.employee.NationalCode, 1);
    //console.log("data", data[0]);
    //!data[0] ? this.props.history.push("/not-found") : "";
    if (!data[0]) this.props.history.push("/not-found");
  };
  refresh = async () => {
    //console.log("ManagerCommit", this.props);
    const { data } = await getPersonsKaraneh(
      this.props.employee.NationalCode,
      "139910"
    );

    this.setState({ data }, () => {
      let sum = 0;
      this.state.data.map((i) => {
        //console.log(i);
        sum += i.BaseAmountCalced;
        return sum;
      });

      this.setState({ sum });
      this.handleKaranehRemain();
    });
  };
  handleKaranehRemain = async () => {
    const { data: karanehRemain } = await getPersonsKaranehRemain(
      this.props.employee.NationalCode,
      "139910"
    );
    this.setState({ karanehRemain: karanehRemain[0] });
  };
  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const { pageSize, currentPage, sortColumn, data } = this.state;

    //const filtered = Ranks;

    const sorted = _.orderBy(data, [sortColumn.path], [sortColumn.order]);
    const Pdata = paginate(sorted, currentPage, pageSize);
    return { totalCount: data.length, data: Pdata };
  };
  numberWithCommas = (x) => {
    var nf = new Intl.NumberFormat();
    return nf.format(x); // "1,234,567,890"
  };
  onCommit = (NationalCode, A50, A30, A20) => {
    // if (typeof A50 !== "number") {
    //   A50 = A50.replace(",", "");
    //   A30 = A30.replace(",", "");
    //   A20 = A20.replace(",", "");
    // }
    if (parseInt(A20) + parseInt(A30) + parseInt(A50) > 30000000) {
      //console.log(eval(A20) + eval(A30) + eval(A50));
      this.showMessage(
        "سقف مبلغ قابل تخصیص به هر کارمند حداکثر 30,000,000 ریال میباشد",
        "error"
      );
      return false;
    }
    if (this.props.employee.GroupId === 4) {
      let sum = this.state.sum;
      //this.state.data.map((i) => (sum += i.A50));
      console.log(
        this.state.data.length,
        A20,
        A30,
        A50,
        sum,
        sum * 0.3 * 0.35,
        parseInt(A30) > parseInt(sum * 0.3 * 0.35)
      );

      if (
        (this.state.data.length === 2 &&
          parseInt(A30) > parseInt(sum * 0.3 * 0.6)) ||
        (this.state.data.length === 3 &&
          parseInt(A30) > parseInt(sum * 0.3 * 0.45)) ||
        (this.state.data.length === 4 &&
          parseInt(A30) > parseInt(sum * 0.3 * 0.35)) ||
        (this.state.data.length > 4 &&
          parseInt(A30) > parseInt(sum * 0.3 * 0.3))
      ) {
        this.showMessage(
          "حداکثر اعتبار تخصیصی به کارمند رعایت نشده است",
          "error"
        );
        return false;
      }
    }

    if (
      (this.props.employee.GroupId === 7 && A20 < 0) ||
      (this.props.employee.GroupId === 4 && A30 < 0) ||
      (this.props.employee.GroupId === 2 && A20 < 0)
    ) {
      this.showMessage("مبلغ نمیتواند کمتر از صفر باشد", "error");
      return false;
    }

    // if (
    //   (this.props.employee.GroupId === 7 &&
    //     parseInt(this.state.karanehRemain.A20Setad) - parseInt(A20) < 0) ||
    //   (this.props.employee.GroupId === 4 &&
    //     parseInt(this.state.karanehRemain.A30Shobe) - parseInt(A30) < 0)
    // ) {
    //   this.showMessage("مانده کافی نمیباشد", "error");
    //   return false;
    // }
    // console.log("A20", A20, this.state.karanehRemain.A20Sarparasti);
    // if (
    //   this.props.employee.GroupId === 2 &&
    //   parseInt(A20) < parseInt(this.state.karanehRemain.A20Sarparasti)
    // ) {
    //   this.showMessage("مانده کافی نمیباشد", "error");
    //   return false;
    // }
    // if (
    //   this.props.employee.GroupId === 4 &&
    //   A30 < this.state.karanehRemain.A30Shobe
    // ) {
    //   this.showMessage("مانده شعبه کافی نمیباشد", "error");
    //   return false;
    // }
    // const { data } = await karanehInsert(
    //   NationalCode,
    //   A50,
    //   A30,
    //   A20,
    //   "139910",
    //   this.props.employee.NationalCode
    // );
    this.insert(
      NationalCode,
      A50,
      A30,
      A20,
      "139910",
      this.props.employee.NationalCode
    ).then((data) => {
      if (!data) {
        console.log(data);
        this.showMessage("خطا در ثبت اطلاعات", "error");
        this.refresh();
      } else {
        this.showMessage("اطلاعات ثبت شد", "success");
        this.refresh();
      }

      //this.handleKaranehRemain();
    });

    //console.log(NationalCode, A50, A30, A20);

    //console.log(this.state.data);
  };
  tbhandleChange = (data) => {
    this.setState({ data });
  };
  insert = async (
    NationalCode,
    A50,
    A30,
    A20,
    paydate,
    managerNationalCode
  ) => {
    const { data } = await karanehInsert(
      NationalCode,
      A50,
      A30,
      A20,
      paydate,
      managerNationalCode
    );

    return data;
  };
  showMessage = (msg, type) => {
    toast[type](msg, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  render() {
    const { length: count } = this.state.data;
    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>اطلاعاتی وجود ندارد.</p>;

    const { totalCount, data } = this.getPagedData();

    return (
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
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
                  <h4 className="row text-success">
                    {this.props.employee.GroupId === 2 ? (
                      <ul>
                        {/* <li className="text-danger">
                          مبلغ کل محاسباتی:
                          {this.numberWithCommas(parseInt(this.state.sum))}
                        </li> */}
                        {/* <li className="text-danger">
                          مانده قابل تخصیص سرپرستی:
                          {this.numberWithCommas(
                            this.state.karanehRemain.A20Sarparasti
                          )}
                        </li>
                        <li>
                          مانده قابل تخصیص شعب:
                          {this.numberWithCommas(
                            this.state.karanehRemain.A20Shobe
                          )}
                        </li> */}
                        <li>
                          مانده قابل تخصیص :
                          {this.numberWithCommas(
                            parseInt(this.state.karanehRemain.A20Sarparasti) +
                              parseInt(this.state.karanehRemain.A20Shobe)
                          )}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                    {this.props.employee.GroupId === 4 ? (
                      <ul>
                        {/* <li className="text-danger">
                          مبلغ کل محاسباتی:
                          {this.numberWithCommas(parseInt(this.state.sum))}
                        </li> */}
                        <li>
                          مانده قابل تخصیص شعبه:
                          {this.numberWithCommas(
                            this.state.karanehRemain.A30Shobe
                          )}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                    {this.props.employee.GroupId === 7 ||
                    this.props.employee.GroupId === 10 ? (
                      <ul>
                        {/* <li className="text-danger">
                          مبلغ کل محاسباتی:
                          {this.numberWithCommas(parseInt(this.state.sum))}
                        </li> */}
                        <li>
                          مانده قابل تخصیص اداره کل:
                          {this.numberWithCommas(
                            this.state.karanehRemain.A20Setad
                          )}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                    {/* مانده ستاد:
                    {parseInt(
                      data
                        .filter((i) => i["نام شعبه"] === "ستاد مدیریت سرپرستی")
                        .reduce((prev, next) => prev + next.A50, 0) * 0.1
                    )} */}
                  </h4>
                  <h4 className="row text-danger">
                    {/* مانده شعب:
                    {parseInt(
                      data
                        .filter((i) => i["نام شعبه"] !== "ستاد مدیریت سرپرستی")
                        .reduce((prev, next) => prev + next.A50, 0) * 0.1
                    )} */}
                  </h4>
                  <div className="row">
                    <div className="col">
                      <span className="input-group-text text-justifiy col-md">
                        لیست پرسنل زیرمجموعه - تعداد: {totalCount}
                      </span>
                      <ManagerCommitTable
                        data={data}
                        sortColumn={sortColumn}
                        onSort={this.handleSort}
                        employee={this.props.employee}
                        onCommit={this.onCommit}
                        tbhandleChange={this.tbhandleChange}
                        allData={this.state.data}
                      />
                      <Pagination
                        itemsCount={totalCount}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={this.handlePageChange}
                      />
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

export default ManagerCommit;
