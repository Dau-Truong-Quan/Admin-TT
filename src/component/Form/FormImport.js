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
  Modal,
  Popover,
  Space,
  Table,
  Tag,
} from "antd";
import React, { useEffect, useState } from "react";
import { connect, useSelector, useDispatch } from "react-redux";
import { message, Popconfirm } from "antd";

import FormEditProject from "./FormEditProject";

import { GET_ALL_PRODUCT_SAGA } from "../../util/constant/ProductConstant";
import FormAddProductToImport from "./FormAddProductToImport";
import { DELETE_IMPORT_DETAIL_SAGA } from "../../util/constant/ImportDetailConstant";

const FormImport = () => {
  const [sortedInfo, setSortedInfo] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCT_SAGA });
    dispatch({ type: "SUBMIT_CREATE_TASK", Submition: handleSubmit2 });
  }, []);

  const arr = useSelector((state) => state.ImportDetailReducer.arrImportDetail);
  const handleSubmit2 = () => {
    dispatch({ type: "CLOSE_DRAWER" });
  };
  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên sản phẩm",
      key: "name",
      render: (text, record, index) => {
        return <p>{record.product.name}</p>;
      },
      sorter: (item1, item2) => {
        if (item1.projectName < item2.projectName) {
          return -1;
        }
        return 1;
      },
    },
    {
      title: "price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {/* <EditOutlined
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_DRAWER",
                Component: <FormEditProject />,
                title: "Edit project",
              };

              dispatch(action);

              dispatch({
                type: "EDIT_PROJECT",
                id: record.id,
              });
            }}
          /> */}

          <Popconfirm
            title="Are you sure to delete this import?"
            onConfirm={() => {
              const action = {
                type: DELETE_IMPORT_DETAIL_SAGA,
                idProduct: record.id,
              };

              dispatch(action);
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
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={() => {
            dispatch({
              type: "OPEN_FORM_ADD_PRODUCT",
            });
          }}
        >
          Thêm
        </Button>
        <FormAddProductToImport />
      </Space>
      <Table columns={columns} dataSource={arr} onChange={handleChange} />
    </div>
  );
};

export default FormImport;
