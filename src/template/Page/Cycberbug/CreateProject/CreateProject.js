import React, { useEffect, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useSelector, useDispatch } from "react-redux";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { CREATE_PROJECT_SAGA } from "../../../../constants/CyberBugs/CyberBug";
const CreateProject = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = props;
  const arr = useSelector((state) => state.ProjectCategoryRedux.arrCategory);
  console.log(props);
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleEditorChange = (content, editor) => {
    console.log(content);
    setFieldValue("description", content);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: "GET__ALL__PROJECT__CATEGORY" });
  }, []);
  return (
    <div className="container m-5">
      <h3>Create Project</h3>
      <form
        className="container"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <div className="form-group">
          <p>Name</p>
          <input className="form-control" name="projectName" />
          <div className="text-danger">{errors.projectName}</div>
        </div>
        <div className="form-group">
          <p>description</p>
          <Editor
            name="description"
            apiKey="your-api-key"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue=""
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={handleEditorChange}
          />
        </div>
        <div className="form-group">
          <select className="form-control" name="categoryId">
            {arr.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary" type="submit">
          Create project
        </button>
      </form>
    </div>
  );
};

const createPorjectForm = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    console.log(props);
    console.log(props.arrCategory[2]?.id);
    return {
      projectName: "",
      description: "",
      categoryId: props.arrCategory[2]?.id,
    };
  },
  validationSchema: Yup.object().shape({
    // Validate form field
    projectName: Yup.string()
      .required("projectName is required")
      .min(5, "projectName must have min 5 characters")
      .max(10, "projectName have max 10 characters"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: CREATE_PROJECT_SAGA,
      newProject: values,
    });
  },
  displayName: "CreateForm",
})(CreateProject);
const mapStateToProps = (state) => {
  return {
    arrCategory: state.ProjectCategoryRedux.arrCategory,
  };
};
export default connect(mapStateToProps)(createPorjectForm);
