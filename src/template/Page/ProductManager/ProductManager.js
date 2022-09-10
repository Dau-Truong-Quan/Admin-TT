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
import {
  CREATE_IMPORT_SAGA,
  DELETE_IMPORT_SAGA,
  GET_ALL_IMPORT,
  GET_ALL_IMPORT_SAGA,
  GET_ID_IMPORT,
} from "../../../util/constant/ImportConstant";
import FormImport from "../../../component/Form/FormImport";
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

const ProductManager = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCT_SAGA });
  }, []);
  const arr = useSelector((state) => state.ProductReducer.arrProduct);
  console.log(arr);
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "productId",
      key: "productId",
      width: "40px",
    },
    {
      title: "Hình ảnh",
      key: "price",
      render: (text, record, index) => {
        return (
          <div className="w-50">
            <img src={`http://localhost:8080/products/` + record.image} alt />
          </div>
        );
      },

      ellipsis: true,
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Gía cả",
      key: "price",
      render: (text, record, index) => {
        return <p>{numberWithCommas(record.price)}</p>;
      },

      ellipsis: true,
    },
    {
      title: "Số lượng",
      key: "quantity",
      render: (text, record, index) => {
        return <p>{numberWithCommas(record.quantity)}</p>;
      },

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
                Component: <FormEditProduct product={record} />,
                title: "Sửa sản phẩm",
              };
              dispatch(action);
              dispatch({
                type: GET_ID_PRODUCT,
                id: record.productId,
              });
              dispatch({ type: GET_DETAIL_PRODUCT_SAGA, id: record.productId });
            }}
          />

          <Popconfirm
            title="Are you sure to delete this import?"
            onConfirm={() => {
              const action = {
                type: DELETE_PRODUCT_SAGA,
                id: record.productId,
              };

              dispatch(action);
              dispatch({ type: GET_ALL_PRODUCT_SAGA });
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
            Component: <FormAddProduct />,
            title: "Thêm sản phẩm",
          };
          dispatch(action);
        }}
      >
        Thêm sản phẩm
      </Button>
      {arr && arr.length > 0 && (
        <Table columns={columns} dataSource={arr} onChange={handleChange} />
      )}
    </div>
  );
};

export default ProductManager;
