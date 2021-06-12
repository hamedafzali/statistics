import React from "react";

const Input = ({ name, label, error, title, ...rest }) => {
  return (
    <div className="input-group  ">
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
      {title ? (
        <span className="input-group-text" id="">
          {title}
        </span>
      ) : null}

      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
