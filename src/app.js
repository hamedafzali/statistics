import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import AOS from "aos";

import { routes } from "./routes";
import * as actions from "./store/employees";
import Header from "./components/common/header";
import auth from "./services/authService";
//import { getMenu } from "./services/menu";

import "aos/dist/aos.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "./assets/css/tree.css";
import "./app.scss";

import logo from "./assets/images/loading1.gif";
import Loading from "./components/common/loading";
import Map from "./components/common/Map";
import Index from "./components/index";
class App extends Component {
  state = {
    loading: false,
    isLoading: true,
    employee: {
      Name: "",
      Family: "",
      NationalCode: "",
      GroupId: 0,
      Status: 0,
      BranchName: "",
      BranchCode: "",
      ChartId: 0,
      UserStatus: 0,
    },
    menudata: "",
    currentPage: "Main",
  };

  handleLogin = (employee) => {
    this.setState({ employee }, () => {
      //this.childHeader.fillmenu(this.state.employee.GroupId);
    });
  };
  // handleLoading = (stat) => {
  //   this.setState({ loading: stat });
  // };
  // handleMenu = async () => {
  //   const { data: menudata } = await getMenu(this.state.employee.GroupId || 5);
  //   this.setState({ menudata });
  // };
  componentDidMount() {
    AOS.init();
    if (!this.state.employee) auth.logout();
    setInterval(() => {
      if (
        this.state.employee.GroupId === 0 &&
        window.location.pathname !== "/" &&
        window.location.pathname !== "/budgetprint/"
      ) {
        //alert("جلسه کاری شما به پایان رسید");
        window.location = "/";
      }
    }, 2000);
    // setInterval(() => {
    //   if (
    //     !this.props.employees &&
    //     window.location.pathname !== "/" &&
    //     window.location.pathname !== "/budgetprint/"
    //   ) {
    //     //alert("جلسه کاری شما به پایان رسید");
    //     console.log(this.props.employees);
    //     window.location = "/";
    //   }
    // }, 1000);
  }
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps !== this.props) {
  //     if (nextProps.employees.lenght) auth.logout();
  //   }
  // }
  handleLogout = () => {
    this.props.removeLastEmployee();
    //console.log("store1", this.props.employees);
    this.setState(
      {
        employee: {
          Name: "",
          Family: "",
          NationalCode: "",
          GroupId: 0,
          Status: 0,
          BranchName: "",
          BranchCode: "",
          ChartId: 0,
          UserStatus: 0,
        },
        menudata: "",
      },
      async () => {
        auth.logout();
        //this.childHeader.fillmenu(5);
        this.props.removeAllEmployee();
      }
    );
  };
  render() {
    // return <Index />;
    return <Map />;
    if (this.state.isLoading) {
      setTimeout(() => this.setState({ isLoading: false }), 2000);
      return <Loading />;
    }

    return (
      <React.Fragment>
        <Header
        // handleMenu={this.handleMenu}
        //employee={this.state.employee}
        //menudata={this.state.menudata}
        // ref={(instanceHeader) => {
        //   this.childHeader = instanceHeader;
        // }}
        />
        <div
          style={{
            width: window.width,
            height: window.height,
            position: "fixed",
            display: this.state.loading ? "block" : "none",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fff",
            opacity: 0.8,
            zIndex: 99999999,
          }}
        >
          <div style={{ position: "absolute", top: "10%", left: "40%" }}>
            <img src={logo} alt="loading..." />
          </div>
        </div>
        <div className="container " style={{ marginTop: 100 }}>
          <div className="row">
            <div className="col text-center">
              <div className="content">
                <Switch>
                  {routes.map((route, i) => (
                    <Route
                      key={route}
                      path={route.path}
                      exact
                      render={(props) => (
                        <route.component
                          handleLogin={this.handleLogin}
                          {...props}
                          handleLogout={this.handleLogout}
                          handleState={this.handleState}
                          employee={this.state.employee}
                        />
                      )}
                    />
                  ))}

                  <Redirect to="/not-found" />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees,
});
const mapDispatchToProps = (dispatch) => ({
  removeAllEmployee: () => dispatch(actions.removeAllEmployee()),
  removeLastEmployee: () => dispatch(actions.removeLastEmployee()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
