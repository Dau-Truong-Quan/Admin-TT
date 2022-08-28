import React, { Fragment } from "react";
import { Route } from "react-router-dom";

export const HomeTemplate = (props) => {
  const { Component, ...restParam } = props;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            {/* <Header/> */}
            <p>header</p>
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
