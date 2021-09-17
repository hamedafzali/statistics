import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/employees";
import logo from "../assets/images/Logo Amar without.jpg";
import login from "../assets/images/Untitled-1.jpg";
import "../assets/css/login.css";
import { version } from "../../package.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Input from "./common/input";
//import jwtDecode from "jwt-decode";
import auth from "../services/authService";
class Login extends Component {
  state = {
    account: { username: "", password: "" },
    width: window.innerWidth,
    height: window.innerHeight - 100,
  };
  style = {
    backgroundColor: "#EFE",
  };
  titleStyle = {
    color: "blue",
    fontFamily: "Harmattan",
    fontSize: 30,
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  };
  componentDidMount() {
    this.props.handleLogout();
  }
  validate = () => {
    if (this.state.account.username.length !== 10) {
      this.showMessage("نام کاربری باید حداقل 10 رقم باشد", "error");
      return false;
    } else if (this.state.account.password.length === 0) {
      this.showMessage("کلمه عبور وارد نشده است", "error");
      return false;
    }
    return true;
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
  handlerLogin = () => {
    if (!this.validate()) return false;
    const { username, password } = this.state.account;
    let employee;
    auth.login(username, password, () => {
      employee = auth.getCurrentUser();
      try {
        if (!employee) {
          this.showMessage("نام کاربری یا کلمه عبور اشتباه میباشد ", "error");
        } else {
          this.props.handleLogin(employee);
          this.props.addEmployee(employee);
          //console.log("employees", this.props.employees);
          if (employee.UserStatus === 2) this.props.history.push("/password");
          else this.props.history.push("/mainpage");
        }
      } catch (e) {
        this.showMessage("نام کاربری یا کلمه عبور اشتباه میباشد ", "error");
      }
    });
  };
  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    return (
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0 ">
        <div className="container ">
          <div className="card login-card shadow">
            <div className="row no-gutters mt-n5">
              <div
                className="col-lg-5"
                data-aos="fade-left"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
                // data-aos-easing="ease-in-out"
                // data-aos-mirror="true"
                // data-aos-once="false"
                // data-aos-anchor-placement="top-center"
              >
                <img src={login} alt="login" className="login-card-img" />
              </div>
              <div
                className="col-lg-7 text-center "
                data-aos="fade-right"
                data-aos-offset="200"
                data-aos-delay="50"
                data-aos-duration="1000"
              >
                <div
                  className="card-body"
                  style={{
                    minHeight: this.state.height,
                  }}
                >
                  <div className="brand-wrapper ">
                    <h4>
                      <img src={logo} alt="logo" className="logo" />
                      <p className="text-danger">معاونت مالی و سرمایه گذاری</p>
                      <p className="text-success">سامانه آمار و بودجه</p>
                    </h4>
                  </div>
                  <Input
                    type="number"
                    name="username"
                    error=""
                    placeholder="کد ملی را وارد کنید"
                    value={this.state.account.Username}
                    onChange={this.handleChange}
                  />
                  <Input
                    type="password"
                    name="password"
                    error=""
                    placeholder="کلمه عبور را وارد کنید"
                    value={this.state.account.Password}
                    onChange={this.handleChange}
                  />
                  <input
                    name="login"
                    id="login"
                    className="btn btn-block login-btn mb-4"
                    type="button"
                    onClick={() => {
                      this.handlerLogin();
                    }}
                    value="ورود"
                  />
                </div>
                <a href="#!" className="forgot-password-link">
                  بازیابی کلمه عبور
                </a>
                <p className="login-card-footer-text">
                  حساب کاربری ندارید؟
                  <a href="#!" className="text-reset">
                    ثبت نام
                  </a>
                </p>
                <nav className="login-card-footer-nav">
                  کلیه حقوق این سایت متعلق به اداره کل آمار و بودجه پست بانک
                  ایران میباشد™
                </nav>
                نسخه{version}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer className="text-center" />
      </main>
    );
  }
}
const mapStateToProps = (state) => ({
  employees: state.employees,
});
const mapDispatchToProps = (dispatch) => ({
  addEmployee: (obj) => dispatch(actions.addEmployee(obj)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
