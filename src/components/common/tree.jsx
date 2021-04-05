import React, { Component } from "react";
import TreeMenu, { defaultChildren } from "react-simple-tree-menu";
import Select from "./selectPrepend";
//import Input from "./input";
import "../../../node_modules/react-simple-tree-menu/dist/main.css";
import Relocation from "../relocation";
import Axios from "axios";
//import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import arrow from "../../assets/images/arrow.svg";
import { getKaranehDates } from "../../services/karanehDates";
import { ChartPerson, Chart } from "../../services/tree";
import { personLocationSetStatus } from "../../services/persons";
export default class Tree extends Component {
  state = {
    person: {
      name: "",
      nationalCode: "",
      sourceId: 0,
      destinationName: "",
      destinationCode: "",
      destinationId: 0,
    },
    description: "",
    tel: "0",
    personTreeData: [],
    chartTreeData: [],
    KaranehDates: [],
    deleteReasons: [
      { id: "حذف به علت مقصد نامشخص", name: "حذف به علت مقصد نامشخص" },
      { id: "حذف به علت بازنشستگی", name: "حذف به علت بازنشستگی" },
      { id: "حذف به علت مرخصی", name: "حذف به علت مرخصی" },
      { id: "حذف به علت مامور", name: "حذف به علت مامور" },
      { id: "حذف موقت", name: "حذف موقت" },
    ],
    paydate: "",
  };
  getKaranehDates = async () => {
    const { data: KaranehDates } = await getKaranehDates();
    this.setState({
      KaranehDates,
    });
  };
  fillTree = async () => {
    //console.log(this.state);
    //console.log(this.props);
    // let { data: personTreeData } = await Axios.get(
    //   `http://amar.pb.ir:8080/api/persons/chartPerson/${this.props.employee.ChartId}`
    // );
    let { data: personTreeData } = await ChartPerson(
      this.props.employee.ChartId
    );
    //console.log("personTreeData", personTreeData);
    let { data: chartTreeData } = await Chart(1);
    // this.setState({ personTreeData });
    // let { data: chartTreeData } = await Axios.get(
    //   `http://amar.pb.ir:8080/api/persons/chart/1`
    // );
    //console.log("chartTreeData", chartTreeData);
    this.setState({ chartTreeData, personTreeData });
  };
  hadnleRefresh = () => {
    //   //console.log(this.state);
    this.childRelocation.refresh();
  };

