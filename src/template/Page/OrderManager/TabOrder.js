import { AndroidOutlined, AppleOutlined } from "@ant-design/icons";
import { Tabs } from "antd";
import React from "react";
import OrderView from "./OrderView";
const { TabPane } = Tabs;

const TabOrder = () => (
  <div className="container">
    <Tabs defaultActiveKey="0">
      <TabPane
        tab={
          <span>
            <AppleOutlined />
            Tất cả
          </span>
        }
        key="1"
      >
        <OrderView status="0" />
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Chờ xử lý
          </span>
        }
        key="2"
      >
        <OrderView status="1" />
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Yêu cầu hủy
          </span>
        }
        key="3"
      >
        <OrderView status="2" />
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Đang giao
          </span>
        }
        key="4"
      >
        <OrderView status="3" />
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Đã giao
          </span>
        }
        key="5"
      >
        <OrderView status="4" />
      </TabPane>
      <TabPane
        tab={
          <span>
            <AndroidOutlined />
            Đã hủy
          </span>
        }
        key="6"
      >
        <OrderView status="5" />
      </TabPane>
    </Tabs>
  </div>
);

export default TabOrder;
