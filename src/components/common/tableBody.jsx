import React, { Component } from "react";
//import _ from "lodash";
import _ from "underscore";

class TableBody extends Component {
  //state = { data: [] };
  handleChange = (e) => {
    e.preventDefault();
    // let data = this.props.data.map((i) => {
    //   // console.log(
    //   //   "data",
    //   //   i.NationalCode,
    //   //   e.currentTarget.name.substring(0, 10)
    //   // );
    //   if (i.NationalCode === e.currentTarget.name.substring(0, 10)) {
    //     let name = e.currentTarget.name.substring(10, 13);

    //     i[name] = e.currentTarget.value.replace(",", "");
    //     i.edited = true;
    //     //console.log(i);
    //     return i;
    //   } else {
    //     return i;
    //   }
    // });
    // this.props.tbhandleChange(data);
    let data = this.props.data.filter(
      (i) => i.NationalCode === e.currentTarget.name.substring(0, 10)
    );
    if (data) {
      let name = e.currentTarget.name.substring(10, 13);

      data[0][name] = e.currentTarget.value.replace(",", "");
      data[0].edited = true;
      this.props.tbhandleChange(data[0]);
    }
  };
  //.replace(/[\D\s\._\-]+/g, "")
  numberWithCommas = (x) => {
    var nf = new Intl.NumberFormat();
    return nf.format(x) === "NaN" ? 0 : nf.format(x);
  };
  renderCell = (item, column) => {
    let value = column.seprated
      ? this.numberWithCommas(String(item[column.path]).replace(",", ""))
      : item[column.path];
    if (column.content) return column.content(item);
    if (column.type) {
      switch (column.type) {
        case "text":
          return String(item[column.path]).replace(",", "") < 0 ? (
            <p className="text-danger">{value}</p>
          ) : (
            <p>{value}</p>
          );

        case "input":
          return (
            <input
              style={{ width: 100 }}
              value={value}
              maxLength={11}
              name={item.NationalCode + column.path}
              key={item.NationalCode + column.path}
              onChange={this.handleChange}
            />
          );

        case "inputnumber":
          return (
            <input
              type="number"
              style={{ width: 100 }}
              value={item[column.path]}
              name={item.NationalCode + column.path}
              key={item.NationalCode + column.path}
              onChange={this.handleChange}
            ></input>
          );
        case "button":
          return (
            <button
              class="btn btn-outline-primary "
              onClick={(e) => {
                e.preventDefault();
                let A30, A20, A50, PostTypeId;
                let row = this.props.data.filter(
                  (i) => i.NationalCode === item.NationalCode
                );

                A50 = String(row[0].A50).replace(",", "");
                A30 = String(row[0].A30).replace(",", "");
                A20 = String(row[0].A20).replace(",", "");
                PostTypeId = String(row[0].PostTypeId);
                this.props.onCommit(
                  item.NationalCode,
                  A50,
                  A30,
                  A20,
                  PostTypeId
                );
              }}
            >
              ثبت
            </button>
          );
        default:
      }
    }
    if (column.icon) {
      //console.log(item);
      if (item.Status === 0)
        return (
          <div className="inline-flex">
            <i
              // onClick={() => this.props.onCommit(item.Id)}
              className={`btn-outline-danger fa fa-fw fa-check d-inline`}
              style={{ fontSize: "1.75em" }}
            />
            <div
              onClick={() => this.props.onCommit(item.Id)}
              className=" d-inline btn btn-success"
              style={{ cursor: "pointer " }}
            >
              ارسال
            </div>
          </div>
        );
      else if (item.Status === 1)
        return (
          <div className="inline-flex">
            <i
              onClick={() => this.props.onCommit(item.Id)}
              className={`btn-outline-success fa fa-fw fa-check d-inline`}
              style={{ fontSize: "1.75em" }}
            />
            <div
              onClick={() => this.props.onCommit(item.Id)}
              className="btn  d-inline  btn-danger"
              style={{ cursor: "pointer" }}
            >
              باز_پس_گیری
            </div>
          </div>
        );
      else if (item.Status === 2)
        return (
          <i
            onClick={() => this.props.onCommit(item.Id)}
            className={`btn-outline-success fa fa-fw fa-check-circle`}
            style={{ fontSize: "1.75em" }}
          />
        );
      else if (item.Status === 3)
        return (
          <i
            onClick={() => this.props.onCommit(item.Id)}
            className={`btn-outline-danger fa fa-fw fa-times`}
            style={{ fontSize: "1.75em" }}
          />
        );
    }

    return _.get(item, column.path);
  };

  createKey = (item, column) => {
    // console.log(
    //   (item.Id || item.NationalCode) +
    //     (column.path || column.key || column.label)
    // );
    return (
      (item.Id || item.NationalCode) +
      (column.path || column.key || column.label)
    );
    //return Math.random();
  };
  render() {
    const { columns } = this.props;

    return (
      <tbody>
        {this.props.data.map((item) => (
          <tr key={item.Id} className={item.edited ? "bg-warning" : null}>
            {columns.map((column) => (
              <td
                key={this.createKey(item, column)}
                className={column.color ? column.color : ""}
              >
                {this.renderCell(item, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}

export default TableBody;
