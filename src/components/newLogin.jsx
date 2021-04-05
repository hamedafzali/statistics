import React, { Component } from "react";
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
  async componentDidMount() {
    //const employee = this.props.employee;
    //employee.Status = 0;
    //this.props.handleLogin(employee);
    /* let { data: posts } = await Axios.get(
      "http://127.0.0.1:5000/users/checkuser/1/2"
    );
    console.log(posts);*/

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
          if (employee.UserStatus === 2) this.props.history.push("/password");
          else this.props.history.push("/mainpage");
        }
      } catch (e) {
        this.showMessage("نام کاربری یا کلمه عبور اشتباه میباشد ", "error");
      }
    });
  };
  handleChange = (e) => {
    //alert(e.currentTarget.name)
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    return (
      <main className="d-flex align-items-center min-vh-100 py-3 py-md-0 ">
        <div className="container">
          <div className="card login-card">
            <div className="row no-gutters">
              <div className="col-md-5  ">
                <img src={login} alt="login" className="login-card-img" />
              </div>
              <div className="col-md-7  ">
                <div
                  className="card-body"
                  style={{ minHeight: this.state.height }}
                >
                  {/* <p className="login-card-description ">ورود به حساب کاربری</p> */}
                  <form action="#!">
                    <div className="brand-wrapper ">
                      <h4>
                        <img src={logo} alt="logo" className="logo" />
                        <p className="text-danger">
                          معاونت مالی و سرمایه گذاری
                        </p>
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
                  </form>
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
        </div>
        <ToastContainer className="text-center" />
      </main>
    );
  }
}

export default Login;
