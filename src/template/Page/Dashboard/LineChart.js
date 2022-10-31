/*!
  =========================================================
  * Muse Ant Design Dashboard - v1.0.0
  =========================================================
  * Product Page: https://www.creative-tim.com/product/muse-ant-design-dashboard
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/muse-ant-design-dashboard/blob/main/LICENSE.md)
  * Coded by Creative Tim
  =========================================================
  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import ReactApexChart from "react-apexcharts";
import { Typography } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import lineChart from "./configs/lineChart";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_ROOT } from "../../../constants/CyberBugs/CyberBug";
function LineChart() {
  const { Title, Paragraph } = Typography;
  const [salesThisyear, setSalesThisyear] = useState({});
  const [salesLastyear, setSalesLastyear] = useState({});
  const dispatch = useDispatch();
  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .get(`${API_ROOT}/api/admin/dashboard/perYear?year=${2022}`, {
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        // dispatch({ type: "SET_COMPARE", compare: response.data.data });

        setSalesThisyear(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("request");
        } else if (error.message) {
          console.log(error.message);
        }
      });
    axios
      .get(`${API_ROOT}/api/admin/dashboard/perYear?year=${2021}`, {
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        // dispatch({ type: "SET_COMPARE", compare: response.data.data });
        setSalesLastyear(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log("request");
        } else if (error.message) {
          console.log(error.message);
        }
      });
  }, []);

  const series = [
    {
      name: "This year",
      data: [
        salesThisyear[0],
        salesThisyear[1],
        salesThisyear[2],
        salesThisyear[3],
        salesThisyear[4],
        salesThisyear[5],
        salesThisyear[6],
        salesThisyear[7],
        salesThisyear[8],
        salesThisyear[9],
        salesThisyear[10],
        salesThisyear[11],
      ],
      offsetY: 0,
    },
    {
      name: "Last year",
      data: [
        salesLastyear[0],
        salesLastyear[1],
        salesLastyear[2],
        salesLastyear[3],
        salesLastyear[4],
        salesLastyear[5],
        salesLastyear[6],
        salesLastyear[7],
        salesLastyear[8],
        salesLastyear[9],
        salesLastyear[10],
        salesLastyear[11],
      ],
      offsetY: 0,
    },
  ];
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={5}>Active Users</Title>
          <Paragraph className="lastweek">
            than last week <span className="bnb2">+30%</span>
          </Paragraph>
        </div>
        <div className="sales">
          <ul>
            <li>{<MinusOutlined />} Last year</li>
            <li>{<MinusOutlined />} This year</li>
          </ul>
        </div>
      </div>

      <ReactApexChart
        className="full-width"
        options={lineChart.options}
        series={series}
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}

export default LineChart;
