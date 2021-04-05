import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import Select from "./common/select";
import { getKaranehDates } from "../services/karanehDates";
import {
  getKaranehAccessList,
  karanehAccessUpdate,
  karanehAccessUpdateAll,
} from "../services/karanehData";
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
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
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
                  <div className="row bg-light ">
                    <div className="col col-4">
                      <Select
                        onChange={this.handleChange}
                        name="level"
                        error=""
                        options={this.state.levels}
                        width="250px"
                        style={{ width: 250 }}
                      />
                    </div>
                  </div>
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
      </main>
    );
  }
}

export default KaranehAccess;
