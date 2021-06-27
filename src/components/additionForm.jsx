import React, { Component } from "react";
import Input from "./common/inputtext";
import Inputlbl from "./common/input";
import { getPersondata, PersonAdditionInsert } from "../services/persons";
import Select from "./common/selectPrepend";
import { getKaranehDates } from "../services/karanehDates";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import logo from "../assets/images/Logo Amar without.png";
import AdditionReg from "./additionReg";
class AdditionRegForm extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "ثبت کارانه خدمات کارگزاری" },
    nationalCode: "",
    KaranehDates: [],
    statusData: [
      { id: "شاغل", name: "شاغل" },
      { id: "بازنشسته", name: "بازنشسته" },
      { id: "مامور", name: "مامور" },
      { id: "مرخصی", name: "مرخصی" },
      { id: "انفصال", name: "انفصال" },
      { id: "استعفاء", name: "استعفاء" },
    ],
    postType: [],
    status: 0,
    hour: 0,
    amount: 0,
    person: {
      Name: "",
      Family: "",
      NationalCode: "",
      AccountNo: "",
      Status: "",
      PostTypeId: 0,
    },
    paydate: "",
  };
  async componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.getKaranehDates();
  }
  getKaranehDates = async () => {
    const { data: KaranehDates } = await getKaranehDates();
    this.setState({
      KaranehDates,
    });
  };
  handleSearch = async (e) => {
    e.preventDefault();
    if (this.state.nationalCode.length !== 10) {
      this.showMessage("کد ملی را وارد کنید", "error");
      return false;
    }
    //console.log(this.state.nationalCode);
    const { data: person } = await getPersondata(this.state.nationalCode);
    console.log(person.length);
    if (person.length !== 0) this.setState({ person: person[0] });
    else {
      this.showMessage("شخص مورد نظر پیدا نشد ", "error");
      return false;
    }
  };
  handleChange = (e) => {
    let newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    //console.log("old", newState);
    this.setState(newState, () => {
      this.setState(newState);
      this.hadnleRefresh();
      //console.log("new", this.state);
    });
  };
  hadnleRefresh = () => {
    //   //console.log(this.state);
    this.childAdditionReg.refresh();
  };
  handleInsert = async (e) => {
    if (this.state.paydate === "") {
      this.showMessage("تاریخ را انتخاب کنید", "error");
      return false;
    }
    if (this.state.hour === 0) {
      this.showMessage("ساعت را وارد کنید", "error");
      return false;
    }
    if (this.state.hour > 75 || this.state.hour < 1) {
      this.showMessage("مقدار غیر مجاز میباشد", "error");
      return false;
    }

    const { data } = await PersonAdditionInsert(
      this.state.person.NationalCode,
      this.state.hour,
      this.state.amount,
      this.state.paydate,
      2
    );
    //console.log(data);
    if (!data === 0) this.showMessage("خطا در ثبت اطلاعات", "error");
    else {
      this.showMessage("ثبت شد", "success");

      this.setState(
        {
          hour: 0,
          amount: 0,
          person: {
            Name: "",
            Family: "",
            NationalCode: "",
            AccountNo: "",
            Status: "",
            PostTypeId: 0,
          },
        },
        () => {
          this.hadnleRefresh();
        }
      );
    }

    //console.log(person[0]);
    //this.setState({ person: person[0] });
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
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
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
                      <div className="col-md-12 col-lg-4">
                        <Select
                          id="paydate"
                          onChange={this.handleChange}
                          name="paydate"
                          label="تاریخ"
                          error=""
                          options={this.state.KaranehDates}
                          //value={this.state.selectedOption}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="brand-wrapper ">
                    <div className="row bg-light">
                      <div className="col-md-12 col-lg-8 mt-3">
                        <Input
                          type="text"
                          name="nationalCode"
                          //label="جستجو"
                          error=""
                          placeholder="کد ملی را جهت جستجو وارد کنید"
                          value={this.state.nationalCode}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-12 col-lg-4 mt-3">
                        <button
                          name=" mt-3"
                          className="btn btn-danger btn-block "
                          onClick={(e) => {
                            //alert(e);
                            this.handleSearch(e);
                          }}
                        >
                          <p>جستجو</p>
                        </button>
                      </div>
                    </div>
                    <div className="row bg-light border-bottom">
                      <div className="col-md-12 col-lg-4">
                        <Inputlbl
                          type="text"
                          name="name"
                          label="نام"
                          error=""
                          placeholder=""
                          value={this.state.person.Name}
                          //onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-12 col-lg-4">
                        <Inputlbl
                          type="text"
                          name="name"
                          label="نام خانوادگی"
                          error=""
                          placeholder=""
                          value={this.state.person.Family}
                          //onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-12 col-lg-4">
                        <Inputlbl
                          type="text"
                          name="name"
                          label="کد ملی"
                          error=""
                          placeholder=""
                          value={this.state.person.NationalCode}
                          //onChange={this.handleChange}
                        />
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-12 col-lg-4">
                        <Inputlbl
                          type="text"
                          name="hour"
                          label="ساعت"
                          error=""
                          placeholder=""
                          value={this.state.hour}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-12 col-lg-4">
                        <Inputlbl
                          type="text"
                          name="amount"
                          label="مبلغ"
                          error=""
                          placeholder=""
                          value={this.state.amount}
                          //onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-md-12 col-lg-4">
                        <button
                          name=""
                          className="btn btn-success btn-block mt-4"
                          onClick={(e) => {
                            e.preventDefault();
                            this.handleInsert(e);
                          }}
                        >
                          <p>ثبت</p>
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <AdditionReg
                          paydate={this.state.paydate}
                          ref={(instanceAdditionReg) => {
                            this.childAdditionReg = instanceAdditionReg;
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

export default AdditionRegForm;
