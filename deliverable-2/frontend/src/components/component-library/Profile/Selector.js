import { Select } from "antd";
import React from "react";
import "antd/dist/antd.css";

const { Option } = Select;

const Selector = ({ defaultValue, setSelect, selectList }) => {
  function onChange(value) {
    console.log(`selected ${value}`);
    setSelect(value);
  }

  function onBlur() {
    console.log("blur");
  }

  function onFocus() {
    console.log("focus");
  }

  function onSearch(val) {
    console.log("search:", val);
  }

  const valider = (l) => {
    if (!l) {
      return [];
    }
    return Array.from(l);
  };

  return (
    <Select
      showSearch
      style={{ width: 250 }}
      defaultValue={defaultValue}
      optionFilterProp="children"
      onChange={onChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {valider(selectList).map((value, key) => (
        <Option value={value} key={key}>
          {value}
        </Option>
      ))}
    </Select>
  );
};

export default Selector;
