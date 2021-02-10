import React from 'react';
import { Link } from 'react-router-dom';
import MenuListingService from '../../services/MenuListingService'
import AuthenticationService from '../../services/AuthenticationService';
import {
    Sidebar,
    SidebarTrigger,
} from './../../components';

import SidebarMiddleNav from './SidebarMiddleNav';

import SidebarTopA from '../../routes/components/Sidebar/SidebarTopA'
import { SidebarBottomA } from '../../routes/components/Sidebar/SidebarBottomA'
import { LogoThemed } from '../../routes/components/LogoThemed/LogoThemed';
import Config from './../../config/Config';

class DefaultSidebar extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            profileData: 'Default User',
            menuItems: '',
            menuList: '',
        }
    }
    getMenu = async () => {
        try{
            const response = await MenuListingService.getMenu();
            if (response.status == true){
                this.setState({
                    profileData: response.data.data,
                    menuItems: response.data.menu,
                    isLoading: false,
                    
                });
                Config.profileData = this.state.profileData;
                console.log('menuItems >>>', this.state.menuItems);
                let menu;
                var temp = this.state.menuItems;
                menu = (temp).map(o => o.title);
                    this.setState({
                        menuList: menu
                });

            }
        }
        catch(e){
            console.log('error >>>', e);
            console.log(e, e.data);
        }
    }

    componentDidMount = async () => { 
        if (AuthenticationService.getUser()){
            this.getMenu();
            
        }
        else{
            this.props.history.push({
                pathname: "/login",
            })
        }
    }
    
    render(){
        return(
            <Sidebar>
                { /* START SIDEBAR-OVERLAY: Close (x) */ }
                <Sidebar.Close>
                    <SidebarTrigger tag={ 'a' } href="javascript;">
                        <i className="fa fa-times-circle fa-fw"></i>
                    </SidebarTrigger>
                </Sidebar.Close>
                { /* START SIDEBAR-OVERLAY: Close (x) */ }
                
                { /* START SIDEBAR: Only for Desktop */ }
                <Sidebar.HideSlim>
                    <Sidebar.Section>
                        <Link to="/" className="sidebar__brand">
                            <LogoThemed checkBackground />
                        </Link>
                    </Sidebar.Section>
                </Sidebar.HideSlim>
                { /* END SIDEBAR: Only for Desktop */ }

                { /* START SIDEBAR: Only for Mobile */ }
                <Sidebar.MobileFluid>
                    <SidebarTopA data={this.state} {...this.props}/>
                    
                    <Sidebar.Section fluid cover>
                        { /* SIDEBAR: Menu */ }
                        <SidebarMiddleNav {...this.props} data={this.state}/>
                    </Sidebar.Section>
                </Sidebar.MobileFluid>
                { /* END SIDEBAR: Only for Mobile */ }
            </Sidebar>
        )
    }
}

export default DefaultSidebar;