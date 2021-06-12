import React, { Component } from "react";
import ProductTable from "./productTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { karanehAccress } from "../services/personsKaraneh";
import {
  GetProductTitle,
  GetPersonsProduct,
  GetProductPercent,
  productInsert,
  getPersonsProductRemain,
} from "../services/product";
//import _ from "lodash";
class Product extends Component {
  state = {
    loading: false,
    pageContent: { title: "تخصیص فوق العاده عملیاتی" },
    data: [],
    currentPage: 1,
    pageSize: 200,
    sortColumn: { path: "نام شعبه", order: "asc" },
    karanehRemain: [],
    sum: { A50Sum: 0, A30Sum: 0, A20Sum: 0, A30All: 0, A20All: 0 },
    productPercent: [],
    payDate: "",
  };

  componentDidMount() {
    this.getTitle();
    this.checkAccess();
    this.ProductPercent();
  }
  ProductPercent = async () => {
    const { data } = await GetProductPercent(this.props.type);
    //console.log(data[0]);
    this.setState({ productPercent: data });
  };
  getTitle = async () => {
    const { data } = await GetProductTitle(this.props.type);
    this.setState(
      {
        pageContent: { title: data[0].Name },
        payDate: data[0].PayDate,
        productId: data[0].Id,
      },
      () => this.refresh()
    );
    //console.log(this.state);
  };
  checkAccess = async () => {
    const { data } = await karanehAccress(this.props.employee.NationalCode, 1);
    if (!data[0]) this.props.history.push("/not-found");
  };

  clacRemain = () => {
    let A50Sum = 0,
      A30Sum = 0,
      A20Sum = 0,
      A30All = 0,
      A20All = 0;
    this.state.data.map((item) => {
      switch (item.Description) {
        case "شعبه": {
          A30Sum +=
            parseInt(0.3 * item["مبلغ کل"]) -
            parseInt(String(item.A30).replace(",", ""));
          A30All += parseInt(0.3 * item["مبلغ کل"]);
          A20Sum +=
            parseInt(0.2 * item["مبلغ کل"]) - String(item.A20).replace(",", "");
          A20All += parseInt(0.2 * item["مبلغ کل"]);
          break;
        }
        case "شعبه مستقل": {
          A30Sum +=
            parseInt(0.3 * item["مبلغ کل"]) -
            parseInt(String(item.A30).replace(",", ""));
          A30All += parseInt(0.3 * item["مبلغ کل"]);
          A20Sum +=
            parseInt(0.2 * item["مبلغ کل"]) - String(item.A20).replace(",", "");
          A20All += parseInt(0.2 * item["مبلغ کل"]);
          break;
        }
        default: {
          A30Sum += 0;
          A30All += 0;
          A20Sum +=
            parseInt(0.5 * item["مبلغ کل"]) -
            parseInt(String(item.A20).replace(",", ""));
          A20All += parseInt(0.5 * item["مبلغ کل"]);
        }
      }
      return 0;
      // if (item.Description === "شعبه") {
      //   let Percent = this.state.productPercent.filter(
      //     (i) => i.UnitType === 3
      //   )[0];
      //   newItem = {
      //     ...item,
      //     A50: parseInt((item.مبلغ * /*Percent.FixedPercent*/ 50) / 100),
      //   };
      //   A50Sum += parseInt((item.مبلغ * /*Percent.FixedPercent*/ 50) / 100);
      //   A30Sum +=
      //     parseInt((item.مبلغ * /*Percent.BranchPercent*/ 30) / 100) -
      //     parseInt(String(item.A30).replace(",", ""));
      //   A30All += parseInt((item.مبلغ * /*Percent.BranchPercent*/ 30) / 100);
      //   A20Sum +=
      //     (item.مبلغ * /*Percent.SupervisorPercent*/ 20) / 100 -
      //     String(item.A20).replace(",", "");
      //   A20All += (item.مبلغ * /*Percent.SupervisorPercent*/ 20) / 100;
      // } else if (item.Description === "سرپرستی استان") {
      //   let Percent = this.state.productPercent.filter(
      //     (i) => i.UnitType === 2
      //   )[0];
      //   newItem = {
      //     ...item,
      //     A50: parseInt((item.مبلغ * /*Percent.FixedPercent*/ 50) / 100),
      //   };
      //   A50Sum += parseInt(item.مبلغ * /*Percent.FixedPercent*/ 50) / 100;
      //   A30Sum +=
      //     parseInt((item.مبلغ * /*Percent.BranchPercent*/ 0) / 100) -
      //     parseInt(String(item.A30).replace(",", ""));
      //   A30All += parseInt((item.مبلغ * /*Percent.BranchPercent*/ 0) / 100);
      //   A20Sum +=
      //     parseInt((item.مبلغ * /*Percent.SupervisorPercent*/ 50) / 100) -
      //     parseInt(String(item.A20).replace(",", ""));
      //   A20All += (item.مبلغ * /*Percent.SupervisorPercent*/ 50) / 100;
      // } else {
      //   let Percent = this.state.productPercent.filter(
      //     (i) => i.UnitType === 1
      //   )[0];
      //   newItem = {
      //     ...item,
      //     A50: Math.round(
      //       parseInt((item.مبلغ * /*Percent.FixedPercent*/ 50) / 100)
      //     ),
      //   };
      //   A50Sum += parseInt((item.مبلغ * /*Percent.FixedPercent*/ 50) / 100);
      //   A30Sum +=
      //     parseInt((item.مبلغ * /*Percent.BranchPercent*/ 0) / 100) -
      //     parseInt(String(item.A30).replace(",", ""));
      //   A30All += parseInt((item.مبلغ * /*Percent.BranchPercent*/ 0) / 100);
      //   A20Sum +=
      //     parseInt((item.مبلغ * /*Percent.SupervisorPercent*/ 50) / 100) -
      //     parseInt(String(item.A20).replace(",", ""));
      //   A20All += parseInt(
      //     (item.مبلغ * /*Percent.SupervisorPercent*/ 50) / 100
      //   );
      // }

      //return newItem;
    });
    this.setState({
      // data: newData,
      sum: { A50: A50Sum, A30: A30Sum, A20: A20Sum, A30All, A20All },
    });
  };
  refresh = async () => {
    //console.log(this.state.payDate);
    this.setState({ loading: true });
    const { data } = await GetPersonsProduct(
      this.props.employee.NationalCode,
      this.state.payDate,
      this.state.productId
    );

    this.setState({ data, loading: false }, () => {
      //this.clacRemain();
      this.handleKaranehRemain();
    });
  };
  handleKaranehRemain = async () => {
    const { data: karanehRemain } = await getPersonsProductRemain(
      this.props.employee.NationalCode,
      this.state.payDate,
      this.state.productId
    );
    this.setState({ karanehRemain: karanehRemain[0] });
  };

