import React, { Component } from "react";
import Input from "./common/input";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class RelocateRequest extends Component {
  render() {
    return (
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0  ">
        <div className="container ">
          <ToastContainer className="text-center" />
          <div className="card login-card ">
            <div className="row no-gutters">
              <div className="col-md">
                <div
                  className="card-body "
                  style={{ minHeight: this.state.height }}
                >
                  <div className="brand-wrapper ">
                    <h4>{this.state.pageContent.title}</h4>
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

export default RelocateRequest;
