import React from "react";

const ContentCycberbug = (props) => {
  const { projectDetail } = props;
  console.log(projectDetail);
  const renderAvatar = () => {
    return projectDetail.lstTask?.map((taskListDetail, index) => {
      return (
        <div
          key={index}
          className="card"
          style={{ width: "17rem", height: "20rem" }}
        >
          <div className="card-header">{taskListDetail.statusName}</div>
          <ul className="list-group list-group-flush">
            {taskListDetail.lstTaskDeTail.map((task, index) => {
              <li
                key={index}
                className="list-group-item"
                data-toggle="modal"
                data-target="#infoModal"
                style={{ cursor: "pointer" }}
              >
                <p>{task.taskName}</p>
                <div className="block" style={{ display: "flex" }}>
                  <div className="block-left">
                    <i className="fa fa-bookmark" />
                    <i className="fa fa-arrow-up" />
                  </div>
                  <div className="block-right">
                    <div className="avatar-group" style={{ display: "flex" }}>
                      {task.assigness.map((mem, index) => {
                        return (
                          <div className="avatar" key={index}>
                            <img src={mem.avatar} alt={mem.avatar} />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </li>;
            })}
          </ul>
        </div>
      );
    });
  };

  return (
    <div className="content" style={{ display: "flex" }}>
      {renderAvatar()}
    </div>
  );
};

export default ContentCycberbug;
