import React, { Component } from "react";
import Input from "./common/input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetPassword } from "../services/password";
class ResetPassword extends Component {
  state = {
    width: 0,
    height: 0,
    pageContent: { title: "ریست کلمه عبور" },
    account: { nationalCode: "", newPassword: "", newPasswordR: "" },
  };
  componentDidMount() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }
  handleChange = (e) => {
    //alert(e.currentTarget.name)
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  handlerChangePassword = async () => {
    console.log(this.props);
    if (this.state.account.newPasswordR !== this.state.account.newPassword) {
      this.showMessage("کلمه عبور جدید و تکرار آن تفاوت دارند", "error");
      return false;
    }
    if (this.state.account.newPassword.length === 0) {
      this.showMessage("کلمه عبور وارد نشده است", "error");
      return false;
    }
    const { data } = await resetPassword(
      this.state.account.nationalCode,
      this.state.account.newPassword
    );
    !data
      ? this.showMessage("اشکال در تغییر کلمه عبور", "error")
      : this.showMessage("کلمه عبور تغییر یافت", "success");
    //console.log(data);
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
                    <h4>{this.state.pageContent.title}</h4>
                    <div className="form-group-sm ">
                      <Input
                        type="text"
                        name="nationalCode"
                        label="کد ملی فرد "
                        error=""
                        value={this.state.account.oldPassword}
                        onChange={this.handleChange}
                      />
                      <Input
                        type="password"
                        name="newPassword"
                        label="کلمه عبور جدید "
                        error=""
                        placeholder="**************"
                        value={this.state.account.newPassword}
                        onChange={this.handleChange}
                      />
                      <Input
                        type="password"
                        name="newPasswordR"
                        label="تکرار کلمه عبور جدید "
                        error=""
                        placeholder="**************"
                        value={this.state.account.newPasswordR}
                        onChange={this.handleChange}
                      />
                      <input
                        name="login"
                        id="login"
                        className="btn btn-block login-btn mb-4"
                        type="button"
                        onClick={() => {
                          this.handlerChangePassword();
                        }}
                        value="تغییر کلمه عبور"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer className="text-center" />
      </main>
    );
  }
}

export default ResetPassword;
