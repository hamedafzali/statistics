import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputPrepend from "./common/inputPrepend";
import TreeMenu, { defaultChildren } from "react-simple-tree-menu";
import { budgetInsert, BudgetGetData } from "../services/budget";
import "../assets/css/tree.css";
import Switch from "./common/switch";
class BudgetTitle extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "سرفصل بودجه" },
    titleData: [],
    selectedTitle: "سرفصلی انتخاب نشده است",
    selectedTitleId: 0,
    selectedTitleCode: "",
    title: "",
    isEdit: false,
    isEndPoint: false,
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.fillGrid();
  }
  handleChange = (e) => {
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
  };
  switchHandler = (name, checked) => {
    this.setState({ [name]: checked });
    //console.log(name, checked);
  };
  handleSave = async () => {
    if (this.state.selectedTitleId === 0) {
      this.showMessage("سرفصل مربوطه را از درختواره انتخاب کنید", "error");
      return false;
    } else if (this.state.code.length === 0) {
      this.showMessage("کد سرفصل را وارد کنید", "error");
      return false;
    }
    const { data } = await budgetInsert({
      pid: this.state.selectedTitleId,
      title: this.state.title,
      code: this.state.code,
      level: this.state.level,
      isendpoint: this.state.isEndPoint,
    });
    if (!data) {
      this.showMessage("خطا در انجام عملیات", "error");
      return false;
    } else {
      this.showMessage("سند ثبت شد", "success");
      this.fillGrid();
      this.setState({ title: "", code: "", isEdit: false });
    }
  };
  fillGrid = () => {
    this.setState({ data: null }, async () => {
      const { data: titleData } = await BudgetGetData();
      this.setState({ titleData });
    });
  };
  editHandler = () => {
    if (this.state.selectedTitleId !== 0)
      this.setState({
        title: this.state.selectedTitle.replace(
          this.state.selectedTitleCode,
          ""
        ),
        code: this.state.selectedTitleCode,
        isEdit: true,
      });
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
                    <div className="row mt-n5">
                      <div
                        className=" col-lg-6 col-md-12 mt-1 border border-dark rounded pt-2"
                        data-aos="fade-left"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                      >
                        <div className="row border border-success rounded p-2 m-1">
                          <div className=" col-12 mt-1 text-right ">
                            سرفصل انتخاب شده:
                            <strong
                              className={
                                !this.state.selectedTitleId
                                  ? "text-danger mr-2"
                                  : "text-success mr-2"
                              }
                            >
                              {this.state.selectedTitle}
                            </strong>
                            <div
                              className="btn btn-outline-success btn-block"
                              onClick={this.editHandler}
                            >
                              ویرایش
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className=" col-12 mt-1">
                            <InputPrepend
                              type="text"
                              name="title"
                              id="title"
                              label="عنوان سرفصل بودجه"
                              error=""
                              placeholder=""
                              value={this.state.title}
                              onChange={this.handleChange}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className=" col-12 mt-1 ">
                            <InputPrepend
                              type="text"
                              name="code"
                              id="code"
                              label="کد سرفصل بودجه"
                              error=""
                              placeholder=""
                              value={this.state.code}
                              onChange={this.handleChange}
                              disabled={this.state.isEdit}
                            />
                          </div>
                        </div>

                        <div className="row text-right">
                          <div className=" col-12 mt-1 ">
                            <Switch
                              name="isEndPoint"
                              label=" ثبت سند"
                              checked={this.state.isEndPoint}
                              onChange={this.switchHandler}
                            />
                          </div>
                        </div>
                        <div className="row">
                          <div className=" col-12 mt-2">
                            <div
                              className="  btn btn-outline-danger btn m2 btn-block"
                              onClick={this.handleSave}
                            >
                              ذخیره
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className=" col-lg-6 col-md-12 mt-1 border border-dark rounded pt-2"
                        data-aos="fade-right"
                        data-aos-offset="200"
                        data-aos-delay="50"
                        data-aos-duration="1000"
                        style={{
                          overflow: "scroll",
                          height: 500,
                          direction: "ltr",
                        }}
                      >
                        <TreeMenu
                          data={this.state.titleData}
                          onClickItem={({ ...props }) => {
                            console.log(props);
                            this.setState({
                              selectedTitle: props.label,
                              selectedTitleId: parseInt(
                                props.key.split("/")[
                                  props.key.split("/").length - 1
                                ]
                              ),
                              level: props.level,
                              selectedTitleCode: props.value,
                              isEndPoint: props.isEndPoint,
                            });
                          }}
                        >
                          {({ search, items }) => (
                            <div className=" p-1 ">
                              <div className="input-group input-group-sm mb-3">
                                <input
                                  onChange={(e) => search(e.target.value)}
                                  placeholder="جستجو"
                                  className="form-control text-right"
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

                    {/* <div className="row">
                      <div className="col col-12">
                        <div
                          className="table table-striped border text-center"
                          style={{ textAlign: "center" }}
                        >
                          <thead>
                            <tr>
                              <th scope="col" className="col-6 ">
                                نام سرفصل
                              </th>
                              <th scope="col" className="col-6 ">
                                کد سرفصل
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.titleData.map((i) => (
                              <tr>
                                <td>{i.Title}</td>
                                <td>{i.Code}</td>
                              </tr>
                            ))}
                          </tbody>
                        </div>
                      </div>
                    </div> */}
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

export default BudgetTitle;
