import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import InputPrepend from "./common/inputPrepend";
import { budgetInsert, BudgetGetData } from "../services/budget";
import "../assets/css/tree.css";
import TreeMenu, {
  defaultChildren,
  ItemComponent,
} from "react-simple-tree-menu";
class BudgetTitle extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "سرفصل بودجه" },
    titleData: [],
    selectedTitle: "سرفصلی انتخاب نشده است",
    selectedTitleId: 0,
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
                      <div className=" col-lg-6 col-md-12 mt-1 border border-dark rounded pt-2">
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
                            />
                          </div>
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
                        style={{
                          overflow: "scroll",
                          height: 500,
                          direction: "ltr",
                        }}
                      >
                        <TreeMenu
                          data={this.state.titleData}
                          onClickItem={({ ...props }) => {
                            this.setState({
                              selectedTitle: props.label,
                              selectedTitleId: props.key,
                            });
                          }}
                        >
                          {({ search, items }) => (
                            <div className=" p-1 ">
                              <div class="input-group input-group-sm mb-3">
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
