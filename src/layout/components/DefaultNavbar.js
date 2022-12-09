import React from 'react';
import { Link } from 'react-router-dom';

import {
    Navbar,
    Nav,
    NavItem,
    SidebarTrigger
} from './../../components';

// import { NavbarActivityFeed } from './NavbarActivityFeed';
// import { NavbarMessages } from './NavbarMessages';
import NavbarUser from './NavbarUser';
import { LogoThemed } from './../../routes/components/LogoThemed/LogoThemed';

class DefaultNavbar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Navbar light expand="xs" fluid>
                <Nav navbar>
                    <NavItem className="mr-3">
                        <SidebarTrigger />
                    </NavItem>
                    <NavItem className="navbar-brand d-lg-none">
                        <Link to="/">
                            <LogoThemed />
                        </Link>
                    </NavItem>
                    <NavItem className="d-none d-md-block">
                        <span className="navbar-text">
                            <h4>eHealth</h4>
                            {/* <Link to="/">
                                <i className="fa fa-home"></i>
                            </Link> */}
                        </span>
                    </NavItem>
                </Nav>
                <Nav navbar className="ml-auto">
                    <NavbarUser className="ml-2" {...this.props} />
                </Nav>
            </Navbar>
        );
    }
}

export default DefaultNavbar
