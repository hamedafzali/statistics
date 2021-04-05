import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav, Form, FormControl, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
class NavbarPage extends Component {
  render() {
    return (
      <>
        <Navbar
          className="navbar navbar-expand-lg navbar-light bg-info"
          style={{ direction: "rtl" }}
        >
          <Navbar.Brand href="/">سامانه آمار و بودجه</Navbar.Brand>
          <Nav className="ml-auto">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/mainpage">
                  صفحه اصلی
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/personslocation">
                  تغییر محل پرسنل
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  خروج
                </Link>
              </li>
            </ul>
          </Nav>

          <Form inline>
            <Navbar.Collapse className="justify-content-start">
              <Navbar.Text>
                کاربر:{" "}
                <a href="#login">
                  {this.props.employee.Name}-{this.props.employee.Family}
                </a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Form>
        </Navbar>
      </>
    );
  }
}

export default NavbarPage;
