// import React, { Component } from "react";
// import Header from "./common/header";

// import Axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Input from "./common/input";
// import { Link } from "react-router-dom";
// class Login extends Component {
//   state = {
//     Title: "سامانه جامع آمار و بودجه",
//     account: { username: "", password: "" },
//     imageUrl: "https://www.postbank.ir/UI/Styles/postbank2019/images/logo.png",
//   };
//   style = {
//     backgroundColor: "#EFE",
//   };
//   titleStyle = {
//     color: "blue",
//     fontFamily: "Harmattan",
//     fontSize: 30,
//     fontWeight: "bold",
//     justifyContent: "center",
//     alignItems: "center",
//   };
//   async componentDidMount() {
//     /* let { data: posts } = await Axios.get(
//       "http://127.0.0.1:5000/users/checkuser/1/2"
//     );
//     console.log(posts);*/
//   }
//   validate = () => {
//     if (this.state.account.username.length != 10) {
//       this.showMessage("نام کاربری باید حداقل 10 رقم باشد", "error");
//       return false;
//     } else if (this.state.account.password.length === 0) {
//       this.showMessage("کلمه عبور وارد نشده است", "error");
//       return false;
//     }
//     return true;
//   };
//   showMessage = (msg, type) => {
//     toast[type](msg, {
//       position: "top-center",
//       autoClose: 5000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       progress: undefined,
//     });
//   };
//   handlerLogin = async () => {
//     if (!this.validate()) return false;
//     const { username, password } = this.state.account;
//     let { data: userData } = await Axios.get(
//       `http://127.0.0.1:5000/api/auth/checkuser/${username}/${password}`
//     );

//     !userData.returnValue
//       ? this.showMessage("نام کاربری یا کلمه عبور اشتباه میباشد ", "error")
//       : this.props.history.push("/PersonsLocation");
//   };
//   handleChange = (e) => {
//     //alert(e.currentTarget.name)
//     const account = { ...this.state.account };
//     account[e.currentTarget.name] = e.currentTarget.value;
//     this.setState({ account });
//   };
//   render() {
//     return (
//       <React.Fragment>
//         <Header />
//         <div className="container text-right">
//           <div className="row">
//             <div className="col-md text-center">
//               <img
//                 src={this.state.imageUrl}
//                 class="img-fluid "
//                 alt="Responsive image"
//               />
//             </div>
//           </div>
//           <div className="row" style={this.titleStyle}>
//             <div className="col-md text-center ">{this.state.Title}</div>
//           </div>
//           <div className="row">
//             <div className="col"></div>
//             <div className="col-md alert-primary">
//               <Input
//                 type="number"
//                 name="username"
//                 label="کد ملی"
//                 error=""
//                 placeholder="کد ملی را وارد کنید"
//                 value={this.state.account.Username}
//                 onChange={this.handleChange}
//               />
//               <Input
//                 type="password"
//                 name="password"
//                 label="کلمه عبور"
//                 error=""
//                 placeholder="کلمه عبور را وارد کنید"
//                 value={this.state.account.Password}
//                 onChange={this.handleChange}
//               />

//               <div className="form-group " style={{ direction: "rtl" }}>
//                 <div className="custom-control custom-checkbox ">
//                   <input
//                     type="checkbox"
//                     className="custom-control-input"
//                     id="customCheck1"
//                   />
//                   <label
//                     className="custom-control-label"
//                     htmlFor="customCheck1"
//                   >
//                     ذخیره مشخصات ورود
//                   </label>
//                 </div>
//               </div>
//               <button
//                 type="submit"
//                 onClick={() => {
//                   this.handlerLogin();
//                 }}
//                 className="btn btn-primary btn-block "
//               >
//                 ورود
//               </button>
//               <p className="forgot-password text-right">
//                 <Link to="/resetPassword">بازنشانی کلمه عبور</Link>
//               </p>
//               <ToastContainer className="text-center" />
//             </div>
//             <div className="col"></div>
//           </div>
//         </div>
//       </React.Fragment>
//     );
//   }
// }

// export default Login;
