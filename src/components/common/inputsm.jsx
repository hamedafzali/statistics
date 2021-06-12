import React from "react";
const Inputsm = ({ name, label, error, ...rest }) => {
  return (
    <input
      {...rest}
      name={name}
      id={name}
      className="form-control text-right m-0  border-dark"
    />
  );
};

export default Inputsm;
