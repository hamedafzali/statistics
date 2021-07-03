import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div
      className="input-group  input-group-sm border mt-1 mb-1"
      style={{ borderRadius: "0.5em", overflow: "hidden" }}
    >
      <div className="input-group-prepend ">
        <span className="input-group-text border-0" id="">
          {label}
        </span>
      </div>
      <select
        name={name}
        id={name}
        {...rest}
        className="form-control-sm border-0"
        style={{ margin: 0, padding: 0 }}
      >
        <option value="" />
        {options.map((option) => (
          <option key={option.id} value={option.id} selected={option.selected}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
