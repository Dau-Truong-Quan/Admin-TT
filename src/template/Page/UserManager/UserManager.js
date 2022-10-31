import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Form,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../../component/Form/FormEditProject";
import { message, Popconfirm } from "antd";
import { NavLink } from "react-router-dom";
import { GET_ALL_IMPORTDETAIL_SAGA } from "../../../util/constant/ImportDetailConstant";
import {
  DELETE_PRODUCT_SAGA,
  GET_ALL_PRODUCT_SAGA,
  GET_DETAIL_PRODUCT_SAGA,
  GET_ID_PRODUCT,
} from "../../../util/constant/ProductConstant";
import numberWithCommas from "../../../util/lib/numberWithCommas";
import FormEditProduct from "../../../component/Form/FormEditProduct";
import UploadImage from "../UploadImage/UploadImage";
import MutilUploadImage from "../UploadImage/MutilUploadImage";
import FormAddProduct from "../../../component/Form/FormAddProduct";
import { API_ROOT } from "../../../constants/CyberBugs/CyberBug";
import {
  DELETE_USER_SAGA,
  GET_ALL_USER_SAGA,
  GET_DETAIL_USER,
  GET_DETAIL_USER_SAGA,
  GET_ID_USER,
} from "../../../util/constant/UserContant";
import FormAddUser from "../../../component/Form/FormAddUser";
import FormEditUser from "../../../component/Form/FormEditUser";

const UserManager = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_USER_SAGA });
  }, []);
  const arr = useSelector((state) => state.UserReducer.arrUser);
  console.log(arr);
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: "40px",
    },
    {
      title: "Hình ảnh",
      key: "price",
      render: (text, record, index) => {
        return (
          <div className="w-50">
            <img src={`${API_ROOT}/images/users/` + record.image} alt />
          </div>
        );
      },

      ellipsis: true,
    },
    {
      title: "Tên ",
      key: "name",
      render: (text, record, index) => {
        return (
          <span>
            {record.lastName} {record.firstName}
          </span>
        );
      },
    },
    {
      title: "phone",
      key: "phone",
      dataIndex: "phone",

      ellipsis: true,
    },
    {
      title: "email",
      key: "email",
      dataIndex: "email",

      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <EditOutlined
            onClick={() => {
              const action = {
                type: "OPEN_FORM_CREATE_TASK",
                Component: <FormEditUser user={record} />,
                title: "Sửa thông tin người dùng",
              };
              dispatch(action);
              dispatch({
                type: GET_ID_USER,
                idUser: record.id,
              });
              dispatch({
                type: GET_DETAIL_USER,
                detailUser: record,
              });
            }}
          />

          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => {
              const action = {
                type: DELETE_USER_SAGA,
                id: record.id,
              };

              dispatch(action);
              dispatch({ type: GET_ALL_USER_SAGA });
            }}
            okText="Yes"
            cancelText="No"
          >
            <DeleteOutlined />
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="container">
      <div className="mt-5 mb-5 ">Quản lí sản phẩm</div>
      <Space
        style={{
          marginBottom: 16,
        }}
      ></Space>
      <Button
        type="primary"
        onClick={() => {
          const action = {
            type: "OPEN_FORM_CREATE_TASK",
            Component: <FormAddUser />,
            title: "Thêm người dùng",
          };
          dispatch(action);
        }}
      >
        Thêm người dùng
      </Button>
      {arr && arr.length > 0 && (
        <Table
          columns={columns}
          dataSource={arr}
          onChange={handleChange}
          pagination={{ pageSize: 5 }}
        />
      )}
    </div>
  );
};

export default UserManager;
