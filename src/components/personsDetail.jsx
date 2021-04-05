import React, { Component } from "react";
import Input from "./common/inputPrepend";
import Inputlbl from "./common/input";
import Select from "../components/common/select";
import {
  getPersondata,
  EmploymentTypeGetAllData,
  PostTypeGetallData,
  UpdatePersons,
} from "../services/persons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//import logo from "../assets/images/Logo Amar without.png";
class PersonsDetail extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "مشخصات پرسنل" },
    nationalCode: 0,
    statusData: [
      { id: "شاغل", name: "شاغل" },
      { id: "بازنشسته", name: "بازنشسته" },
      { id: "مامور", name: "مامور" },
      { id: "مرخصی", name: "مرخصی" },
      { id: "انفصال", name: "انفصال" },
      { id: "استعفاء", name: "استعفاء" },
    ],
    vajedData: [
      { id: "بازنشسته", name: "بازنشسته" },
      { id: "به درخواست مدیر نمی باشد", name: "به درخواست مدیر نمی باشد" },
      { id: "اخراج", name: "اخراج" },
      { id: "مامور", name: "مامور" },
      { id: "حذف موقت", name: "حذف موقت" },
      { id: "استعفا", name: "استعفا" },
      { id: "مرخصی/غیبت", name: "مرخصی/غیبت" },
      { id: "ترک خدمت", name: "ترک خدمت" },
      { id: "نامشخص", name: "نامشخص" },
      { id: "مشمول", name: "مشمول" },
      { id: "نمی باشد", name: "نمی باشد" },
    ],
    vajed: "",
    EmploymentTypeData: [],
    employmentType: 0,
    postTypeData: [],
    postType: 0,
    status: 0,
    person: {
      Name: "",
      Family: "",
      NationalCode: "",
      AccountNo: "",
      Status: "",
      PostTypeId: 0,
    },
  };
  componentDidMount() {
    this.refresh();
  }
  refresh = async () => {
    const { data: postTypeData } = await PostTypeGetallData();
    const { data: EmploymentTypeData } = await EmploymentTypeGetAllData();
    //console.log(postType);
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
      postTypeData,
      EmploymentTypeData,
    });
  };
  handleBarClick(element, id) {
    console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
  handleChange = (e) => {
    //alert(e.currentTarget.value);
    const state = { ...this.state };
    state[e.currentTarget.name] = e.currentTarget.value;
    this.setState(state, () => console.log(this.state));
  };
  handleSearch = async (e) => {
    e.preventDefault();
    if (this.state.nationalCode.length !== 10) {
      this.showMessage("کد ملی را وارد کنید", "error");
      return false;
    }
    //console.log(this.state.nationalCode);
    const { data: person } = await getPersondata(this.state.nationalCode);
    //console.log(person.length);
    if (person.length !== 0) {
      // console.log(
      //   this.setSelectedValue(
      //     this.state.EmploymentType,
      //     person[0].EmploymentTypeId
      //   )
      // );
      let newstatusData = this.setSelectedValue(
        this.state.statusData,
        person[0].Status
      );
      let newEmploymentType = this.setSelectedValue(
        this.state.EmploymentTypeData,
        person[0].EmploymentTypeId
      );

      let newPostType = this.setSelectedValue(
        this.state.postTypeData,
        person[0].PostTypeId
      );
      let newVajedData = this.setSelectedValue(
        this.state.vajedData,
        person[0].vajed
      );
      //console.log(newstatusData, newEmploymentType);
      this.setState({
        person: person[0],
        statusData: newstatusData,
        EmploymentTypeData: newEmploymentType,
        postTypeData: newPostType,
        vajedData: newVajedData,
      });
    } else {
      this.showMessage("شخص مورد نظر پیدا نشد ", "error");
      return false;
    }
  };
  setSelectedValue = (dataset, val) => {
    //console.log(dataset);
    let newdataset = dataset.map((i) =>
      i.id === val
        ? { id: i.id, name: i.name, selected: "selected" }
        : { id: i.id, name: i.name, selected: "" }
    );
    return newdataset;
  };
  handleUpdate = async (e) => {
    // console.log(this.state.nationalCode,
    //   this.state.status,
    //   this.state.employmentType)

    const { data } = await UpdatePersons(
      this.state.nationalCode,
      this.state.status,
      this.state.postType,
      this.state.vajed
    );
    !data
      ? this.showMessage("خطا در به روزرسانی اطلاعات", "error")
      : this.showMessage("بروزرسانی انجام شد", "success");
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
                    <div className="row bg-light border">
                      <div className="col-8 mt-3">
                        <Input
                          type="text"
                          name="nationalCode"
                          label="کد ملی"
                          error=""
                          placeholder="کد ملی را جهت جستجو وارد کنید"
                          value={this.state.nationalCode}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className="col-4 mt-3">
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
                    <div className="row ">
                      <div className="col">
                        <Inputlbl
                          type="text"
                          name="name"
                          label="نام"
                          error=""
                          placeholder=""
                          value={this.state.person.Name}
                          disabled
                          //onChange={this.handleChange}
                        />
                      </div>
                      <div className="col">
                        <Inputlbl
                          type="text"
                          name="name"
                          label="نام خانوادگی"
                          error=""
                          placeholder=""
                          value={this.state.person.Family}
                          disabled
                          //onChange={this.handleChange}
                        />
                      </div>
                      <div className="col">
                        <Inputlbl
                          type="text"
                          name="name"
                          label="کد ملی"
                          error=""
                          placeholder=""
                          value={this.state.person.NationalCode}
                          disabled
                          //onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Inputlbl
                          type="text"
                          name="name"
                          label="شماره حساب"
                          error=""
                          placeholder=""
                          value={this.state.person.AccountNo}
                          disabled
                          //onChange={this.handleChange}
                        />
                      </div>
                      <div className="col">
                        <Select
                          id="status"
                          onChange={this.handleChange}
                          name="status"
                          label="وضعیت اشتغال"
                          error=""
                          options={this.state.statusData}
                        />
                      </div>
                      <div className="col">
                        <Select
                          id="postType"
                          onChange={this.handleChange}
                          name="postType"
                          label="پست سازمانی"
                          error=""
                          options={this.state.postTypeData}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col">
                        <Select
                          id="employmentType"
                          onChange={this.handleChange}
                          name="employmentType"
                          label="نوع استخدام"
                          error=""
                          options={this.state.EmploymentTypeData}
                          disabled
                        />
                      </div>
                      <div className="col">
                        <Select
                          id="vajed"
                          onChange={this.handleChange}
                          name="vajed"
                          label="واجد دریافت"
                          error=""
                          options={this.state.vajedData}
                        />
                      </div>
                      <div className="col">
                        <button
                          name=" mt-3"
                          className="btn btn-success btn-block "
                          onClick={(e) => {
                            //alert(e);
                            this.handleUpdate();
                          }}
                        >
                          <p>ثبت</p>
                        </button>
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

export default PersonsDetail;
