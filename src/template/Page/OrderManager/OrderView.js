import React from "react";

import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { withRouter } from "react-router-dom";

import image from "../../../assets/img/chuaCoDonHang.png";
import { message } from "antd";
import { CarOutlined, MoneyCollectOutlined } from "@ant-design/icons";
import numberWithCommas from "../../../util/lib/numberWithCommas";
import { API_ROOT } from "../../../constants/CyberBugs/CyberBug";
const OrderView = (props) => {
  const dispatch = useDispatch();

  const [listOrder, setListOrder] = React.useState(null);
  let idOrder = props.status;
  console.log(listOrder);
  React.useEffect(() => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .get(`${API_ROOT}/api/admin/order/`, {
        params: {
          statusId: idOrder,
        },
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        console.log(response);
        setListOrder(response.data);
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

  const handleChangeStatus = (idStatus, orderId) => {
    let loginData = JSON.parse(localStorage.getItem("login"));

    axios
      .request({
        method: "PUT",
        url: `${API_ROOT}/api/order/${orderId}`,
        params: {
          statusId: idStatus,
        },
        headers: {
          Authorization: "Bearer " + loginData.dataLogin.accessToken,
        },
      })
      .then((response) => {
        axios
          .get(`${API_ROOT}/api/order/user2/${loginData.dataLogin.id}`, {
            params: {
              statusId: idOrder,
            },
            headers: {
              Authorization: "Bearer " + loginData.dataLogin.accessToken,
            },
          })
          .then((response) => {
            setListOrder(response.data);
          })
          .catch((eror) => {});
        message.success("Thành công");
      })
      .catch((error) => {
        message.error("thất bại");
      });
  };

  const renderButton = (status, orderId) => {
    if (status == 1 || status == 0) {
      return (
        <div className="d-flex">
          <button
            className="stardust-button stardust-button--primary stardust-button--large gG-FcK _5POGMB "
            onClick={() => {
              handleChangeStatus(3, orderId);
            }}
          >
            Xác nhận
          </button>
          <button
            className="stardust-button vg-cf0"
            onClick={() => {
              handleChangeStatus(5, orderId);
            }}
          >
            Hủy
          </button>
        </div>
      );
    } else if (status == 0 || status == 2) {
      return (
        <button
          className="stardust-button vg-cf0"
          onClick={() => {
            handleChangeStatus(5, orderId);
          }}
        >
          Xác nhận hủy
        </button>
      );
    } else if (status == 0 || status == 3) {
      return (
        <button
          className="stardust-button vg-cf0"
          onClick={() => {
            handleChangeStatus(4, orderId);
          }}
        >
          Giao không thành công
        </button>
      );
    }
  };

  return (
    <>
      {listOrder?.length < 1 ? (
        <>
          <img src={image} alt="" />
        </>
      ) : (
        listOrder?.map((item, index) => (
          <div key={index}>
            <div className="order__view">
              <div className="order__view__header">
                <CarOutlined />
                <span>{item.statusId.description}</span>
              </div>
              {item?.orderDetails?.map((itemOrder, index) => (
                <div key={index}>
                  <div className="border__seapare"></div>
                  <div className="order__view__body">
                    <div className="order__view__body__image">
                      <img
                        src={
                          `${API_ROOT}/images/products/` +
                          itemOrder.product.image
                        }
                        alt=""
                      />
                    </div>
                    <div className="order__view__body__content">
                      <div>{itemOrder.product.name}</div>
                      <div>
                        Phân loại hàng : {itemOrder.product.category.name}
                      </div>
                      <div className="order__view__body__content__quality">
                        x {itemOrder.quantity}
                      </div>
                    </div>
                    <div className="order__view__body__price">
                      <div className="order__view__body__price__old">
                        {itemOrder.product.discount > 0 ? (
                          <del>{itemOrder.price}</del>
                        ) : (
                          <></>
                        )}
                      </div>
                      <div className="order__view__body__price__new">
                        {numberWithCommas(
                          (itemOrder.price *
                            (100 - itemOrder.product.discount)) /
                            100
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              <div className="order__view__footer">
                <div className="border__seapare"></div>
                <div className="order__view__footer__totalprice">
                  <MoneyCollectOutlined />
                  <span>
                    Tổng tiền:{" "}
                    <span>
                      {item?.orderDetails?.reduce(
                        (total, items) =>
                          total +
                          (Number(items.quantity) *
                            (items.price * (100 - items.product.discount))) /
                            100,
                        0
                      )}
                    </span>
                  </span>
                </div>

                <div className="order__view__footer__button">
                  {renderButton(item.statusId.statusId, item.orderId)}
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default withRouter(OrderView);
