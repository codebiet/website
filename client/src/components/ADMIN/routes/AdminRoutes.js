import React from "react";
import { Route } from "react-router-dom";
import eventRoutes from "../Events/eventRoutes";
import blogRoutes from "../Blogs/blogRoutes";
import projectRoutes from "../Projects/projectRoutes";
import homeRoutes from "../Home/homeRoutes";
const routes = [...eventRoutes, ...blogRoutes, ...projectRoutes, ...homeRoutes];
// export default routes;
const Routes = () => {
  return (
    <>
      {routes.map((adminRoute) => {
        return (
          <Route
            key={adminRoute.path}
            exact={true}
            path={adminRoute.path}
            render={(props) => <adminRoute.Component {...props} />}
          />
        );
      })}
    </>
  );
};
export default Routes;
