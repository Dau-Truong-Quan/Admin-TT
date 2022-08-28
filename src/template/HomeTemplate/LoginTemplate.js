import { Route } from "react-router-dom";

export const LoginTemplate = (propsRouter) => {
  const { Component, ...restParam } = propsRouter;
  return (
    <Route
      {...restParam}
      render={(propsRoute) => {
        return (
          <>
            <Component {...propsRoute} />
          </>
        );
      }}
    />
  );
};
