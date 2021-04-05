import React, { Component } from "react";
import under from "../assets/images/Under-Cunstruction.png";
class UnderConstruction extends Component {
  state = {
    width: 0,
    height: 0,
    pageContent: { title: "در درست ساخت" },
  };
  componentDidMount() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
    return (
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
        <div className="container ">
          <div className="card login-card ">
            <div className="row no-gutters">
              <div className="col-md">
                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <div className="brand-wrapper ">
                    <img src={under} alt=""></img>
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

export default UnderConstruction;
