import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="input-group  input-group-sm">
      <div className="input-group-prepend ">
        <span className="input-group-text" id="">
          {label}
        </span>
      </div>
      <select name={name} id={name} {...rest} className="form-control-sm">
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
