import React, { useState } from "react";
import { Upload, Modal, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

function waitBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}

class PhotoWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    fileList: this.props.albumList.map((base64str, index) => {
      return {
        uid: "-" + index,
        name: "image.png",
        status: "done",
        url: base64str,
      };
    }),
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  getAllBase64(fileList) {
    let allBase64 = [];
    for (let i = 0; i < fileList.length; i++) {
      this.getBase64(fileList[i].originFileObj, (imageUrl) => {
        allBase64.push(imageUrl);
      });
    }
    this.props.setAlbumList(allBase64);
  }

  handleCancel = () => {
    this.setState({ previewVisible: false });
  };

  handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await waitBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
      previewTitle:
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
    });
  };

  handleChange = (info) => {
    console.log("Line 69", info);
    this.setState({ fileList: info.fileList });
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
      this.getAllBase64(info.fileList);
      // Get this url from response in real world.
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  render() {
    const { previewVisible, previewImage, fileList, previewTitle } = this.state;
    const uploadButton = (
      <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Upload</div>
      </div>
    );
    return (
      <>
        <Upload
          action="/current_user/profile/picture"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 8 ? null : uploadButton}
        </Upload>
        <Modal
          visible={previewVisible}
          title={previewTitle}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
        <p></p>
      </>
    );
  }
}

export default PhotoWall;
