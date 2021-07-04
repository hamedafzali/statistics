import React, { Component } from "react";
import { connect } from "react-redux";
import AOS from "aos";
import Header from "./components/common/header";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./services/authService";
import * as actions from "./store/employee/actions";
import "aos/dist/aos.css"; // You can also use <link> for styles
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { getMenu } from "./services/menu";
import logo from "./assets/images/loading1.gif";
import "./assets/css/tree.css";
import { routes } from "./routes";
class App extends Component {
  state = {
    loading: false,
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
    this.setState({ employee }, () =>
      this.childHeader.fillmenu(this.state.employee.GroupId)
    );
  };
  handleLoading = (stat) => {
    this.setState({ loading: stat });
  };
  handleMenu = async () => {
    const { data: menudata } = await getMenu(this.state.employee.GroupId || 5);
    this.setState({ menudata });
  };
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
    }, 5000);
  }
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
        this.childHeader.fillmenu(5);
      }
    );
  };
  render() {
    return (
      <React.Fragment>
        <Header
          handleMenu={this.handleMenu}
          employee={this.state.employee}
          menudata={this.state.menudata}
          ref={(instanceHeader) => {
            this.childHeader = instanceHeader;
          }}
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
