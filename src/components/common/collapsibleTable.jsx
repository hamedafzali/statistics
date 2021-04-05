import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const CollapsibleTable = (data, cols) => {
  const allowedState = [
    {
      id: 1,
      isOpen: false,
      name: "آذر غربی",
      data: [
        {
          id: 1,
          name: "ارومیه",
          code: "0125",
          value: 1,
        },
        {
          id: 1,
          name: "مرکزی ارومیه",
          code: "0126",
          value: 1,
        },
      ],
    },
    {
      id: 2,
      isOpen: false,
      name: "آذر شرقی",
      data: [
        {
          id: 1,
          name: "ارومیه",
          code: "0125",
          value: 1,
        },
        {
          id: 1,
          name: "مرکزی ارومیه",
          code: "0126",
          value: 1,
        },
      ],
    },
    {
      id: 3,
      isOpen: false,
      name: "فارس",
      data: [
        {
          id: 1,
          name: "ارومیه",
          code: "0125",
          value: 1,
        },
        {
          id: 1,
          name: "مرکزی ارومیه",
          code: "0126",
          value: 1,
        },
      ],
    },
    {
      id: 3,
      isOpen: false,
      name: "مازندران",
      data: [
        {
          id: 1,
          name: "ارومیه",
          code: "0125",
          value: 1,
        },
        {
          id: 1,
          name: "مرکزی ارومیه",
          code: "0126",
          value: 1,
        },
      ],
    },
  ];
  const [stateOptions, setstateOptions] = useState(allowedState);
  return (
    <div className="container">
      <table
        className="table  text-right table-striped table-hover"
        style={{ direction: "rtl", fontFamily: "Harmattan" }}
      >
        <thead
          className="row border border-secondary bg-light rounded"
          style={{ direction: "rtl", fontFamily: "Harmattan" }}
        >
          {Object.keys(allowedState[0]).map((i) => (
            <div className="col table">{i}</div>
          ))}

          {/* <div className="col table"></div>
          <div className="col table">استان</div>
          <div className="col table">بدهکار</div>
          <div className="col table">بستانکار</div>
          <div className="col table">جمع</div> */}
        </thead>
      </table>
      {stateOptions.map((localState) => (
        <table
          className="table  text-right "
          style={{ direction: "rtl", fontFamily: "Harmattan" }}
        >
          <div
            onClick={() => {
              let newstate = stateOptions.filter((i) => i.id === localState.id);
              newstate[0].value = !newstate[0].value;
              setstateOptions(
                newstate
                  .concat(...stateOptions.filter((i) => i.id !== localState.id))
                  .sort((a, b) => (a.id > b.id ? 1 : -1))
              );
              //console.log(stateOptions.sort((a, b) => (a.id > b.id ? 1 : -1)));
            }}
            className="row border-bottom"
            style={{ direction: "rtl", fontFamily: "Harmattan" }}
          >
            <div className="col ">
              <i className="fa fa-fw fa-plus" style={{ fontSize: "1em" }} />
            </div>
            <div className="col ">{localState.name}</div>
            <div className="col ">350000</div>
            <div className="col ">450000</div>
            <div className="col ">22222222</div>
          </div>
          <Collapse in={localState["value"]}>
            <div>
              <div
                className="row  bg-light"
                style={{ direction: "rtl", fontFamily: "Harmattan" }}
              >
                <div className="col "></div>
                <div className="col ">شعبه 1</div>
                <div className="col ">1000000</div>
                <div className="col ">2000000</div>
                <div className="col ">1000000</div>
              </div>
              <div
                className="row  bg-light"
                style={{ direction: "rtl", fontFamily: "Harmattan" }}
              >
                <div className="col "></div>
                <div className="col ">شعبه 2 </div>
                <div className="col ">250000</div>
                <div className="col ">350000</div>
                <div className="col ">120000</div>
              </div>
            </div>
          </Collapse>
        </table>
      ))}

      {/* {stateOptions.map((localState) => (
        <table
          className="table  text-right table-striped table-hover"
          style={{ direction: "rtl", fontFamily: "Harmattan" }}
        >
          <thead className="border border-secondary bg-light ">
            <tr>
              <th
                onClick={() => {
                  let newstate = stateOptions.filter(
                    (i) => i.id === localState.id
                  );
                  newstate[0].value = !newstate[0].value;
                  setstateOptions(
                    newstate
                      .concat(
                        ...stateOptions.filter((i) => i.id !== localState.id)
                      )
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                  );
                  console.log(
                    stateOptions.sort((a, b) => (a.id > b.id ? 1 : -1))
                  );
                }}
              >
                {localState.name}
              </th>
              <th> بدهکار</th>
              <th>بستانکار</th>
              <th>جمع کل</th>
            </tr>
            <tr>
              <th
                onClick={() => {
                  let newstate = stateOptions.filter(
                    (i) => i.id === localState.id
                  );
                  newstate[0].value = !newstate[0].value;
                  setstateOptions(
                    newstate
                      .concat(
                        ...stateOptions.filter((i) => i.id !== localState.id)
                      )
                      .sort((a, b) => (a.id > b.id ? 1 : -1))
                  );
                  console.log(
                    stateOptions.sort((a, b) => (a.id > b.id ? 1 : -1))
                  );
                }}
              >
                <i className="fa fa-fw fa-plus" style={{ fontSize: "1em" }} />
              </th>
              <th>250000</th>
              <th>440000</th>
              <th>350000</th>
            </tr>
          </thead>
          <Collapse in={localState["value"]}>
            <tbody>
              <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <td>3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </Collapse>
        </table>
      ))} */}
    </div>
  );
};

export default CollapsibleTable;
