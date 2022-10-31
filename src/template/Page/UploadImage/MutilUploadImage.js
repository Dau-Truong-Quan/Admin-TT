import { PlusOutlined } from "@ant-design/icons";
import { Modal, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ROOT } from "../../../constants/CyberBugs/CyberBug";
import { GET_FILE_IMAGE } from "../../../util/constant/UploadImageConstant";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => resolve(reader.result);

    reader.onerror = (error) => reject(error);
  });

const MutilUploadImage = (props) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const imageNew = props.image;
  const type = props.type;
  console.log(imageNew);
  const [fileList, setFileList] = useState([
    type === "user"
      ? imageNew
        ? {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: `${API_ROOT}/images/users/${imageNew}`,
          }
        : {}
      : imageNew
      ? {
          uid: "-1",
          name: "image.png",
          status: "done",
          url: `${API_ROOT}/images/products/${imageNew}`,
        }
      : {},
  ]);
  const dispatch = useDispatch();
  const handleCancel = () => setPreviewOpen(false);

  const image = useSelector((state) => state.UploadImageReducer.imageProduct);

  useEffect(() => {
    setFileList([
      type === "user"
        ? imageNew
          ? {
              uid: "-1",
              name: "image.png",
              status: "done",
              url: `${API_ROOT}/images/users/${imageNew}`,
            }
          : {}
        : imageNew
        ? {
            uid: "-1",
            name: "image.png",
            status: "done",
            url: `${API_ROOT}/images/products/${imageNew}`,
          }
        : {},
    ]);
  }, [imageNew]);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    dispatch({
      type: GET_FILE_IMAGE,
      fileImage: fileList[0],
    });
    console.log(fileList[0]);
    setFileList(newFileList);
  };

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 1 ? null : uploadButton}
      </Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default MutilUploadImage;