  componentDidMount() {
    //console.log(this.state);
    //console.log(this.props);
    this.fillTree();
    this.hadnleRefresh();
    this.getKaranehDates();
  }
  handleChange = (e) => {
    let newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    //console.log("old", newState);
    this.setState(newState, () => {
      this.hadnleRefresh();
      //console.log("new", this.state);
    });
  };
  handleDelete = async () => {
    if (this.state.paydate === "") {
      this.showMessage("تاریخ را انتخاب کنید", "error");
      return false;
    }
    if (this.state.person.nationalCode.length !== 10) {
      this.showMessage("فرد را انتخاب کنید", "error");
      return false;
    }
    if (this.state.description === "") {
      this.showMessage("علت حذف را انتخاب کنید", "error");
      return false;
    }
    if (window.confirm(`${this.state.person.name} حذف شود؟`)) {
       await personLocationSetStatus(
        this.state.person.nationalCode,
        this.state.description,
        this.state.person.sourceId,
        this.props.employee.NationalCode,
        this.state.paydate
      );
      this.hadnleRefresh();
    }

    // confirmAlert({
    //   title: "حذف پرسنل", // Title dialog
    //   message: `${this.state.person.name}`, // Message dialog
    //   childrenElement: () => (
    //     <div>
    //       <div>حذف مورد تایید است؟</div>
    //     </div>
    //   ),
    //   buttons: [
    //     {
    //       label: "بله",
    //       onClick: async () => {
    //         const { data: KaranehDates } = await personLocationSetStatus(
    //           this.state.person.NationalCode,
    //           0
    //         );
    //         this.setState({
    //           KaranehDates,
    //         });
    //       },
    //     },
    //     {
    //       label: "خیر",
    //     },
    //   ],
    // });
  };
  // handleConfirm = () => {
  //   confirmAlert({
  //     title: "تغییرات پرسنل", // Title dialog
  //     message: `${this.state.person.name}`, // Message dialog
  //     childrenElement: () => (
  //       <div>
  //         <div>انتقال به:{this.state.person.destinationName}</div>
  //         <br />
  //         <div>جابجایی مورد تایید است؟</div>
  //       </div>
  //     ),
  //     buttons: [
  //       {
  //         label: "بله",
  //         onClick: () => this.handleTransfer(),
  //       },
  //       {
  //         label: "خیر",
  //       },
  //     ],
  //   });
  // };
  handleTransfer = async (sw) => {
    //console.log(this.state);
    if (!sw) return false;
    if (this.state.paydate === "") {
      this.showMessage("تاریخ را انتخاب کنید", "error");
      return false;
    }
    if (this.state.person.nationalCode.length !== 10) {
      this.showMessage("فرد را انتخاب کنید", "error");
      return false;
    }
    if (this.state.person.destinationId === "") {
      this.showMessage("مقصد را انتخاب کنید", "error");
      return false;
    }
    // console.log(
    //   this.state.person.destinationId === this.state.person.sourceId,
    //   this.state
    // );
    if (this.state.person.destinationId === this.state.person.sourceId) {
      this.showMessage("مبدا و مقصد یکسان میباشد", "error");
      return false;
    }
    let { data } = await Axios.get(
      `http://amar.pb.ir:8080/api/persons/chartupdate/${this.state.person.nationalCode.trim()}/${
        this.state.person.sourceId
      }/-/${this.state.person.destinationCode.trim()}/${this.state.person.destinationName.trim()}/${
        this.state.person.destinationId
      }/${this.state.tel.trim()}/${this.state.paydate.trim()}/${this.props.employee.NationalCode.trim()}`
    );
    //console.log(data);
    if (!data) this.showMessage("اشکال در انجام عملیات", "error");
    else {
      this.hadnleRefresh();
      this.showMessage("درخواست انتقال ثبت شد", "success");
    }
    //this.fillTree();
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
      <main>
        <div className="container">
          <div className="card login-card bg-light ">
            <div className="m-3">
              <h5 className="card-title">مشخصات : {this.state.person.name}</h5>
              <h5 className="card-title">
                مقصد : {this.state.person.destinationName}
              </h5>
              <Select
                id="paydate"
                onChange={this.handleChange}
                name="paydate"
                label="تاریخ"
                error=""
                options={this.state.KaranehDates}
              />
              <div className="row no-gutters">
                <div
                  className="col-lg border bg-light "
                  style={{ overflow: "scroll", height: 500, direction: "ltr" }}
                >
                  <TreeMenu
                    data={this.state.chartTreeData}
                    onClickItem={({ ...props }) => {
                      console.log(props);
                      const tmpperson = this.state.person;
                      //console.log(tmpperson);
                      tmpperson.destinationId = parseInt(
                        props.key.split("/")[props.key.split("/").length - 1]
                      );
                      tmpperson.destinationCode = props.Code;
                      tmpperson.destinationName = props.label;

                      this.setState({ person: tmpperson });
                      //initialActiveKey = {};
                      console.log(this.state);
                    }}
                  >
                    {({ search, items, resetOpenNodes }) => (
                      <div>
                        <div className="row">
                          <div className="col">
                            <button
                              name="btnreset"
                              onClick={resetOpenNodes}
                              className="btn btn-link btn-sm"
                            >
                              بستن همه
                            </button>
                          </div>
                          <div className="col">
                            <strong>مقصد انتخاب کنید</strong>
                          </div>
                        </div>
                        {defaultChildren({ search, items })}
                      </div>
                    )}
                  </TreeMenu>
                </div>
                <button
                  name="btntransfer"
                  className="btn btn-success "
                  onClick={(e) => {
                    //alert(e);
                    this.handleTransfer(true);
                  }}
                >
                  <p>ثبت جابجایی</p>
                  <img src={arrow} alt=""/>
                </button>

                <div
                  className="col-md border bg-light "
                  style={{ overflow: "scroll", height: 500, direction: "ltr" }}
                >
                  {" "}
                  <p className="text-danger">
                    جهت مشاهده افراد شاغل در هر واحد روی علامت (+) کلیک نمایید
                  </p>
                  <TreeMenu
                    data={this.state.personTreeData}
                    onClickItem={({ ...props }) => {
                      console.log(props);
                      const tmpperson = this.state.person;
                      tmpperson.name = props.label;
                      tmpperson.nationalCode = props.Code;
                      tmpperson.sourceId = props.PId;
                      this.setState({ person: tmpperson });
                      console.log(this.state);
                    }}
                  >
                    {({ search, items, resetOpenNodes }) => (
                      <div>
                        <div className="row">
                          <div className="col">
                            <button
                              name="btnreset1"
                              onClick={resetOpenNodes}
                              className="btn btn-link btn-sm"
                            >
                              بستن همه
                            </button>
                          </div>
                          <div className="col">
                            <strong>کارمند را انتخاب کنید</strong>
                          </div>
                        </div>
                        {defaultChildren({ search, items })}
                      </div>
                    )}
                  </TreeMenu>
                </div>

                <ToastContainer className="text-center" />
              </div>

              <div className="row ">
                <div className="col-lg-8 ">
                  <Select
                    id="description"
                    onChange={this.handleChange}
                    name="description"
                    label="علت حذف"
                    error=""
                    options={this.state.deleteReasons}
                  />
                  {/* <Input
                    type="text"
                    id="description"
                    name="description"
                    label="توضیحات"
                    error=""
                    placeholder=""
                    value={this.state.person.description}
                    onChange={this.handleChange}
                  /> */}
                </div>

                <div className="col-lg-4">
                  <div className="form-group ">
                    <button
                      name=" mt-3"
                      className="btn btn-danger btn-block "
                      onClick={(e) => {
                        //alert(e);
                        this.handleDelete();
                      }}
                    >
                      <p>درخواست حذف از لیست این مدیریت</p>
                    </button>
                  </div>
                  {/* <Input
                    id="tel"
                    type="text"
                    name="tel"
                    label="تلفن تماس"
                    error=""
                    placeholder=""
                    value={this.state.tel}
                    onChange={this.handleChange}
                  /> */}
                </div>
              </div>
              {/* <div className="row bg-secondary text-light">
                <div className="col-lg-10 ">
                  <Input
                    type="text"
                    id="description"
                    name="description"
                    label="کد ملی شخص انتقال یافته را وارد کنید"
                    error=""
                    placeholder=""
                    value={this.state.person.description}
                    onChange={this.handleChange}
                  />
                </div>

                <div className="col-lg-2">
                  <div className="form-group-sm ">
                    <span id="">.</span>
                    <button
                      name="btntransfer mt-3"
                      className="btn btn-warning btn-block "
                      onClick={(e) => {
                        //alert(e);
                        this.handleDelete();
                      }}
                    >
                      <p>ثبت جدید</p>
                    </button>
                  </div>
                </div>
              </div> */}
              <div className="row text-right">
                <div className="col-lg text-left">
                  {/* <Select
                    id="paydate"
                    onChange={this.handleChange}
                    name="paydate"
                    label="تاریخ"
                    error=""
                    options={this.state.KaranehDates}
                  /> */}
                </div>
                <div className="col-lg text-left">
                  {/* <button
                    className="btn btn-outline-success "
                    onClick={this.handleConfirm}
                  >
                    <div>ثبت درخواست</div>
                  </button> */}
                </div>
              </div>
              <div className="row text-right">
                <div className="col-lg">
                  <Relocation
                    NationalCode={this.props.employee.NationalCode}
                    paydate={this.state.paydate}
                    ref={(instanceRelocation) => {
                      this.childRelocation = instanceRelocation;
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
