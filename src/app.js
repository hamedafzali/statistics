import React, { Component } from "react";
import Login from "./components/newLogin";
//import Index from "./components/index";
import { Route, Switch, Redirect } from "react-router-dom";
import auth from "./services/authService";
import MainPage from "./components/main";
import ResetPassword from "./components/resetPassword";
import Password from "./components/password";
import PersonsLocation from "./components/personsLocation";
import NotFound from "./components/notFound";
//import SideMenu from "./components/common/sidemenu";
import "../node_modules/font-awesome/css/font-awesome.min.css";
//import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import RelocationCommit from "./components/relocationCommit";
import CEOCommit from "./components/CEOCommit";
//import AboutUs from "./components/aboutUs";
//import ContactUs from "./components/contactUs";
//import Links from "./components/main";
import ManagerCommit from "./components/managerCommit";
import Header from "./components/common/header";
import { getMenu } from "./services/menu";
//import { accessControl } from "./services/accessControl";
import UnderConstruction from "./components/underConstruction";
//import { reject } from "underscore";
import PersonsDetail from "./components/personsDetail";
import PersonelReport from "./components/personelReport";
import AdditionRegForm from "./components/additionForm";
import KaranehAccess from "./components/karanehAccess";
import KaranehManagersPage from "./components/karanehManagersPage";
import CEOConfirm from "./components/ceoConfirm";
import PersonsList from "./components/PersonsList";
//import TasksBox from "./components/common/tasksBox";
import Product from "./components/product";
import ThreeOf1000 from "./components/ThreeOf1000";
import Payesh from "./components/payesh";
import CEOCommitNew from "./components/CEOCommitNew";
class App extends Component {
  state = {
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
    currentPage: "ain",
  };

  handleLogin = (employee) => {
    this.setState({ employee }, () =>
      this.childHeader.fillmenu(this.state.employee.GroupId)
    );

    //console.log(this.state);
  };
  handleMenu = async () => {
    const { data: menudata } = await getMenu(this.state.employee.GroupId || 5);
    this.setState({ menudata });
  };
  componentDidMount() {
    setInterval(() => {
      if (
        this.state.employee.GroupId === 0 &&
        window.location.pathname !== "/"
      ) {
        //alert("جلسه کاری شما به پایان رسید");
        window.location = "/";
      }
    }, 5000);
  }
  handleLogout = () => {
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
        // const { data: menudata } = await getMenu(
        //   this.state.employee.GroupId || 5
        // );
        this.childHeader.fillmenu(5);
      }
    );
  };
  render() {
    return (
      <React.Fragment>
        {/* <TasksBox /> */}
        <Header
          handleMenu={this.handleMenu}
          employee={this.state.employee}
          menudata={this.state.menudata}
          ref={(instanceHeader) => {
            this.childHeader = instanceHeader;
          }}
        />
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <div className="content">
                <Switch>
                  <Route
                    path="/"
                    exact
                    render={(props) => (
                      <Login
                        handleLogin={this.handleLogin}
                        {...props}
                        handleLogout={this.handleLogout}
                      />
                    )}
                  />
                  <Route
                    path="/login"
                    render={(props) => (
                      <Login
                        handleLogin={this.handleLogin}
                        {...props}
                        handleLogout={this.handleLogout}
                      />
                    )}
                  />
                  <Route
                    path="/mainpage"
                    render={() => <MainPage handleState={this.handleState} />}
                  />

                  <Route
                    path="/password"
                    render={(props) => (
                      <Password employee={this.state.employee} {...props} />
                    )}
                  />

                  <Route
                    path="/personslocation"
                    render={(props) => (
                      <PersonsLocation
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/personsdetail"
                    render={(props) => (
                      <PersonsDetail
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/personslist"
                    render={(props) => (
                      <PersonsList employee={this.state.employee} {...props} />
                    )}
                  />
                  <Route
                    path="/karanehaccess"
                    render={(props) => (
                      <KaranehAccess
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/ceoconfirm"
                    render={(props) => (
                      <CEOConfirm employee={this.state.employee} {...props} />
                    )}
                  />
                  <Route
                    path="/resetpassword"
                    render={(props) => (
                      <ResetPassword
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/payesh"
                    render={(props) => (
                      <Product
                        type="1"
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/threeof1000"
                    render={(props) => (
                      <ThreeOf1000 employee={this.state.employee} {...props} />
                    )}
                  />
                  <Route
                    path="/payesh"
                    render={(props) => (
                      <Payesh employee={this.state.employee} {...props} />
                    )}
                  />
                  <Route
                    path="/personelreport"
                    render={(props) => (
                      <PersonelReport
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/addition"
                    render={(props) => (
                      <AdditionRegForm
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/relocationcommit"
                    render={(props) => (
                      <RelocationCommit
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/kmanagers"
                    render={(props) => (
                      <KaranehManagersPage
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route
                    path="/ceocommit"
                    render={(props) => (
                      <CEOCommit employee={this.state.employee} {...props} />
                    )}
                  />
                  <Route
                    path="/ceocommitnew"
                    render={(props) => (
                      <CEOCommitNew employee={this.state.employee} {...props} />
                    )}
                  />
                  <Route
                    path="/managercommit"
                    render={(props) => (
                      <ManagerCommit
                        employee={this.state.employee}
                        {...props}
                      />
                    )}
                  />
                  <Route path="/not-found" component={NotFound} />
                  <Route
                    path="/underconstruction"
                    component={UnderConstruction}
                  />
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

export default App;
