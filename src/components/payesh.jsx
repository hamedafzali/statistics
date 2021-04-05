import React, { Component } from "react";
import Product from "./product";
class Payesh extends Component {
  render() {
    return <Product type="1" employee={this.props.employee}></Product>;
  }
}

export default Payesh;
