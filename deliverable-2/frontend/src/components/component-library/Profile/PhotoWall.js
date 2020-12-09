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

function beforeUpload(file) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
    return false;
  }
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("Image must smaller than 1MB!");
    return false;
  }
  return isJpgOrPng && isLt1M;
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
    console.log(fileList);
    let allBase64 = [];
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].uid[0] === "-") {
        allBase64.push(fileList[i].url);
      } else {
        this.getBase64(fileList[i].originFileObj, (imageUrl) => {
          allBase64.push(imageUrl);
        });
      }
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
    const file = info.file;
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      return;
    }
    const isLt1M = file.size / 1024 / 1024 < 1;
    if (!isLt1M) {
      return;
    }
    const check = isJpgOrPng && isLt1M;
    const updateinfo = info.fileList.filter((f) => {
      const b1 = f.type === "image/jpeg" || f.type === "image/png";
      const b2 = f.size / 1024 / 1024 < 1;
      const alreadyLoad = f.uid[0] === "-";
      return (b1 && b2) || alreadyLoad;
    });
    info.fileList = updateinfo;
    if (check) {
      console.log("Line 69", info);
      info.file.status = "done";
      for (let i = 0; i < info.fileList.length; i++) {
        info.fileList[i].status = "done";
      }
      this.setState({ fileList: info.fileList });
      // message.success(`${info.file.name} file uploaded successfully`);
      // Get this url from response in real world.
      this.getAllBase64(info.fileList);
    }
  };

  onRemove = (file) => {
    console.log("this.state.fileList", this.state.fileList);
    console.log("file", file);
    const newFileList = this.state.fileList.filter((f) => f.uid !== file.uid);
    this.setState({
      fileList: newFileList,
    });
    const newAlbumList = newFileList.map((f) => f.url);
    this.props.setAlbumList(newAlbumList);
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
          beforeUpload={beforeUpload}
          onRemove={this.onRemove}
        >
          {fileList.length >= 4 ? null : uploadButton}
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
