import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/employees";
// import NewWindow from "react-new-window";
import { Navbar, Nav } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import logo from "../../assets/images/Logo Amar without.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../assets/css/navbar.css";
import { Link } from "react-router-dom";
import { getMenu } from "../../services/menu";
class Header extends Component {
  state = {
    menu: "",
  };

  componentDidMount() {
    let GroupId;
    //try {
    if (this.props.employees.length > 0)
      GroupId = this.props.employees[this.props.employees.length - 1].GroupId;
    //} catch (e) {
    //GroupId = this.props.employee.GroupId;
    //}
    this.fillmenu(GroupId);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      let GroupId;
      //try {
      if (nextProps.employees.length > 0)
        GroupId = nextProps.employees[nextProps.employees.length - 1].GroupId;
      //} catch (e) {
      //GroupId = this.props.employee.GroupId;
      //}
      this.fillmenu(GroupId);
    }
  }
  fillmenu = async (GroupId) => {
    //console.log("fillmenu Called before", GroupId, this.props);
    //GroupId = this.state.groupId;
    if (!GroupId) GroupId = 0;
    //console.log("fillmenu Called after", GroupId, this.props);
    const { data } = await getMenu(GroupId);
    if (data) {
      let menu = this.refresh(data, 0);
      this.setState({ menu: null }, () => this.setState({ menu }));
      //console.log(this.state);
    }
  };
  refresh = (table, PId) => {
    let menu = table.filter((i) => i.PId === PId);
    if (menu.length !== 0) {
      return menu.map((i) => {
        let subMenu = table.filter((j) => j.PId === i.Id);
        if (subMenu.length !== 0) {
          return (
            <Dropdown
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
                className="navbar_Dropdown"
              >
                {i.Name}
              </Dropdown.Toggle>
              <Dropdown.Menu>{this.refresh(table, i.Id)}</Dropdown.Menu>
            </Dropdown>
          );
        } else {
          return (
            <Dropdown.Item key={i} eventKey="1" className="navbar_Items">
              <Link to={i.Link} className="navbar_Items_Link">
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
      <div className="container py-3 fixed-top ">
        <Navbar
          collapseOnSelect
          expand="lg"
          //style={this.navbarStyle}
          className="navbar"
        >
          <Navbar.Brand className="font-weight-bold text-muted text-right ">
            <img src={logo} alt="logo" className="logo" width="25" />
            <Link
              to="/"
              className="text-danger"
              style={{ textDecoration: "none" }}
            >
              سامانه آمار و بودجه پست بانک ایران
            </Link>
            <br />
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="mr-auto text-right ">{this.state.menu}</Nav>
          </Navbar.Collapse>
        </Navbar>

        {this.props.employees.length
          ? this.props.employees.map((employee) => {
              return (
                <div className="badge badge-light p-2 ml-3 border border-secondary text-success">
                  {this.props.employees.length > 1 ? (
                    <i
                      onClick={() => this.props.removeLastEmployee()}
                      className={`btn-sm btn-outline-danger fa fa-fw fa-times d-inline`}
                      style={{ fontSize: "1.75em" }}
                    />
                  ) : (
                    ""
                  )}

                  {`${employee.Name} ${employee.Family} - ${employee.Position} - ${employee.BranchName}`}
                </div>
              );
            })
          : ""}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  employees: state.employees,
});
const mapDispatchToProps = (dispatch) => ({
  removeLastEmployee: () => dispatch(actions.removeLastEmployee()),
});
export default connect(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true,
})(Header);
