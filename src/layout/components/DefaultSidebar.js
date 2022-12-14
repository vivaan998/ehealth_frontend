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
            isDataGetting: false,
        }
    }
    getMenu = async () => {
        try{
            this.setState({
                isDataGetting: true
            });
            const response = await MenuListingService.getMenu();
            if (response.status == true){
                this.setState({
                    profileData: response.data.data,
                    menuItems: response.data.menu,
                    isLoading: false,
                    isDataGetting: false                    
                });
                Config.setProfileData(this.state.profileData);
                let menu;
                var temp = this.state.menuItems;
                menu = (temp).map(o => o.title);
                    this.setState({
                        menuList: menu
                });

                if (Config.getProfileData().role === 0){
                    this.props.history.push({
                        pathname: "/mymedicalreport",
                    })
                }
                if (Config.getProfileData().role === 10){
                    this.props.history.push({
                        pathname: "/patients",
                    })
                }
                if (Config.getProfileData().role === 50){
                    this.props.history.push({
                        pathname: "/practitioners",
                    })
                }
                if (Config.getProfileData().role != 100){
                    this.setState({
                        menuList: (this.state.menuList).filter(e => e !== 'Dashboard')
                    })
                }

            }
        }
        catch(e){
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
                    <SidebarTrigger tag={ 'a' } href="javascript:;">
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
                    {this.state.isDataGetting ? 'Loading menu...': ''}
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