import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useState } from "react";
import { Select } from "antd";
import * as Yup from "yup";
import { withFormik } from "formik";
import { connect, useSelector, useDispatch } from "react-redux";
import { GET_USER_BY_PRODUCTID_SAGA } from "../../util/constant/UserContant";
import { GET_ALL_PRODUCT_SAGA } from "../../util/constant/ProductConstant";
const { Option } = Select;
const children = [];

for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const FormCreateTask = (props) => {
  const dispatch = useDispatch();
  const arrProduct = useSelector((state) => state.ProductReducer.arrProduct);

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
  console.log(arrProduct);
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Sản phẩm</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            dispatch({
              type: GET_USER_BY_PRODUCTID_SAGA,
              idProject: e.target.value,
            });
            setFieldValue("projectId", e.target.value);
          }}
        >
          {arrProduct.map((product, index) => {
            return (
              <option key={index} value={product.id}>
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
          name="originalEstimate"
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
          name="originalEstimate"
          defaultValue={0}
          className="form-control"
          onChange={handleChange}
        />
      </div>
    </form>
  );
};

const createTaskForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrProject, arrTaskType, arrPriority, arrStatus } = props;

    return {
      taskName: "",
      description: "",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },
  validationSchema: Yup.object().shape({}),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({ type: "CREATE_TASK_SAGA", taskObject: values });
  },
  displayName: "Create task form",
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectListRedux.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};
export default connect(mapStateToProps)(createTaskForm);
