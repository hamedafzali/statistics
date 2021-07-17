import React from "react";

const Input = ({ name, label, error, title, ...rest }) => {
  return (
    <div
      className="input-group border mt-1 mb-1"
      style={{ borderRadius: "0.5em", overflow: "hidden" }}
    >
      <div className="input-group-prepend ">
        <span className="input-group-text border-0" id="">
          {label}
        </span>
      </div>
      <input
        {...rest}
        autoComplete={false}
        name={name}
        id={name}
        className="form-control text-right border-0 "
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
