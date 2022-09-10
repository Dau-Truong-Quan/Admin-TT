import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { AutoComplete, Avatar, Button, Popover, Space, Table, Tag } from "antd";
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

const ProjectManager = () => {
  const [sortedInfo, setSortedInfo] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: GET_ALL_IMPORT_SAGA });
  }, []);
  const arr = useSelector((state) => state.ImportReducer.arrImport);

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
      title: "Ngay",
      key: "date",
      dataIndex: "date",
    },
    {
      title: "Người nhập",
      key: "name",
      render: (text, record, index) => {
        return <p>{record.user?.firstName + " " + record.user?.lastName}</p>;
      },
      sorter: (a, b) => a.age - b.age,
      sortOrder: sortedInfo.columnKey === "age" ? sortedInfo.order : null,
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
                Component: <FormImport />,
                title: "Phiếu nhập cũ",
              };
              dispatch(action);
              dispatch({
                type: GET_ID_IMPORT,
                id: record.id,
              });
              dispatch({ type: GET_ALL_IMPORTDETAIL_SAGA, id: record.id });
            }}
          />

          <Popconfirm
            title="Are you sure to delete this import?"
            onConfirm={() => {
              const action = {
                type: DELETE_IMPORT_SAGA,
                id: record.id,
              };

              dispatch(action);
              dispatch({ type: GET_ALL_IMPORT_SAGA });
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
      <div className="mt-5 mb-5 ">Import Manager</div>
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
            Component: <FormImport />,
            title: "Phiếu nhập mới",
          };

          dispatch(action);
          dispatch({ type: CREATE_IMPORT_SAGA });
        }}
      >
        Thêm phiếu nhập
      </Button>
      <Table columns={columns} dataSource={arr} onChange={handleChange} />
    </div>
  );
};

export default ProjectManager;
