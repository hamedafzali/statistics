import React, { Component } from "react";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import { Link } from "react-router-dom";
// Be sure to include styles at some point, probably during your bootstraping
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
class SideMenu extends Component {
  state = {};
  render() {
    return (
      // <SideNav
      //   onSelect={(selected) => {
      //     // Add your code here
      //   }}
      // >
      //   <SideNav.Toggle />
      //   <SideNav.Nav defaultSelected="home">
      //     <NavItem eventKey="home">
      //       <NavIcon>
      //         <i className="fa fa-fw fa-home" style={{ fontSize: "1.75em" }} />
      //       </NavIcon>
      //       <NavText>
      //         <Link className="nav-link" to="/personslocation">
      //           تغییر محل پرسنل
      //         </Link>
      //       </NavText>
      //     </NavItem>
      //     <NavItem eventKey="charts">
      //       <NavIcon>
      //         <i
      //           className="fa fa-fw fa-line-chart"
      //           style={{ fontSize: "1.75em" }}
      //         />
      //       </NavIcon>
      //       <NavText>Charts</NavText>
      //       <NavItem eventKey="charts/linechart">
      //         <NavText>Line Chart</NavText>
      //       </NavItem>
      //       <NavItem eventKey="charts/barchart">
      //         <NavText>Bar Chart</NavText>
      //       </NavItem>
      //     </NavItem>
      //   </SideNav.Nav>
      // </SideNav>
      <p></p>
    );
  }
}

export default SideMenu;
