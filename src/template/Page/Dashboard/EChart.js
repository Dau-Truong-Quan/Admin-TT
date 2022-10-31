import ReactApexChart from "react-apexcharts";
import { Row, Col, Typography } from "antd";
import eChart from "./configs/eChart";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import numberWithCommas from "../../../util/lib/numberWithCommas";
import { API_ROOT } from "../../../constants/CyberBugs/CyberBug";
function EChart(props) {
  const { Title, Paragraph } = Typography;
  const dispatch = useDispatch();

  const [sales, setSales] = useState({});

  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .get(
        `${API_ROOT}/api/admin/dashboard/perYear?year=${props.yearsChoose}`,
        {
          headers: {
            Authorization: "Bearer " + loginData.dataLogin.accessToken,
          },
        }
      )
      .then((response) => {
        setSales(response.data.data);
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
  }, [props.yearsChoose]);

  const { valueHeader } = useSelector((state) => state.DashboardReducer);
  const items = [
    {
      Title: valueHeader.totalUser,
      user: "Users",
    },
    {
      Title: valueHeader.totalProduct,
      user: "Items",
    },

    {
      Title: numberWithCommas(valueHeader.todaySales) + "Đ",
      user: "Today sale",
    },

    {
      Title: numberWithCommas(valueHeader.totalSales) + "Đ",
      user: "Total Sales",
    },
  ];
  const series = [
    {
      name: "Sales",
      data: [
        sales[0],
        sales[1],
        sales[2],
        sales[3],
        sales[4],
        sales[5],
        sales[6],
        sales[7],
        sales[8],
        sales[9],
        sales[10],
        sales[11],
      ],
      color: "#fff",
    },
  ];

  return (
    <>
      <div id="chart">
        <ReactApexChart
          className="bar-chart"
          options={eChart.options}
          series={series}
          type="bar"
          height={220}
        />
      </div>
      <div className="chart-vistior">
        <Title level={5}>Hoạt động</Title>

        <Paragraph className="lastweek">
          Các số liệu hoạt động của ministore
        </Paragraph>
        <Row gutter>
          {items.map((v, index) => (
            <Col xs={6} xl={6} sm={6} md={6} key={index}>
              <div className="chart-visitor-count">
                <Title level={4}>{v.Title}</Title>
                <span>{v.user}</span>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}

export default EChart;
