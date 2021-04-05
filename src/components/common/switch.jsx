import React from "react";
//import BootstrapSwitchButton from "bootstrap-switch-button-react";

const Switch = ({ name, label, checked, onChange, size = "xs", ...rest }) => {
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={name}
        checked={checked}
        onChange={() => onChange(name, !checked)}
        {...rest}
      />
      <label className="custom-control-label" for={name}></label>
    </div>
    // <div className="form-group">
    //   <BootstrapSwitchButton
    //     name={name}
    //     id={name}
    //     checked={checked}
    //     onstyle="outline-success"
    //     offstyle="outline-danger"
    //     onlabel=" "
    //     offlabel=" "
    //     size={size}
    //     onChange={() => onChange(name, !checked)}
    //     {...rest}
    //   />
    //   <label htmlFor={name}>{label}</label>
    // </div>
  );
};

export default Switch;
