import React, { Component } from "react";
// import NewWindow from "react-new-window";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../assets/images/Logo Amar without.png";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { getMenu } from "../../services/menu";
class Header extends Component {
  state = {
    menu: "",
    now: new Date(),
  };
  //var timer = setInterval(()=>setDate(new Date()), 1000 )
  titleStyle = {
    color: "blue",
    fontFamily: "Harmattan",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
    direction: "rtl",
    borderRadius: "25px",
    zIndex: 99999999,
  };
  // Demo = () => (
  //   <NewWindow>
  componentDidMount() {
    this.setState({ menu: null }, () => this.fillmenu(5));
  }

  fillmenu = async (GroupId) => {
    const { data } = await getMenu(GroupId);
    //console.log(this.props.menudata);
    let menu = this.refresh(data, 0);
    //let menu = this.props.menu;
    this.setState({ menu: null }, () => this.setState({ menu }));
    //console.log(this.state);
  };
  refresh = (table, PId) => {
    let menu = table.filter((i) => i.PId === PId);
    if (menu.length !== 0) {
      return menu.map((i) => {
        let subMenu = table.filter((j) => j.PId === i.Id);
        if (subMenu.length !== 0) {
          return (
            <Dropdown
              className="bg-white text-dark border-0 ml-2"
              key="right"
              id={`dropdown-button-drop-right`}
              drop="down"
              //variant="none"
              title={` Drop right `}
            >
              <Dropdown.Toggle
                //variant="light"
                id="dropdown-basic"
                drop="right"
                key="right"
                className="bg-white text-dark border-0"
              >
                {i.Name}
              </Dropdown.Toggle>
              <Dropdown.Menu className="text-center">
                {this.refresh(table, i.Id)}
              </Dropdown.Menu>
            </Dropdown>
          );
        } else {
          return (
            <Dropdown.Item
              eventKey="1"
              className="bg-white text-dark border-0 "
            >
              <Link to={i.Link} className="text-dark">
                {i.Name}
              </Link>
            </Dropdown.Item>
          );
        }
      });
    }
  };

  render() {
    return (
      <div className="container py-3 fixed-top">
        <Navbar
          collapseOnSelect
          expand="lg"
          style={this.titleStyle}
          className="bg-white border shadow "
        >
          <Navbar.Brand className="font-weight-bold text-muted text-right ">
            <img src={logo} alt="logo" className="logo" width="25" />
            <Link to="/" className="text-danger">
              سامانه آمار و بودجه پست بانک ایران
            </Link>
            <br />
            {/* <p style={{ fontSize: 14 }} className="text-success">
              پیشگام در اقتصاد دیجیتال، انتخاب اول مشتریان مناطق روستایی و کمتر
              توسعه یافته
            </p> */}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse
            className="justify-content-end"
            style={{ zIndex: 999999999 }}
          >
            <Nav className="mr-auto text-right ">{this.state.menu}</Nav>
          </Navbar.Collapse>
        </Navbar>
        {this.props.employee.NationalCode.length
          ? "کاربر:" +
            this.props.employee.Name +
            " " +
            this.props.employee.Family
          : ""}
        {this.state.now.toString}
      </div>
    );
  }
}

export default Header;