  numberWithCommas = (x) => {
    var nf = new Intl.NumberFormat();
    return nf.format(x) === "NaN" ? 0 : nf.format(x);
  };
  onCommit = (NationalCode, A50, A30, A20, PostTypeId) => {
    //console.log(NationalCode, A50, A30, A20, PostTypeId);
    //alert(this.props.type === "1");
    if (this.props.type === "1") {
      if (
        (this.props.employee.GroupId === 4 ||
          this.props.employee.GroupId === 2) &&
        PostTypeId === 2
      ) {
        if (parseInt(A20) + parseInt(A30) + parseInt(A50) > 35000000) {
          this.showMessage(
            "سقف مبلغ قابل تخصیص به رییس شعبه 35,000,000 ریال میباشد",
            "error"
          );
          return false;
        }
      } else if (
        (this.props.employee.GroupId === 4 ||
          this.props.employee.GroupId === 2) &&
        PostTypeId !== 2
      ) {
        if (parseInt(A20) + parseInt(A30) + parseInt(A50) > 35000000) {
          this.showMessage(
            "سقف مبلغ قابل تخصیص به کارکنان 35,000,000 ریال میباشد",
            "error"
          );
          return false;
        }
      } else {
        if (parseInt(A20) + parseInt(A30) + parseInt(A50) > 35000000) {
          this.showMessage(
            "سقف مبلغ قابل تخصیص به کارکنان ستادی 35,000,000 ریال میباشد",
            "error"
          );
          return false;
        }
      }
    } else {
      this.showMessage("خطا در تشخیص پست کارکنان" + this.props.type, "error");
      return false;
    }

    if (this.props.employee.GroupId === 4) {
      let sum = this.state.karanehRemain;
      //alert(parseInt(sum.A30All * 0.3));
      //alert(parseInt(A30));
      if (
        (this.state.data.length === 2 &&
          parseInt(A30) > parseInt(sum.Total * 0.3 * 0.6)) ||
        (this.state.data.length === 3 &&
          parseInt(A30) > parseInt(sum.Total * 0.3 * 0.45)) ||
        (this.state.data.length === 4 &&
          parseInt(A30) > parseInt(sum.Total * 0.3 * 0.35)) ||
        (this.state.data.length > 4 &&
          parseInt(A30) > parseInt(sum.Total * 0.3 * 0.3))
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
      (this.props.employee.GroupId === 2 && A20 < 0) ||
      (this.props.employee.GroupId === 10 && A20 < 0)
    ) {
      this.showMessage("مبلغ نمیتواند کمتر از صفر باشد", "error");
      return false;
    }
    //alert(parseInt(this.state.sum.A30));
    // if (
    //   (this.props.employee.GroupId === 4 &&
    //     parseInt(this.state.karanehRemain.A30) - A30 < 0) ||
    //   ((this.props.employee.GroupId === 2 ||
    //     this.props.employee.GroupId === 7 ||
    //     this.props.employee.GroupId === 10) &&
    //     parseInt(this.state.karanehRemain.A20) - A20 < 0)
    // ) {
    //   this.showMessage("مانده کافی نمیباشد", "error");
    //   return false;
    // }
    // if (
    //   (this.props.employee.GroupId === 4 &&
    //     parseInt(this.state.karanehRemain.A30) < 0) ||
    //   ((this.props.employee.GroupId === 2 ||
    //     this.props.employee.GroupId === 7 ||
    //     this.props.employee.GroupId === 10) &&
    //     parseInt(this.state.karanehRemain.A20)) < 0
    // ) {
    //   this.showMessage("مانده کافی نمیباشد", "error");
    //   return false;
    // }

    this.insert(
      NationalCode,
      A50,
      A30,
      A20,
      this.state.payDate,
      this.props.employee.NationalCode,
      this.state.productId
    ).then((data) => {
      //console.log("data", data[0]);
      if (!data[0]) {
        this.showMessage("خطا در ثبت اطلاعات", "error");
        this.refresh();
        this.handleKaranehRemain();
      } else {
        //console.log("dataaa", data[0]);
        if (data[0].errorCode === 0) {
          this.showMessage("مانده حساب کافی نمیباشد", "error");
        } else {
          this.showMessage("اطلاعات ثبت شد", "success");
          this.refresh();
          this.handleKaranehRemain();
        }
      }
    });
  };
  tbhandleChange = (row) => {
    //console.log("row", row);
    let dataNew = this.state.data.map((i) => {
      //console.log(i.NationalCode, row.NationalCode);
      if (i.NationalCode === row.NationalCode) return row;
      else return i;
    });
    //console.log(dataNew);
    this.setState({
      data: dataNew,
    });
    //this.clacRemain();
  };
  insert = async (
    NationalCode,
    A50,
    A30,
    A20,
    paydate,
    managerNationalCode,
    productId
  ) => {
    const { data } = await productInsert(
      NationalCode,
      A50,
      A30,
      A20,
      paydate,
      managerNationalCode,
      productId
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
    return (
      <main className="d-flex align-items-center  py-md-0  ">
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
                        <li>
                          مانده قابل تخصیص :
                          {parseInt(this.state.karanehRemain.A20) < 0 ? (
                            <strong className="bg-danger text-white">
                              {this.numberWithCommas(
                                parseInt(this.state.karanehRemain.A20)
                              )}
                            </strong>
                          ) : (
                            this.numberWithCommas(
                              parseInt(this.state.karanehRemain.A20)
                            )
                          )}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                    {this.props.employee.GroupId === 4 ? (
                      <ul>
                        <li>
                          مانده قابل تخصیص شعبه:
                          {parseInt(this.state.karanehRemain.A30) < 0 ? (
                            <strong className="bg-danger text-white">
                              {this.numberWithCommas(
                                parseInt(this.state.karanehRemain.A30)
                              )}
                            </strong>
                          ) : (
                            this.numberWithCommas(
                              parseInt(this.state.karanehRemain.A30)
                            )
                          )}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}

                    {this.props.employee.GroupId === 7 ||
                    this.props.employee.GroupId === 10 ? (
                      <ul>
                        <li>
                          مانده قابل تخصیص اداره کل:
                          {parseInt(this.state.karanehRemain.A20) < 0 ? (
                            <strong className="bg-danger text-white">
                              {this.numberWithCommas(
                                parseInt(this.state.karanehRemain.A20)
                              )}
                            </strong>
                          ) : (
                            this.numberWithCommas(
                              parseInt(this.state.karanehRemain.A20)
                            )
                          )}
                        </li>
                      </ul>
                    ) : (
                      ""
                    )}
                  </h4>
                  <strong>مبلغ نهایی</strong> شامل
                  <strong> مبلغ ثابت </strong>،<strong> سهم شعبه </strong> و
                  <strong> سهم سرپرستی/ستاد </strong> میباشد که مبلغ کارگزاری و
                  ارزی در آن لحاظ شده است
                  <div className="row">
                    <div className="col">
                      <ProductTable
                        data={this.state.data}
                        employee={this.props.employee}
                        onCommit={this.onCommit}
                        tbhandleChange={this.tbhandleChange}
                        refresh={this.refresh}
                        loading={this.state.loading}
                      />
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

export default Product;
