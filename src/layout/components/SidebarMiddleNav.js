import React from 'react';
import MenuListingService from '../../services/MenuListingService'
import { SidebarMenu } from './../../components';
import AuthenticationService from '../../services/AuthenticationService';
import FlatList from 'flatlist-react';
import Config from './../../config/Config';

class SidebarMiddleNav extends React.Component {
    constructor(props) {
        super(props);
    }


    dashboard() {
        if ((this.props.data.menuList).includes('Dashboard')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-home"></i>}
                title="Dashboard"
                to='/dashboard'
                exact
            />);
        }
        else {
            return (<></>);
        }
    }
    mymedicalreport() {
        if ((this.props.data.menuList).includes('My Medical Record')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-heartbeat"></i>}
                title="My Medical Report"
                to='/mymedicalreport'
                exact
            />);
        }
        else {
            return (<></>);
        }


    }
    appointments() {
        if ((this.props.data.menuList).includes('Appointments')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-calendar"></i>}
                title="Appointments"
                to='/appointments'
                exact
            />);
        }
        else {
            return (<></>);
        }
    }
    patients() {
        if ((this.props.data.menuList).includes('Patients')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-users"></i>}
                title="Patients"
                to='/patients'
                exact
            />);
        }
        else {
            return (<></>);
        }

    }
    immunizations() {
        if ((this.props.data.menuList).includes('Immunizations')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-plus-square"></i>}
                title="Immunizations"
                to='/immunizations'
                exact
            />);
        }
        else {
            return (<></>);
        }

    }

    practitioners() {
        if ((this.props.data.menuList).includes('Practitioners')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-stethoscope"></i>}
                title="Practitioners"
                to='/practitioners'
                exact
            />);
        }
        else {
            return (<></>);
        }

    }
    providers() {
        if ((this.props.data.menuList).includes('Providers')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-medkit"></i>}
                title="Providers"
                to='/providers'
                exact
            />);
        }
        else {
            return (<></>);
        }
    }
    vaccines() {
        if ((this.props.data.menuList).includes('Vaccines')) {
            return (<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-eyedropper"></i>}
                title="Vaccines"
                to='/vaccines'
                exact
            />);
        }
        return (<></>);
    }

    render() {
        return (
            
            <SidebarMenu>
                
                {this.dashboard()}
                {this.mymedicalreport()}
                {this.appointments()}
                {this.patients()}
                {this.immunizations()}
                {this.practitioners()}
                {this.providers()}
                {this.vaccines()}

                <SidebarMenu.Item />

            </SidebarMenu >
        );
    }
}



export default SidebarMiddleNav;
