import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import {
  API_ROOT,
  CREATE_PROJECT_SAGA,
} from "../../constants/CyberBugs/CyberBug";
import UploadImage from "../../template/Page/UploadImage/UploadImage";
import axios from "axios";
import { UPLOAD_IMAGE_PRODUCT } from "../../util/constant/UploadImageConstant";
import { GET_ALL_BRAND_SAGA } from "../../util/constant/BrandConstant";
import MutilUploadImage from "../../template/Page/UploadImage/MutilUploadImage";
import { NotificationCycberbug } from "../../util/Notification/NotificationCycberbug";
import { GET_ALL_PRODUCT_SAGA } from "../../util/constant/ProductConstant";
import { UPLOAD_IMAGE_USER } from "../../util/constant/UserContant";
const FormEditUser = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const { user } = props;
  console.log(values);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "SUBMIT_EDIT_DRAWER", Submition: handleSubmit });
  }, [user]);
  dispatch({
    type: UPLOAD_IMAGE_USER,
    imageUser: user.image,
  });
  return (
    <div className=" m-5">
      <h3>Thông tin người dùng</h3>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Hình ảnh</p>
          <MutilUploadImage type="user" image={user.image} />
        </div>
        <div className="form-group">
          <p>Username</p>
          <input
            className="form-control"
            value={values.username}
            name="username"
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <p>Firstname</p>
                  <input
                    className="form-control"
                    value={values.firstname}
                    name="firstname"
                  />
                </div>
                <div className="col-6">
                  <p>Lastname</p>
                  <input
                    className="form-control"
                    value={values.lastname}
                    name="lastname"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <p>Email</p>
                  <input
                    className="form-control"
                    value={values.email}
                    name="email"
                  />
                </div>
                <div className="col-6">
                  <p>Phone</p>
                  <input
                    className="form-control"
                    value={values.phone}
                    name="phone"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const formEditUser = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { detailUser } = props;
    console.log(detailUser);
    return {
      id: detailUser.id,
      username: detailUser.username,
      firstname: detailUser.firstName,
      lastname: detailUser.lastName,
      phone: detailUser.phone,
      email: detailUser.email,
    };
  },
  validationSchema: Yup.object().shape({
    // // Validate form field
    // projectName2: Yup.string()
    //   .required("projectName is required")
    //   .min(5, "projectName must have min 5 characters")
    //   .max(10, "projectName have max 10 characters"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    let loginData = JSON.parse(localStorage.getItem("login"));
    const { imageFile, imageUser } = props;
    const formData = new FormData();
    formData.append("file", imageFile.originFileObj);

    imageUser === ""
      ? axios
          .post(`${API_ROOT}/api/image/user`, formData, {
            headers: {
              Authorization: "Bearer " + loginData.dataLogin.accessToken,
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              props.dispatch({
                type: UPLOAD_IMAGE_USER,
                imageUser: res.data,
              });
              values["image"] = res.data;

              axios
                .request({
                  method: "PUT",
                  url: `${API_ROOT}/api/users/edit-profile`,
                  headers: {
                    Authorization: "Bearer " + loginData.dataLogin.accessToken,
                  },
                  data: {
                    id: values.id,
                    username: values.username,
                    firstName: values.firstname,
                    lastName: values.lastname,
                    password: "123456",
                    image: values.image,
                    phone: values.phone,
                    email: values.email,
                  },
                })
                .then((response) => {
                  NotificationCycberbug("success", response.data.message);
                  props.dispatch({ type: GET_ALL_PRODUCT_SAGA });

                  props.dispatch({ type: "CLOSE_DRAWER" });
                })
                .catch((error) => {
                  NotificationCycberbug("error", "Chưa điền đủ thông tin");
                });
            }
          })
          .catch((err) => {})
      : axios
          .request({
            method: "PUT",
            url: `${API_ROOT}/api/users/edit-profile`,
            headers: {
              Authorization: "Bearer " + loginData.dataLogin.accessToken,
            },
            data: {
              id: values.id,
              username: values.username,
              firstName: values.firstname,
              lastName: values.lastname,
              password: "123456",
              image: imageUser,
              phone: values.phone,
              email: values.email,
            },
          })
          .then((response) => {
            NotificationCycberbug("success", response.data.message);
            props.dispatch({ type: GET_ALL_PRODUCT_SAGA });

            props.dispatch({ type: "CLOSE_DRAWER" });
          })
          .catch((error) => {
            NotificationCycberbug("error", "Chưa điền đủ thông tin");
          });
  },
  displayName: "Update Form",
})(FormEditUser);
const mapStateToProps = (state) => {
  return {
    detailUser: state.UserReducer.detailUser,
    imageFile: state.UploadImageReducer.fileImage,
    imageUser: state.UploadImageReducer.imageUser,
  };
};
export default connect(mapStateToProps)(formEditUser);
