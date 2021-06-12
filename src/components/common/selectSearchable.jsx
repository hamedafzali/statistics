import React, { useState } from "react";
import Select from "react-select";

const SelectSearchable = ({ data, onChange, selectedValue }) => {
  // const [options, setOptions] = useState([
  //   { value: "chocolate", label: "تهران" },
  //   { value: "strawberry", label: "شیراز" },
  //   { value: "vanilla", label: "اصفهان" },
  // ]);
  //const [selectedOption, setSelectedOption] = useState("");

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
