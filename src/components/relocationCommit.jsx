import React, { Component } from "react";
import Relocation from "./relocation";
//import Select from "./common/selectPrepend";
import { getKaranehDates } from "../services/karanehDates";

//import BarChart from "react-bar-chart";
class RelocationCommit extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "تایید تغییرات پرسنلی" },
    paydate: "139911",
    KaranehDates: [],
    selectedOption: 1,
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 20,
    });
    this.getKaranehDates();
    this.handleRefresh();
  }

  getKaranehDates = async () => {
    const { data: KaranehDates } = await getKaranehDates();
    this.setState({
      KaranehDates,
    });
  };
  handleChange = (e) => {
    let newState = { ...this.state };
    newState[e.currentTarget.name] = e.currentTarget.value;
    //console.log("old", newState);
    this.setState(newState, () => {
      this.handleRefresh();
    });
  };
  handleRefresh = () => {
    //console.log(this.state);
    this.childRelocation.refresh();
  };
  handleBarClick(element, id) {
    //console.log(`The bin ${element.text} with id ${id} was clicked`);
  }
  render() {
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    return (
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
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
                  {/* <div className="brand-wrapper ">
                    <Select
                      id="paydate"
                      onChange={this.handleChange}
                      name="paydate"
                      label="تاریخ"
                      error=""
                      options={this.state.KaranehDates}
                      //value={this.state.selectedOption}
                    />
                  </div> */}
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

export default RelocationCommit;
