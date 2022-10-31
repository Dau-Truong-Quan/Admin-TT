import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ROOT } from "../../../constants/CyberBugs/CyberBug";
import { GET_FILE_IMAGE } from "../../../util/constant/UploadImageConstant";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";

  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }

  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return isJpgOrPng && isLt2M;
};

const UploadImage = (props) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const type = props.type;
  const imageNew = props.image;
  const image = useSelector((state) => state.UploadImageReducer.imageProduct);

  useEffect(() => {
    if (type == "product") {
      if (typeof image !== "undefined") {
        setImageUrl(undefined);
      } else {
        setImageUrl(`${API_ROOT}/images/products/${imageNew}`);
      }
    }
  }, []);
  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
        dispatch({
          type: GET_FILE_IMAGE,
          fileImage: info.file,
        });
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
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
    <Upload
      name="avatar"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            width: "100%",
          }}
        />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default UploadImage;
