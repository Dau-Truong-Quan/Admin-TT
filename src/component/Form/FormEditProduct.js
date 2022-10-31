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
const FormEditProduct = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const { product } = props;
  console.log(product);
  // const product = useSelector((state) => state.ProductReducer.detailProduct);
  const arrCategory = useSelector((state) => state.CategoryReducer.arrCategory);
  const arrBrand = useSelector((state) => state.BrandReducer.arrBrand);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET_ALL_CATEGORY_SAGA" });
    dispatch({ type: GET_ALL_BRAND_SAGA });
    dispatch({ type: "SUBMIT_EDIT_DRAWER", Submition: handleSubmit });
    dispatch({ type: UPLOAD_IMAGE_PRODUCT, imageProduct: product.image });
  }, [product]);
  return (
    <div className=" m-5">
      <h3>Thông tin sản phẩm</h3>
      <form onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Project id</p>
          <input
            disabled={true}
            className="form-control"
            value={values.productId}
            name="productId"
          />
        </div>
        <div className="form-group">
          <p>Hình ảnh</p>
          <MutilUploadImage type="product" image={product.image} />
        </div>
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" value={values.name} name="name" />
          <div className="text-danger">{errors.projectName}</div>
        </div>

        <div className="form-group">
          <p>Mô tả</p>
          <input
            className="form-control"
            value={values.description}
            name="description"
          />
        </div>
        <div className="form-group">
          <p>Thể loại</p>
          <select
            className="form-control"
            name="categoryId"
            value={values.categoryId}
          >
            {arrCategory.map((item, index) => {
              return (
                <option value={item.categoryId} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <p>Nhà sản xuất</p>
          <select
            className="form-control"
            name="brandId"
            value={values.brandId}
          >
            {arrBrand.map((item, index) => {
              return (
                <option value={item.categoryId} key={index}>
                  {item.name}
                </option>
              );
            })}
          </select>
          <div className="form-group">
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <p>Giá</p>
                    <input
                      className="form-control"
                      type="number"
                      value={values.price}
                      name="price"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-6">
                    <p>Số lượng</p>
                    <input
                      className="form-control"
                      type="number"
                      value={values.quantity}
                      name="quantity"
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <p>giảm giá</p>
            <input
              className="form-control"
              type="number"
              value={values.discount}
              name="discount"
              onChange={handleChange}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

const createPorjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;

    return {
      productId: projectEdit?.productId,
      name: projectEdit?.name,
      description: projectEdit?.description,
      categoryId: 1,
      brandId: 1,
      quantity: projectEdit.quantity,
      price: projectEdit.price,
      discount: projectEdit.discount,
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
    const { imageFile, imageProduct } = props;
    const formData = new FormData();
    formData.append("file", imageFile.originFileObj);
    imageProduct === ""
      ? axios
          .post(
            `${API_ROOT}/api/image/product2/${loginData?.dataLogin.id}`,
            formData,
            {
              headers: {
                Authorization: "Bearer " + loginData.dataLogin.accessToken,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .then((res) => {
            if (res.status === 200) {
              values["image"] = res.data;

              axios
                .request({
                  method: "PUT",
                  url: `${API_ROOT}/api/admin/product/${values.productId}`,
                  headers: {
                    Authorization: "Bearer " + loginData.dataLogin.accessToken,
                  },
                  data: {
                    brandId: values.brandId,
                    categoryId: values.categoryId,
                    description: values.description,
                    image: values.image,
                    name: values.name,
                    price: values.price,
                    quantity: values.quantity,
                    discount: values.discount,
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
            url: `${API_ROOT}/api/admin/product/${values.productId}`,
            headers: {
              Authorization: "Bearer " + loginData.dataLogin.accessToken,
            },
            data: {
              brandId: values.brandId,
              categoryId: values.categoryId,
              description: values.description,
              image: imageProduct,
              name: values.name,
              price: values.price,
              quantity: values.quantity,
              discount: values.discount,
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
})(FormEditProduct);
const mapStateToProps = (state) => {
  return {
    arrCategory: state.ProjectCategoryRedux.arrCategory,
    projectEdit: state.ProductReducer.detailProduct,
    imageFile: state.UploadImageReducer.fileImage,
    imageProduct: state.UploadImageReducer.imageProduct,
  };
};
export default connect(mapStateToProps)(createPorjectForm);
