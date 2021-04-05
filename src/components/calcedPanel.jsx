import React, { Component } from "react";
import Input from "./common/input";
import InputPrepend from "./common/inputPrepend";
import Select from "./common/selectPrepend";
class Calced extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
        <div className="row">
          <div className="col-lg">
            <Select
              name="destination"
              label="تاریخ"
              error=""
              options={[{ id: 1, name: "آذر 1399" }]}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <div className="form-inline">
              <InputPrepend
                type="text"
                name="ratio"
                label="ضریب بودجه"
                error=""
                placeholder="ضریب بودجه"
                value={props.ratio}
                onChange={props.handleChange}
              />
              <div
                className="d-inline  btn btn-outline-danger btn-sm"
                onClick={props.hadnleRefresh}
              >
                نمایش
              </div>
            </div>
          </div>
        </div>
        <div className="row"></div>
        <div className="row">
          <div className="col-lg">
            <Input
              type="text"
              name="destination"
              label="میانگین ساعت اضافه کار"
              error=""
              placeholder="میانگین ساعت اضافه کار"
              value="0"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-lg">
            <Input
              type="text"
              name="destination"
              label="جمع مبلغ کارانه مدیریت شعب"
              error=""
              placeholder="جمع مبلغ کارانه مدیریت شعب"
              value="0"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <Input
              type="text"
              name="destination"
              label="میانگین ساعت اضافه کار"
              error=""
              placeholder="میانگین ساعت اضافه کار"
              value="0"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-lg">
            <Input
              type="text"
              name="destination"
              label="جمع مبلغ کارانه ستاد مرکزی"
              error=""
              placeholder="جمع مبلغ کارانه ستاد مرکزی"
              value="0"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <Input
              type="number"
              name="destination"
              label=" ضریب تعدیل"
              error=""
              placeholder="ضریب تعدیل"
              value="0"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-lg">
            <Input
              type="text"
              name="destination"
              label="جمع کارانه عادی"
              error=""
              placeholder="جمع کارانه عادی"
              value="0"
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg">
            <Input
              type="text"
              name="destination"
              label="جمع مبلغ کارانه کارگزاری"
              error=""
              placeholder="جمع مبلغ کارانه کارگزاری"
              value="0"
              onChange={this.handleChange}
            />
          </div>
          <div className="col-lg">
            <Input
              type="text"
              name="destination"
              label="جمع مبلغ کارانه ارزی"
              error=""
              placeholder="جمع مبلغ کارانه ارزی"
              value="0"
              onChange={this.handleChange}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Calced;
