import React, { Component } from "react";
import Product from "./product";
class Payesh extends Component {
  render() {
    return <Product employee={this.props.employee} productType="1" />;
  }
}

export default Payesh;
