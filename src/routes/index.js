import React from 'react';
import {
    Route,
    Switch,
    Redirect
} from 'react-router';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css'

import SidebarWithNavbar from './Layouts/SidebarWithNavbar';

export const RoutedContent = () => {
    return(
        <Switch>
            <Redirect from="/" to="/layouts/sidebar-with-navbar" exact />
            
            <Route path="/layouts/sidebar-with-navbar" component={SidebarWithNavbar} />

        </Switch>
    );
}

export const RoutedNavbars = () => {
    return(
        <h1>Hello from route</h1>
    );
}

export const RoutedSidebars = () => {
    return(
        <h1>Hello from route</h1>
    );
}