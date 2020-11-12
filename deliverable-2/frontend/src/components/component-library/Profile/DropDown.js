import React, { useState } from "react";
import { Menu, Dropdown, Button, message } from "antd";
import { DownOutlined, UserOutlined } from "@ant-design/icons";

const PreferenceDropDown = ({ menuList, buttonTitle, updatePreference }) => {
  function handleMenuClick({ key }) {
    // message.info(`Click on item ${key}`);
    updatePreference(menuList[key]);
    message.success("Choose success");
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {menuList.map((title, index) => (
        <Menu.Item key={index} icon={<UserOutlined />}>
          {title}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]}>
      <Button>
        {buttonTitle} <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default PreferenceDropDown;
