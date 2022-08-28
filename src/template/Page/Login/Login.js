import { Button, Checkbox, Input } from "antd";
import React from "react";
import { withFormik, Form } from "formik";
import { LockOutlined, TwitterOutlined, UserOutlined } from "@ant-design/icons";
import * as Yup from "yup";
import { connect } from "react-redux/es/exports";
import { USER_SIGN_API } from "../../../constants/CyberBugs/CyberBug";
import { signinCyberbugAction } from "../../../actions/CyberBugsAction";
const Login = (props) => {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    props;
  console.log(props);
  return (
    <form onSubmit={handleSubmit}>
      <div className="d-flex mt-3">
        <Input
          onChange={handleChange}
          style={{ width: "100%", minWidth: 300 }}
          name="email"
          size="large"
          placeholder="email"
          prefix={<UserOutlined />}
        />
        <div className="text-danger">{errors.email}</div>
        <Input
          onChange={handleChange}
          style={{ width: "100%", minWidth: 300 }}
          name="passWord"
          size="large"
          placeholder="passWord"
          prefix={<LockOutlined />}
        />

        <Button htmlType="submit">Login</Button>
        <Button
          type="primary ml-3"
          shape="circle"
          icon={<TwitterOutlined />}
          size={"large"}
        />
      </div>
    </form>
  );
};

const LoginCyberBugsWithFormik = withFormik({
  mapPropsToValues: () => ({ email: "", password: "" }),
  validationSchema: Yup.object().shape({
    // Validate form field
    email: Yup.string()
      .required("Email is required")
      .min(5, "Email must have min 5 characters")
      .max(10, "Email have max 10 characters"),
  }),
  handleSubmit: ({ email, passWord }, { props, setSubmitting }) => {
    props.dispatch(signinCyberbugAction(email, passWord));
  },

  displayName: "BasicForm",
})(Login);

export default connect()(LoginCyberBugsWithFormik);
