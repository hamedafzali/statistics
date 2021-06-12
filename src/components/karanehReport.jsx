import React, { Component } from "react";
//import moment from "jalali-moment";
import { getKaranehDates } from "../services/karanehDates";
import {
  GetKarnamehPersonTotal,
  GetKarnamehBranchTotal,
  GetKarnamehSupervisorTotal,
} from "../services/karanehData";
//import Select from "./common/select";
import { ToastContainer, toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/src/collapse.js";
import {
  KarnamehReportPersonTable,
  KarnamehReportBranchTable,
  KarnamehReportSupervisorTable,
} from "./karanehReportTable";
class KaranehReport extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "گزارش کارانه" },
    KarnamehPerson: [],
    KarnamehBranch: [],
    KarnamehSupervisor: [],
    collapse: 1,
    KaranehDates: [],
    loading: {
      personLoading: false,
      branchLoading: false,
      supervisorLoading: false,
    },
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.GetKarnamehPerson();

    this.getKaranehDates();
  }
  getKaranehDates = async () => {
    const { data: KaranehDates } = await getKaranehDates();
    this.setState({
      KaranehDates,
    });
    //console.log(this.state);
  };
  GetKarnamehPerson = async () => {
    this.setState({
      loading: { ...this.state.loading, personLoading: true },
    });
    const { data: KarnamehPerson } = await GetKarnamehPersonTotal("140002");
    this.setState({
      KarnamehPerson,
      loading: { ...this.state.loading, personLoading: false },
    });
  };
  GetKarnamehBranch = async () => {
    this.setState({
      loading: { ...this.state.loading, branchLoading: true },
    });
    const { data: KarnamehBranch } = await GetKarnamehBranchTotal("140002");
    this.setState({
      KarnamehBranch,
      loading: { ...this.state.loading, branchLoading: false },
    });
  };
  GetKarnamehSupervisor = async () => {
    this.setState({
      loading: { ...this.state.loading, supervisorLoading: true },
    });
    const { data: KarnamehSupervisor } = await GetKarnamehSupervisorTotal(
      "140002"
    );
    this.setState({
      KarnamehSupervisor,
      loading: { ...this.state.loading, supervisorLoading: false },
    });
  };
  handleCollapse = (id) => {
    if (id === 1) {
      this.GetKarnamehPerson();
    } else if (id === 2) {
      this.GetKarnamehBranch();
    } else if (id === 3) {
      this.GetKarnamehSupervisor();
    }
    this.setState({
      collapse: id,
    });
  };

  handleChange = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
    //console.log(this.state);
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
    const colsize = 4;
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
                    {/* <div className="row">
                      <div className="col">
                        <Select
                          onChange={this.handleChange}
                          name="paydate"
                          label="تاریخ"
                          error=""
                          options={this.state.KaranehDates}
                        />

                        <div className="btn btn-success btn-block mt-4">
                          نمایش
                        </div>
                      </div>
                    </div> */}

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
                            گزارش کارانه پرسنل
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
                            گزارش کارانه شعب
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
                            گزارش کارانه مدیریت شعب
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
                            <KarnamehReportPersonTable
                              data={this.state.KarnamehPerson}
                              loading={this.state.loading.personLoading}
                            />
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
                            <KarnamehReportBranchTable
                              data={this.state.KarnamehBranch}
                              loading={this.state.loading.branchLoading}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="card  border-0">
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
                            <KarnamehReportSupervisorTable
                              data={this.state.KarnamehSupervisor}
                              loading={this.state.loading.supervisorLoading}
                            />
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

export default KaranehReport;
