import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group-sm ">
      <label htmlFor={name}>{label}</label>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control text-right "
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
