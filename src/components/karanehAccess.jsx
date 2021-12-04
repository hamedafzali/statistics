import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "./common/select";
import { getKaranehDates } from "../services/karanehDates";
import {
  getKaranehAccessList,
  karanehAccessUpdate,
  karanehAccessUpdateAll,
} from "../services/karanehData";

import {
  ProductStatus,
  getProductType,
  ProductStatusList,
  ProductFinishingOperation,
} from "../services/product";
import KaranehAccessTable from "./karanehAccessTable";
class KaranehAccess extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "تنظیمات کارانه" },
    KaranehDates: [],
    data: [],
    karanehStatusList: [],
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
    productTypes: [],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.getProductStatus();
    this.getKaranehDates();
    this.KaranehAccessList();
    this.productTypesget();
  }
  getKaranehDates = async () => {
    const { data: KaranehDates } = await getKaranehDates();
    this.setState({
      KaranehDates,
    });
  };

  productTypesget = async () => {
    const { data: productTypes } = await getProductType();
    productTypes[0].selected = true;
    this.setState({
      productTypes,
    });
  };
  KaranehAccessList = async () => {
    //console.log(this.state.productTypes);
    let selected = 1; //this.state.productTypes.filter((i) => i.selected === true);
    //console.log(selected);
    if (!selected) {
      this.showMessage("طرح را انتخاب کنید", "error");
      return false;
    }
    if (this.state.level !== "") {
      const { data } = await getKaranehAccessList(
        this.state.level,
        selected //selected[0].Id
      );
      //console.log(data);
      this.setState({ data });
    }
  };
  getProductStatus = async () => {
    //console.log("3333");
    const { data } = await ProductStatus();
    this.setState({ karanehStatus: data });
  };
  getProductStatusList = async (type) => {
    console.log("3333");
    const { data } = await ProductStatusList(type);
    this.setState({ karanehStatusList: data });
  };
  handleChange = (e) => {
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState, () => {
      this.KaranehAccessList(this.state.level);
    });
  };
  handleProductFinishingOperation = async (level) => {
    if (
      window.confirm(
        "آیا از انجام عملیات مطمئن هستید؟ بعد از انجام امکان بازگرداندن اطلاعات وجود ندارد"
      )
    ) {
      const { data } = await ProductFinishingOperation(level);
      if (!data[0].COUNT) this.showMessage("اشکال در انجام عملیات", "error");
      else this.showMessage("عملیات با موفقیت انجام شد", "success");
    }
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
  productTypesHandler = (e) => {
    let newProductTypes = this.state.productTypes.map((i) =>
      i.Name === e.currentTarget.name
        ? { ...i, selected: true }
        : { ...i, selected: false }
    );
    this.setState({ productTypes: newProductTypes }, () =>
      this.KaranehAccessList()
    );
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
                  <div className="row bg-light m-1 mt-3 p-2 border border-success rounded">
                    <div className="col-md-8 col-lg-8 col-md-12 p-2">
                      تاریخ: {this.state.karanehStatus.Date}
                    </div>
                    <div className="col-md-4 col-lg-4 col-md-12">
                      {this.state.productTypes &&
                        this.state.productTypes.map((i) => (
                          <input
                            className={
                              i.selected
                                ? "btn btn-success btn-block"
                                : "btn btn-secondary btn-block"
                            }
                            type="button"
                            value={i.Name}
                            name={i.Name}
                            id={i.Id}
                            onClick={this.productTypesHandler}
                          />
                        ))}
                    </div>
                  </div>
                  <div className="row bg-light m-1 mt-3 p-2 border border-success rounded">
                    <h3 className=" btn-block bg-secondary text-light">
                      وضعیت لحظه ای
                    </h3>

                    <div className="col col-6  border rounded">
                      <div
                        className="col p-2 btn text-right"
                        onClick={() => this.getProductStatusList("Branch")}
                      >
                        ثبت نشده شعبه: {this.state.karanehStatus.Branch}
                      </div>
                      <div
                        className=" col p-2 btn text-right"
                        onClick={() => this.getProductStatusList("Supervisor")}
                      >
                        ثبت نشده مدیریت شعب:
                        {this.state.karanehStatus.Supervisor}
                      </div>
                      <div
                        className=" col p-2 btn text-right"
                        onClick={() => this.getProductStatusList("Setad")}
                      >
                        ثبت نشده ستاد: {this.state.karanehStatus.Setad}
                      </div>
                      <div className=" col ">
                        <div
                          className="btn btn-outline-primary btn-block m-1"
                          onClick={() => this.getProductStatus()}
                        >
                          بروزرسانی
                        </div>
                      </div>
                    </div>
                    <div className="col col-6 border rounded">
                      <div
                        style={{
                          overflow: "scroll",
                          height: "10rem",
                          width: "100%",
                          textAlign: "right",
                        }}
                      >
                        {this.state.karanehStatusList &&
                          this.state.karanehStatusList.map((i, index) => (
                            <div
                              className=""
                              style={{
                                display: "flex",
                                width: "95%",
                                margin: 1,
                                border: "1px solid silver",
                                borderRadius: "0.2rem",
                                padding: "0.3rem",
                                paddingRight: "0.5rem",
                                backgroundColor: "lightslategrey",
                                color: "white",
                              }}
                            >
                              <div>{`${index + 1}: ${i.Title}  کد: ${
                                i.Code
                              } تعداد: ${i.count}`}</div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="row bg-light m-1 mt-3 p-2 border border-success rounded">
                    <h3 className=" btn-block bg-secondary text-light">
                      بخش مدیریت
                    </h3>

                    <div className="col-lg-4 col-md-12">
                      <div
                        className="btn btn-outline-danger btn-block m-2 p-3"
                        onClick={() =>
                          this.handleProductFinishingOperation("Branch")
                        }
                      >
                        1. تکمیل عملیات شعب
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-12">
                      <div
                        className="btn btn-outline-danger btn-block m-2 p-3"
                        onClick={() =>
                          this.handleProductFinishingOperation("Setad")
                        }
                      >
                        2. تکمیل عملیات ستاد
                      </div>
                    </div>

                    <div className="col-lg-4 col-md-12">
                      <div
                        className="btn btn-outline-danger btn-block m-2 p-3"
                        onClick={() =>
                          this.handleProductFinishingOperation("Supervisor")
                        }
                      >
                        3. تکمیل عملیات مدیریت شعب
                      </div>
                    </div>
                    <div
                      className="btn btn-outline-danger btn-block"
                      onClick={() =>
                        this.handleProductFinishingOperation("All")
                      }
                    >
                      پایان کل عملیات
                    </div>
                  </div>
                  <div className="row bg-light m-1 mt-3 p-2 border border-success rounded">
                    <h3 className=" btn-block bg-secondary text-light">
                      بخش دسترسی ها
                    </h3>
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
