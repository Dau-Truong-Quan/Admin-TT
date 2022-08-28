import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import * as Yup from "yup";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import { GET_USER_BY_PRODUCTID_SAGA } from "../../util/constant/UserContant";
import { GET_ALL_PRODUCT_SAGA } from "../../util/constant/ProductConstant";
import { ADD_PRODUCT_TO_IMPORT_SAGA } from "../../util/constant/ImportDetailConstant";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const FormAddProductToImport = (props) => {
  const dispatch = useDispatch();
  const arrProduct = useSelector((state) => state.ProductReducer.arrProduct);

  const visible = useSelector(
    (state) => state.FormAddProductToImpotReducer.visible
  );

  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;

  useEffect(() => {
    dispatch({ type: GET_ALL_PRODUCT_SAGA });
  }, []);

  return (
    <Modal
      title="Basic Modal"
      visible={visible}
      onOk={() => {
        handleSubmit();
        dispatch({
          type: "CLOSE_FORM_ADD_PRODUCT",
        });
      }}
      onCancel={() => {
        dispatch({
          type: "CLOSE_FORM_ADD_PRODUCT",
        });
      }}
    >
      <div className="container">
        <div className="form-group">
          <p>Sản phẩm</p>
          <select
            name="productId"
            className="form-control"
            onChange={handleChange}
          >
            {arrProduct?.map((product, index) => {
              return (
                <option key={index} value={product.productId}>
                  {product.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Gía</p>
          <input
            type="number"
            min="0"
            name="price"
            defaultValue={0}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <p>Số lượng</p>
          <input
            type="number"
            min="0"
            name="quantity"
            defaultValue={0}
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>
    </Modal>
  );
};

const addProductToImport = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProduct } = props;

    return {
      price: 0,
      quantity: 0,
      productId: 0,
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: ADD_PRODUCT_TO_IMPORT_SAGA,
      importDetailDTO: values,
    });
  },
  displayName: "Add Product",
})(FormAddProductToImport);

const mapStateToProps = (state) => {
  return {
    arrProduct: state.ProductReducer.arrProduct,
  };
};
export default connect(mapStateToProps)(addProductToImport);
