import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { DefaultNavbar } from "./../layout/components/DefaultNavbar";
import { DefaultSidebar } from "./../layout/components/DefaultSidebar";

import SidebarWithNavbar from "./Layouts/SidebarWithNavbar";

export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/layouts/sidebar-with-navbar" exact />
      <Route
        path="/layouts/sidebar-with-navbar"
        component={SidebarWithNavbar}
      />
    </Switch>
  );
};

export const RoutedNavbars = () => {
  return (
    <switch>
      {/* Default Navbar: */}
      <Route component={DefaultNavbar} />
    </switch>
  );
};

export const RoutedSidebars = () => {
  return (
    <switch>
      {/* Default Sidebar: */}
      <Route component={DefaultSidebar} />
    </switch>
  );
};
