import React, { Component } from "react";
import Product from "./product";
class ThreeOf1000 extends Component {
  render() {
    return <Product type="2" employee={this.props.employee}></Product>;
  }
}

export default ThreeOf1000;
