import React from "react";
import Select from "react-select";

const SelectSearchable = ({ data, onChange, selectedValue }) => {
  //console.log(data);
  return (
    <Select
      value={selectedValue}
      onChange={onChange}
      options={data}
      placeholder="سرفصل مورد نظر را انتخاب کنید"
    />
  );
};

export default SelectSearchable;
