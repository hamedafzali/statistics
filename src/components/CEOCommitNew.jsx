import React, { Component } from "react";
import Input from "./common/input";
import InputPrepend from "./common/inputPrepend";
import Select from "./common/selectPrepend";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import CollapsibleTable from "./common/collapseTable";
// import Supervisors from "./supervisors";
import InputRange from "react-input-range";
import Switch from "./common/switch";
import SupervisorsRank from "./supervisorsRank";
import BranchesRank from "./branchesRank";
import KarnamehO from "./karnamehO";
import KarnamehSH from "./karnamehSH";
import KaranehPersonel from "./karanehPersonel";
import Addition from "./addition";
// import CalcedPanel from "./calcedPanel";
import { getKaranehData1 } from "../services/karanehData";
import { getKaranehDates } from "../services/karanehDates";
import { setKaranehParams } from "../services/karanehParams";
//import { NavText } from "@trendmicro/react-sidenav";
class CEOCommitNew extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "تایید کارانه (عیدانه)" },
    KaranehData: [],
    KaranehDates: [],
    Addition: [],
    ratio: 100,
    diff: 0,
    SetadHours: 0,
    paydate: "",
    value: { min: 0, max: 50000 },
    checked: {
      SH01: false,
      SH02: false,
      SH03: false,
      SH04: false,
      SH05: false,
      SH06: false,
      SH07: false,
      SH08: false,
      SH09: false,
      SH10: false,
      SH11: false,
      SH12: false,
      SH13: false,
      SH14: false,
    },
  };
  handleRange = async (value) => {
     setKaranehParams(
      this.state.paydate,
      value.min,
      value.max,
      this.state.ratio,
      this.state.KaranehData.SetadHours,
      this.state.KaranehData.SafHours
    );
  };
  handleChangeSwitch = (item, checked) => {
    this.setState({ checked: { ...this.state.checked, [item]: checked } });
  };
  handleRangeValue = (value) => {
    this.setState({ value });
  };
  async componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 20,
    });
    this.getKaranehDates();
  }
  getKaranehDates = async () => {
    const { data: KaranehDates } = await getKaranehDates();
    this.setState({
      KaranehDates,
    });
  };
  handleSave = () => {
    //console.log(this.state);
    const data = setKaranehParams(
      this.state.paydate,
      this.state.value.min,
      this.state.value.max,
      this.state.ratio,
      this.state.KaranehData.SetadHours,
      this.state.KaranehData.SafHours
    );
    !data
      ? this.showMessage("اشکال در انجام عملیات", "error")
      : this.showMessage("اطلاعات ثبت شد", "success");
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
  handleFillData = async () => {
    // console.log(this.state);
    let str = "";
    for (const [key, value] of Object.entries(this.state.checked)) {
      
      str += value ? "1" : "0";
    }
    //console.log(str);
    const { data: KaranehData } = await getKaranehData1(
      this.state.ratio,
      this.state.diff,
      this.state.paydate,
      str
    );

    this.setState(
      {
        KaranehData,
      },
      () => {
        const { min, max } = { ...this.state.KaranehData };
        const value = { ...this.state.value };
        value.min = min;
        value.max = max;
        this.setState({ value });
        this.childSupervisorsRank.refresh(this.state.ratio, this.state.paydate);
        this.childBranchesRank.refresh(this.state.ratio, this.state.paydate);
        this.childKarnamehsh.refresh(this.state.paydate);
        this.childKarnameho.refresh(this.state.paydate);
        this.childAddition.refresh(this.state.paydate);
        this.childKaranehPersonel.refresh(
          this.state.paydate,
          this.state.KaranehData.SafHours,
          this.state.KaranehData.SetadHours
        );
      }
    );
    //console.log(this.state.KaranehData.max);
  };
  // handleBarClick(element, id) {
  //   //console.log(`The bin ${element.text} with id ${id} was clicked`);
  //   const newState = { ...this.state };
  //   newState[e.currentTarget.name] = e.currentTarget.value;
  //   this.setState(newState);
  // }
  handleChange = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
    //console.log(this.state);
  };
  handleSetadHours = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState.KaranehData[e.currentTarget.name] = e.currentTarget.value;
    //console.log(newState.KaranehData.SafHours);
    //console.log(newState.KaranehData.SetadHours);
    newState.diff =
      newState.KaranehData.SafHours - newState.KaranehData.SetadHours;
    this.setState(newState, () => this.handleFillData());

    //console.log(this.state);
  };
  handleRefresh = () => {
    // console.log("handleRefresh", this.state);
    this.handleFillData();
    // this.childSupervisorsRank.refresh(this.state.ratio, this.state.paydate);
    // this.childBranchesRank.refresh(this.state.ratio, this.state.paydate);
    // this.childKarnamehsh.refresh(this.state.paydate);
    // this.childKarnameho.refresh(this.state.paydate);
    // this.childAddition.refresh(this.state.paydate);
  };
  formatNumber = (inputNumber) => {
    //console.log(inputNumber);
    let formetedNumber = Number(inputNumber)
      .toFixed(2)
      .replace(/\d(?=(\d{3})+\.)/g, "$&,");
    let splitArray = formetedNumber.split(".");
    if (splitArray.length > 1) {
      formetedNumber = splitArray[0];
    }

    //return (formetedNumber = "NaN" ? "" : formetedNumber);
    return formetedNumber;
  };
  render() {
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
                  style={{ minHeight: this.state.height, direction: "rtl" }}
                >
                  <div className="brand-wrapper ">
                    <div className="row">
                      <div className="col-lg-6 border bg-light">
                        <div className="row">
                          <div className="col-lg">
                            <Select
                              onChange={this.handleChange}
                              name="paydate"
                              label="تاریخ"
                              error=""
                              options={this.state.KaranehDates}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg">
                            <div className="form-inline">
                              <InputPrepend
                                type="text"
                                name="ratio"
                                id="ratio"
                                label="ضریب بودجه"
                                error=""
                                placeholder="ضریب بودجه"
                                value={this.state.ratio}
                                onChange={this.handleChange}
                              />
                              <div
                                className="d-inline  btn btn-outline-danger btn-sm m2"
                                onClick={this.handleRefresh}
                              >
                                نمایش
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className=" row  " style={{ direction: "ltr" }}>
                          <div className="col-lg bg-success ">
                            اعمال حد: حداقل {this.state.value.min} حداکثر
                            {this.state.value.max}
                          </div>
                          <div class="form-control">
                            <InputRange
                              maxValue={5000}
                              minValue={0}
                              formatLabel={(value) => ``}
                              value={this.state.value}
                              onChange={(value) => this.handleRangeValue(value)}
                              onChangeComplete={(value) =>
                                this.handleRange(value)
                              }
                            />
                          </div>
                        </div>
                        <div className="row border-bottom ">
                          <div className="col-lg bg-success text-white ">
                            اهداف کمی سال 1399
                          </div>
                          <div class="w-100"></div>
                          <div className=" col ">
                            <div className="row">
                              <Switch
                                name="SH01"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH01}
                                label="سپرده قرض الحسنه جاری"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH02"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH02}
                                label="سپرده قرض الحسنه پس انداز"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH03"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH03}
                                label="سپرده قرض الحسنه کوتاه مدت"
                              />
                            </div>
                          </div>
                          <div className=" col  ">
                            <div className="row">
                              <Switch
                                name="SH04"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH04}
                                label="سپرده قرض الحسنه بلند مدت"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH05"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH05}
                                label="سپرده نقدی صدور ضمانت نامه"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH06"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH06}
                                label="سایر سپرده ها"
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" row border-bottom">
                          <div className=" col  ">
                            <div className="row">
                              <Switch
                                name="SH07"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH07}
                                label="مانده مطالبات موزون"
                              />
                            </div>
                          </div>
                          <div className=" col  ">
                            <div className="row">
                              <Switch
                                name="SH08"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH08}
                                label="نسبت مطالبات غیر جاری به تسهیلات"
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" row border-bottom">
                          <div className=" col  ">
                            <div className="row">
                              <Switch
                                name="SH09"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH09}
                                label="درآمدهای غیر مشاع"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH011"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH11}
                                label="توقف دستگاههای خودپرداز"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH13"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH13}
                                label="افزایش تعداد مشتریان اینترنت بانک"
                              />
                            </div>
                          </div>
                          <div className=" col  ">
                            <div className="row">
                              <Switch
                                name="SH10"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH10}
                                label="افزایش چکهای عادی واگذاری"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH12"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH12}
                                label="نسبت پایانه های فروش زیان ده"
                              />
                            </div>
                            <div className="row">
                              <Switch
                                name="SH14"
                                onChange={this.handleChangeSwitch}
                                checked={this.state.checked.SH14}
                                label="افزایش تعداد مشتریان همراه بانک"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-lg bg-success text-white ">
                            مدیریت شعب
                          </div>
                          <div class="w-100"></div>
                          <div className="col-lg">
                            <Input
                              id="SafTotal"
                              type="text"
                              name="SafTotal"
                              label="جمع مبلغ کارانه"
                              error=""
                              placeholder=""
                              value={this.formatNumber(
                                this.state.KaranehData.SafTotal
                              )}
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              type="text"
                              id="SafHours"
                              name="SafHours"
                              label="میانگین ساعت اضافه کار"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.SafHours}
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              id="SafTotal"
                              type="text"
                              name="SafTotal"
                              label="متوسط تخصیصی"
                              error=""
                              placeholder=""
                              value={this.formatNumber(
                                this.state.KaranehData.SafAvg
                              )}
                            />
                          </div>
                        </div>
                        <div className="row ">
                          <dic className="col-lg bg-success text-white">
                            ستاد
                          </dic>
                          <div class="w-100"></div>
                          <div className="col-lg">
                            <Input
                              id="SetadTotal"
                              type="text"
                              name="SetadTotal"
                              label="جمع مبلغ کارانه "
                              error=""
                              placeholder=""
                              value={this.formatNumber(
                                this.state.KaranehData.SetadTotal
                              )}
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              id="SetadHours"
                              type="number"
                              name="SetadHours"
                              label="ساعت اضافه کار"
                              error=""
                              placeholder=""
                              onChange={this.handleSetadHours}
                              value={
                                this.state.KaranehData.SafHours -
                                this.state.diff
                              }
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              id="SetadAvg"
                              type="text"
                              name="SetadTotal"
                              label="متوسط تخصیصی"
                              error=""
                              placeholder=""
                              value={this.formatNumber(
                                this.state.KaranehData.SetadAvg
                              )}
                            />
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg">
                            <Input
                              type="text"
                              name="destination"
                              label="جمع کارانه عادی"
                              error=""
                              placeholder=""
                              value={this.formatNumber(
                                this.state.KaranehData.Total
                              )}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg">
                            <Addition
                              paydate={this.state.paydate}
                              ref={(instanceAddition) => {
                                this.childAddition = instanceAddition;
                              }}
                            />
                          </div>
                          {/* <div className="col-lg">
                            <Input
                              id="PersonAdditionTotal"
                              type="text"
                              name="PersonAdditionTotal"
                              label="جمع مبلغ کارانه کارگزاری"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.PersonAdditionTotal}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              id="PersonAdditionHours"
                              type="text"
                              name="PersonAdditionHours"
                              label="جمع ساعت کارانه کارگزاری"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.PersonAdditionHours}
                              onChange={this.handleChange}
                            />
                          </div> */}
                        </div>
                        {/* <div className="row">
                          <div className="col-lg">
                            <Input
                              id="BranchAdditionTotal"
                              type="text"
                              name="BranchAdditionTotal"
                              label="جمع مبلغ کارانه ارزی"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.BranchAdditionTotal}
                              onChange={this.handleChange}
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              id="BranchAdditionHours"
                              type="text"
                              name="BranchAdditionHours"
                              label="جمع ساعت کارانه ارزی"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.BranchAdditionHours}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div> */}
                        <div className="row">
                          <div className="col-lg">
                            <Input
                              id="MixAmount"
                              type="text"
                              name="MixAmount"
                              label="درصد تحقق تجمیعی"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.MixAmount}
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              id="MonthlyAmount"
                              type="text"
                              name="MonthlyAmount"
                              label="درصد تحقق ماهانه"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.MonthlyAmount}
                            />
                          </div>
                          <div className="col-lg">
                            <Input
                              id="Final"
                              type="text"
                              name="Final"
                              label="درصد تحقق نهایی"
                              error=""
                              placeholder=""
                              value={this.state.KaranehData.Final}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg">
                            <Input
                              type="text"
                              name="destination"
                              label="جمع کل قابل پرداخت"
                              error=""
                              placeholder=""
                              value={this.formatNumber(
                                this.state.KaranehData.TotalSum
                              )}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg">
                            <div
                              className="btn btn-block btn-success btn"
                              onClick={this.handleSave}
                            >
                              ذخیره نهایی
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-6">
                        <div className="row">
                          <div className="col-md">
                            <SupervisorsRank
                              ratio={this.state.ratio}
                              paydate={this.state.paydate}
                              ref={(instanceSupervisorsRank) => {
                                this.childSupervisorsRank = instanceSupervisorsRank;
                              }}
                            />
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-md mh-50">
                            <BranchesRank
                              ratio={this.state.ratio}
                              paydate={this.state.paydate}
                              handleRange={this.handleRange}
                              value={this.state.value}
                              handleRangeValue={this.handleRangeValue}
                              ref={(instanceBranchesRank) => {
                                this.childBranchesRank = instanceBranchesRank;
                              }}
                            />
                          </div>
                        </div>
                        {/* <div className="row">
                          <div className="col-md">
                            <Supervisors />
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md">
                            <CollapsibleTable />
                          </div>
                        </div> */}
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-6 border">
                        <KarnamehO
                          paydate={this.state.paydate}
                          type="O"
                          ref={(instanceKarnameho) => {
                            this.childKarnameho = instanceKarnameho;
                          }}
                        />
                      </div>
                      <div className="col-lg-6 border">
                        <KarnamehSH
                          paydate={this.state.paydate}
                          type="SH"
                          ref={(instanceKarnamehsh) => {
                            this.childKarnamehsh = instanceKarnamehsh;
                          }}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg border">
                        <KaranehPersonel
                          paydate={this.state.paydate}
                          ratio={this.state.ratio}
                          ratiosaf={this.state.KaranehData.SafHours}
                          ratiosetad={
                            this.state.KaranehData.SafHours - this.state.diff
                          }
                          ref={(instanceKaranehPersonel) => {
                            this.childKaranehPersonel = instanceKaranehPersonel;
                          }}
                        />
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

export default CEOCommitNew;
