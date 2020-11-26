import React from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";

import { Upload, message, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const props = {
  name: "file",
  action: "/current_user/profile/picture",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const Avatar = () => {
  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default Avatar;
