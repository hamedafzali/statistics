import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "./common/select";
import { getKaranehDates } from "../services/karanehDates";
import {
  getKaranehAccessList,
  karanehAccessUpdate,
  karanehAccessUpdateAll,
} from "../services/karanehData";

import { ProductStatus } from "../services/product";
import KaranehAccessTable from "./karanehAccessTable";
class KaranehAccess extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "تنظیمات کارانه" },
    KaranehDates: [],
    data: [],
    checked: {
      Omor: false,
      Setad: false,
      Supervisor: false,
      Branch: true,
    },
    levels: [
      { id: "Omor", name: "معاون مدیرعامل/امور" },
      { id: "Setad", name: "ستاد تهران" },
      { id: "Supervisor", name: "مدیریت شعب" },
      { id: "Branch", name: "شعب" },
    ],
    level: "",
    karanehStatus: {
      Supervisor: 1,
      Branch: 0,
      Setad: 0,
    },
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.getProductStatus();
    this.getKaranehDates();
    this.KaranehAccessList(this.state.level);
  }
  getKaranehDates = async () => {
    const { data: KaranehDates } = await getKaranehDates();
    this.setState({
      KaranehDates,
    });
  };
  KaranehAccessList = async () => {
    if (this.state.level !== "") {
      const { data } = await getKaranehAccessList(this.state.level);
      this.setState({ data });
    }
  };
  getProductStatus = async () => {
    console.log("3333");
    const { data } = await ProductStatus();
    this.setState({ karanehStatus: data });
  };

  handleChange = (e) => {
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState, () => {
      this.KaranehAccessList(this.state.level);
    });
  };
  handleKaranehAccess = async (Code) => {
    //console.log(Code);
    if (Code === 0) {
      this.setState(
        {
          checked: {
            ...this.state.checked,
            [this.state.level]: !this.state.checked[this.state.level],
          },
        },
        () =>
          this.handleChangeSwitch(
            this.state.level,
            this.state.checked[this.state.level]
          )
      );
    } else {
      if (Code) {
        await karanehAccessUpdate(Code);
        this.KaranehAccessList(this.state.level);
      }
    }
  };
  handleChangeSwitch = async (item, val) => {
    //const checked = this.state.checked[this.state.level];
    //console.log(item, val);
    await karanehAccessUpdateAll(
      item,
      this.state.checked[item] === true ? 1 : 0
    );
    this.KaranehAccessList(val);
  };
  onCommit = async (NationalCode, Amount) => {};
  tbhandleChange = (data) => {
    this.setState({ data });
  };
  handleChangeDates = (e) => {
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
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
                  <div className="row bg-light border border-warning rounded m-1">
                    <div className="col-md-6 col-lg-3 col-md-12 p-2">
                      تاریخ: {this.state.karanehStatus.Date}
                    </div>
                  </div>
                  <div className="row bg-light border border-warning rounded m-1">
                    <div className="col-md-6 col-lg-3 col-md-12 p-2">
                      ثبت نشده شعبه: {this.state.karanehStatus.Branch}
                    </div>
                    <div className=" col-md-6 col-lg-3 col-md-12 p-2">
                      ثبت نشده مدیریت شعب: {this.state.karanehStatus.Supervisor}
                    </div>
                    <div className=" col-md-6 col-lg-3 col-md-12 p-2">
                      ثبت نشده ستاد: {this.state.karanehStatus.Setad}
                    </div>
                    <div className=" col-md-6 col-lg-3 col-md-12 ">
                      <div
                        className="btn btn-outline-primary btn-block m-1"
                        onClick={() => this.getProductStatus()}
                      >
                        بروزرسانی
                      </div>
                    </div>
                  </div>
                  <div className="row bg-light border border-danger rounded m-1">
                    <div className="col-lg-4 col-md-12">
                      <div
                        className={
                          this.state.karanehStatus.Branch === 0
                            ? "btn btn-success btn-block m-2 p-3 disabled"
                            : "btn btn-danger btn-block m-2 p-3"
                        }
                      >
                        1. تکمیل عملیات شعب
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div
                        className={
                          this.state.karanehStatus.Setad === 0
                            ? "btn btn-success btn-block m-2 p-3 disabled"
                            : "btn btn-danger btn-block m-2 p-3"
                        }
                      >
                        2. تکمیل عملیات ستاد
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                      <div
                        className={
                          this.state.karanehStatus.Branch !== 0
                            ? "btn btn-danger btn-block m-2 p-3 disabled"
                            : this.state.karanehStatus.Supervisor !== 0
                            ? "btn btn-danger btn-block m-2 p-3"
                            : "btn btn-success btn-block m-2 p-3 disabled"
                        }
                      >
                        3. تکمیل عملیات مدیریت شعب
                      </div>
                    </div>
                  </div>
                  <div className="row bg-light m-1 mt-3 p-2 border border-success rounded">
                    <div className="col-12 text-right">
                      <Select
                        onChange={this.handleChange}
                        name="level"
                        error=""
                        options={this.state.levels}
                        width="250px"
                        style={{ width: 250 }}
                      />
                    </div>
                    <div className="col col-12">
                      <KaranehAccessTable
                        data={this.state.data}
                        onCommit={this.onCommit}
                        tbhandleChange={this.tbhandleChange}
                        handleKaranehAccess={this.handleKaranehAccess}
                        level={this.state.level}
                        checked={this.state.checked[this.state.level]}
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

export default KaranehAccess;
