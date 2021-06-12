import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputPrepend from "./common/inputPrepend";
import { budgetInsert, BudgetGetData } from "../services/budget";
import Select from "./common/selectPrepend";

class TasksComment extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "ثبت توضیحات وظایف" },
    titleData: [],
    tasks: [{ id: 1, name: "payesh" }],
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
    this.fillGrid();
  }
  handleChange = (e) => {
    //alert(e.currentTarget.name);
    const newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    this.setState(newState);
    //console.log(this.state);
  };

  handleSave = async () => {
    // if (this.state.documentTypeId === 0) {
    //   this.showMessage("نوع سند انتخاب نشده است", "error");
    //   return false;
    // } else if (this.state.documentTitle.length === 0) {
    //   this.showMessage("عنوان سند را وارد کنید", "error");
    //   return false;
    // } else if (this.state.unitId === 0) {
    //   this.showMessage("واحد مقصد انتخاب نشده است", "error");
    //   return false;
    // }
    const { data } = await budgetInsert({
      title: this.state.title,
      code: this.state.code,
    });
    if (!data) {
      this.showMessage("نوع سند انتخاب نشده است", "error");
      return false;
    } else {
      this.showMessage("سند ثبت شد", "success");
      this.fillGrid();
      this.setState({ title: "", code: "" });
    }
  };
  fillGrid = async () => {
    const { data: titleData } = await BudgetGetData();
    this.setState({ titleData });
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
                    <div className="row">
                      <div className=" col mt-1">
                        <InputPrepend
                          type="text"
                          rows="5"
                          name="title"
                          id="title"
                          label="شرح وظایف انجام شده"
                          error=""
                          placeholder=""
                          value={this.state.title}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className=" col-lg-5 col-md-12 mt-1">
                        <Select
                          type="text"
                          rows="5"
                          name="title"
                          id="title"
                          label="نوع وظیفه"
                          options={this.state.tasks}
                          error=""
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className=" col-lg-5 col-md-12 mt-1">
                        <InputPrepend
                          type="number"
                          name="code"
                          id="code"
                          label="مدت زمان صرف شده(به دقیقه)"
                          error=""
                          placeholder=""
                          value={this.state.code}
                          onChange={this.handleChange}
                        />
                      </div>
                      <div className=" col-lg-2 col-md-12 mt-2">
                        <div
                          className="btn btn-outline-danger btn m2 btn-block"
                          onClick={this.handleSave}
                        >
                          ذخیره
                        </div>
                      </div>
                    </div>
                    <div className="row">
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

export default TasksComment;
