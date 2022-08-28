import React from "react";

import ContentCycberbug from "../../component/CycberBug/Main/ContentCycberbug";
import HeaderCycberbug from "../../component/CycberBug/Main/HeaderCycberbug";
import InforCyberBug from "../../component/CycberBug/Main/InforCyberBug";
import { connect, useSelector, useDispatch } from "react-redux";
import { initializeUseSelector } from "react-redux/es/hooks/useSelector";
import { useEffect } from "react";
const IndexCycberbug = (props) => {
  const dispatch = useDispatch();
  const { projectDetail } = useSelector((state) => state.DetailProject);
  console.log(projectDetail);
  useEffect(() => {
    const { idProduct } = props.match.params;

    dispatch({
      type: "GET_PROJECT_DETAIL",
      idProject: idProduct,
    });
  }, []);

  return (
    <div className="main">
      <HeaderCycberbug projectDetail={projectDetail} />
      <h3>Cyber Board</h3>
      <InforCyberBug projectDetail={projectDetail} />
      <ContentCycberbug projectDetail={projectDetail} />
    </div>
  );
};

export default IndexCycberbug;
