import React, { Component } from "react";
import Tree from "./common/tree";
//import { accessControl } from "../services/accessControl";
class PersonsLocation extends Component {
  state = {
    width: 0,
    height: 0,
    pageContent: { title: "جابجایی پرسنل" },
  };
  componentDidMount() {
    //accessControl().then(console.log(true)).catch(console.log(false));
    //this.props.history.push("/login")
    //console.log(this.props);
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  render() {
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
                  <div className="brand-wrapper ">
                    <Tree {...this.props} employee={this.props.employee} />;
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

export default PersonsLocation;
