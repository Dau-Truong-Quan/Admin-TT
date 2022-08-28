import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import ContentCycberbug from "../../component/CycberBug/Main/ContentCycberbug";
import HeaderCycberbug from "../../component/CycberBug/Main/HeaderCycberbug";
import InforCyberBug from "../../component/CycberBug/Main/InforCyberBug";
import MenuCycberBug from "../../component/CycberBug/MenuCycberBug";
import ModelCycberbug from "../../component/CycberBug/ModelCycberbug/ModelCycberbug";
import SidebarCycberbug from "../../component/CycberBug/SidebarCycberbug";

export const CycberBugTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <div>
            <div className="jira">
              {/* Sider Bar  */}
              <SidebarCycberbug />
              {/* Menu */}
              <MenuCycberBug />
              {/* {/* {/* Main Board * /} * /} */}

              <Component {...propsRoute} />
            </div>
            {/* Search Modal */}
            <div
              className="modal fade"
              id="searchModal"
              tabIndex={-1}
              role="dialog"
              aria-labelledby="searchModal"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-search">
                <div className="modal-content">
                  <div className="modal-header">
                    <div className="search-block">
                      <input className="search" />
                      <i className="fa fa-search" />
                    </div>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>RECENT ISSUES</p>
                    <div style={{ display: "flex" }}>
                      <div className="icon">
                        <i className="fa fa-bookmark" />
                      </div>
                      <div>
                        <p>cyberlearn</p>
                        <p>BUG-238066</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Info Modal */}
            <ModelCycberbug />
          </div>
        );
      }}
    />
  );
};
