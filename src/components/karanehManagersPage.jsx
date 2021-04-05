import React, { Component } from "react";
import KaranehManagers from "./karanehManagers";

class KaranehManagersPage extends Component {
  state = {
    chartwidth: 500,
    width: 0,
    height: 0,
    pageContent: { title: "کارانه مدیران و مشاورین" },
  };
  componentDidMount() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight - 100,
    });
  }

  handleBarClick(element, id) {
    //console.log(`The bin ${element.text} with id ${id} was clicked`);
  }

  render() {
    //const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    return (
      <main className="d-flex align-items-center  py-md-0  ">
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
                  <div className="row bg-light border">
                    <KaranehManagers />
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

export default KaranehManagersPage;
