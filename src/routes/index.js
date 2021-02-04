import React from "react";
import { Route, Switch, Redirect } from "react-router";
import { DefaultNavbar } from "./../layout/components/DefaultNavbar";
import { DefaultSidebar } from "./../layout/components/DefaultSidebar";

import {
    Appointments,
    DashboardGeneral,
    Immunizations,
    MedicalReport,
    Patients,
    Practitioners,
    Providers,
    Vaccines
} from './Content'
// import SidebarWithNavbar from "./Layouts/SidebarWithNavbar";

export const RoutedContent = () => {
  return (
    <Switch>
      <Redirect from="/" to="/dashboard" exact />

      <Route path="/dashboard" exact component={DashboardGeneral} />

      <Route path='/mymedicalreport' exact component={MedicalReport} />

      <Route path='/appointments' exact component={Appointments} />

      <Route path='/immunizations' exact component={Immunizations} />

      <Route path='/patients' exact component={Patients} />

      <Route path='/providers' exact component={Providers} />

      <Route path='/vaccines' exact component={Vaccines} />

      <Route path='/practitioners' exact component={Practitioners} />

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
