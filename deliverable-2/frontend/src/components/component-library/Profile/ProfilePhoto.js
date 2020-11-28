import React from "react";
import { Col, Image, Upload, message, Button } from "antd";
import "antd/dist/antd.css";
// import UserPhoto from "../../../assets/UserPhoto.png";
import { UploadOutlined } from "@ant-design/icons";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

class ProfilePhoto extends React.Component {
  state = {
    loading: false,
  };

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) => {
        this.setState({
          imageUrl,
          loading: false,
        });
        this.props.setAvaterUrl(imageUrl);
      });
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { loading, imageUrl } = this.state;

    return (
      <Col span={8}>
        {imageUrl ? (
          <Image width={350} src={imageUrl} />
        ) : (
          <Image width={350} src={this.props.avaterUrl} />
        )}

        <p></p>
        <Upload
          name="file"
          showUploadList={false}
          action="/current_user/profile/picture"
          beforeUpload={beforeUpload}
          onChange={this.handleChange}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Col>
    );
  }
}

export default ProfilePhoto;
