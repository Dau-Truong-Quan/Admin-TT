import {
  BarsOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusOutlined,
  SearchOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { CREATE_IMPORT_SAGA } from "../../util/constant/ImportConstant";
import FormCreateTask from "../Form/FormCreateTask";
import FormImport from "../Form/FormImport";
const { Header, Sider, Content } = Layout;
const SidebarCycberbug = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ height: "100%" }}
      >
        <div>
          <BarsOutlined
            className="text-right"
            onClick={() => {
              setCollapsed(!collapsed);
            }}
            style={{ color: "white", fontSize: 20, marginLeft: "31px" }}
          />
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          // items={[
          //   {
          //     key: "1",
          //     icon: <PlusOutlined style={{ fontSize: 20 }} />,
          //     label: "Create task",
          //   },
          //   {
          //     key: "2",
          //     icon: <SearchOutlined style={{ fontSize: 20 }} />,
          //     label: "Serach",
          //   },
          // ]}
        >
          <Menu.Item
            key="1"
            icon={<SearchOutlined style={{ fontSize: 20 }} />}
            onClick={() => {
              const action = {
                type: "OPEN_FORM_CREATE_TASK",
                Component: <FormCreateTask />,
                title: "Create task",
              };

              dispatch(action);
            }}
          >
            <span className="mb-2">Create task</span>
          </Menu.Item>

          <Menu.Item key="2" icon={<SearchOutlined style={{ fontSize: 20 }} />}>
            <span className="mb-2">Search</span>
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<SearchOutlined style={{ fontSize: 20 }} />}
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
            <span className="mb-2">Create Import</span>
          </Menu.Item>
        </Menu>
      </Sider>
    </div>
  );
};
export default SidebarCycberbug;
