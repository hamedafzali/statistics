import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="input-group input-group ">
      <div className="input-group-prepend ">
        <span className="input-group-text" id="">
          {label}
        </span>
      </div>
      <input
        {...rest}
        name={name}
        id={name}
        className="form-control text-right  "
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
