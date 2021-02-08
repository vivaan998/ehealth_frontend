import React from 'react';
import MenuListingService from '../../services/MenuListingService'
import { SidebarMenu } from './../../components';
import AuthenticationService from '../../services/AuthenticationService';
import FlatList from 'flatlist-react';

class SidebarMiddleNav extends React.Component {
    constructor(props){
        super(props);
        // const menuDict = {
        //     DASHBOARD       : {icon: 'fa fa-fw fa-home', title: 'Dashboard', to: '/dashboard'},
        //     MEDICAL_RECORD  : {icon: 'fa fa-fw fa-heartbeat', title: 'My Medical Record', to: '/mymedicalreport'},
        //     APPOINTMENTS    : {icon: 'fa fa-fw fa-calendar', title: 'Appointments', to: '/appointments'},
        //     PATIENTS        : {icon: 'fa fa-fw fa-users', title: 'Patients', to: '/patients'},
        //     IMMUNIZATIONS   : {icon: 'fa fa-fw fa-plus-square', title: 'Immunizations', to: '/immunizations'},
        //     PRACTITIONERS   : {icon: 'fa fa-fw fa-stethoscope', title: 'Practitioners', to: '/practitioners'},
        //     PROVIDERS       : {icon: 'fa fa-fw fa-medkit', title: 'Providers', to: '/providers'},
        //     VACCINES        : {icon: 'fa fa-fw fa-eyedropper', title: 'Vaccines', to: '/vaccines'},
        // }
        // console.log('props in middleNav>>>', this.props);
        // this.state = {
        //     profileData: '',
        //     menuItems: '',
        //     menuList: '',
        //     isLoading: false,
        //     dashboard: false,
        //     mymedicalreport: false,
        //     appointments: false,
        //     patients: false,
        //     immunizations: false,
        //     practitioners: false,
        //     providers: false,
        //     vaccines: false
        // }
    }    
    // getMenu = async () => {
    //     try{
    //         const response = await MenuListingService.getMenu();
    //         if (response.status == true){
    //             console.log('menu items >>>',response.data.menu);
    //             this.setState({
    //                 menuItems: response.data.menu,
    //                 isLoading: false,
                    
    //             });
    //             console.log('menuItems >>>', this.state.menuItems);
    //             let menu;
    //             var temp = this.state.menuItems;
    //             menu = (temp).map(o => o.title);
    //                 this.setState({
    //                     menuList: menu
    //             });

    //         }
    //     }
    //     catch(e){
    //         alert('catch');
    //         console.log(e, e.data);
    //     }
    // }

    // componentDidMount = async (props) => { 
    //     console.log('props2 >>>', props);
    // }
    
    // componentWillMount = async () => {
    //     if (AuthenticationService.getUser()){
    //         this.getMenu();
    //     }
    //     else{
    //         this.props.history.push({
    //             pathname: "/login",
    //         })
    //     }
    // }

    // renderMenu = (menuItem, idx) => {
    //     console.log(this.state.menuItems);
    //     return (
    //         <SidebarMenu.Item
    //                 key={idx}
    //                 icon={<i className={menuItem.icon}></i>}
    //                 title={menuItem.title}
    //                 to={menuItem.url}
    //         />
    //     )
    // }

    dashboard(){
        if ((this.props.data.menuList).includes('Dashboard')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-home"></i>}
                title="Dashboard"
                to='/dashboard'                    
            />);
        }
        else{
            return(<></>);
        }
    }
    mymedicalreport(){
        if ((this.props.data.menuList).includes('My Medical Record')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-heartbeat"></i>}
                title="My Medical Report"
                to='/mymedicalreport'
            />);
        }
        else{
            return(<></>);
        }


    }
    appointments(){
        if ((this.props.data.menuList).includes('Appointments')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-calendar"></i>}
                title="Appointments"
                to='/appointments'
            />);
            }
        else{
            return(<></>);
        }
    }
    patients(){
        if ((this.props.data.menuList).includes('Patients')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-users"></i>}
                title="Patients"
                to='/patients'
            />);
        }
        else{
            return(<></>);
        }
        
    }
    immunizations(){
        if ((this.props.data.menuList).includes('Immunizations')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-plus-square"></i>}
                title="Immunizations"
                to='/immunizations'
            />);
        }
        else{
            return(<></>);
        }

    }

    practitioners(){
        if ((this.props.data.menuList).includes('Practitioners')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-stethoscope"></i>}
                title="Practitioners"
                to='/practitioners'
            />);
        }
        else{
            return(<></>);
        }

    }
    providers(){
        if ((this.props.data.menuList).includes('Providers')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-medkit"></i>}
                title="Providers"
                to='/providers'
            />);
        }
        else{
            return(<SidebarMenu.Item/>)
        }
    }
    vaccines(){
        if ((this.props.data.menuList).includes('Vaccines')){
            return(<SidebarMenu.Item
                icon={<i className="fa fa-fw fa-eyedropper"></i>}
                title="Vaccines"
                to='/vaccines'
            />);
        }
        else{
            return(<SidebarMenu.Item/>)
        }
    }

    render(){
        return(

            <SidebarMenu>
                {/* <FlatList
                    list={this.state.test}
                    renderItem={item => <li>{item.a}</li>}
                /> */}
                
                {this.dashboard()}
                {this.mymedicalreport()}
                {this.appointments()}
                {this.patients()}
                {this.immunizations()}
                {this.practitioners()}
                {this.providers()}
                {this.vaccines()}
                { /* -------- Cards ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-clone"></i>}
                    title="Cards"
                >
                    <SidebarMenu.Item title="Cards" to='/cards/cards' exact />
                    <SidebarMenu.Item title="Cards Headers" to='/cards/cardsheaders' exact />
                </SidebarMenu.Item> */}
                { /* -------- Layouts ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-columns"></i>}
                    title="Layouts"
                >
                    <SidebarMenu.Item title="Navbar" to='/layouts/navbar' exact />
                    <SidebarMenu.Item title="Sidebar" to='/layouts/sidebar' exact />
                    <SidebarMenu.Item title="Sidebar A" to='/layouts/sidebar-a' exact />
                    <SidebarMenu.Item title="Sidebar With Navbar" to="/layouts/sidebar-with-navbar" exact />
                    <SidebarMenu.Item title="Drag &amp; Drop" to='/layouts/dnd-layout' exact />
                </SidebarMenu.Item> */}
                { /* -------- Interface ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-toggle-on"></i>}
                    title="Interface"
                >
                    <SidebarMenu.Item title="Colors" to='/interface/colors' />
                    <SidebarMenu.Item title="Typography" to='/interface/typography' />
                    <SidebarMenu.Item title="Buttons" to='/interface/buttons' />
                    <SidebarMenu.Item title="Paginations" to='/interface/paginations' />
                    <SidebarMenu.Item title="Images" to='/interface/images' />
                    <SidebarMenu.Item title="Avatars" to='/interface/avatars' />
                    <SidebarMenu.Item title="Progress Bars" to='/interface/progress-bars' />
                    <SidebarMenu.Item title="Badges &amp; Labels" to='/interface/badges-and-labels' />
                    <SidebarMenu.Item title="Media Objects" to='/interface/media-objects' />
                    <SidebarMenu.Item title="List Groups" to='/interface/list-groups' />
                    <SidebarMenu.Item title="Alerts" to='/interface/alerts' />
                    <SidebarMenu.Item title="Accordions" to='/interface/accordions' />
                    <SidebarMenu.Item title="Tabs Pills" to='/interface/tabs-pills' />
                    <SidebarMenu.Item title="Tooltips &amp; Popovers" to='/interface/tooltips-and-popovers' />
                    <SidebarMenu.Item title="Dropdowns" to='/interface/dropdowns' />
                    <SidebarMenu.Item title="Modals" to='/interface/modals' />
                    <SidebarMenu.Item title="Breadcrumbs" to='/interface/breadcrumbs' />
                    <SidebarMenu.Item title="Navbars" to='/interface/navbars' />
                    <SidebarMenu.Item title="Notifications" to='/interface/notifications' />
                    <SidebarMenu.Item title="Crop Image" to='/interface/crop-image' />
                    <SidebarMenu.Item title="Drag &amp; Drop Elements" to='/interface/drag-and-drop-elements' />
                    <SidebarMenu.Item title="Calendar" to='/interface/calendar' />
                </SidebarMenu.Item> */}
                { /* -------- Graphs ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-pie-chart"></i>}
                    title="Graphs"
                >
                    <SidebarMenu.Item title="ReCharts" to='/graphs/re-charts' />
                </SidebarMenu.Item> */}
                { /* -------- Forms ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-check-square-o"></i>}
                    title="Forms"
                >
                    <SidebarMenu.Item title="Forms" to='/forms/forms' />
                    <SidebarMenu.Item title="Forms Layouts" to='/forms/forms-layouts' />
                    <SidebarMenu.Item title="Input Groups" to='/forms/input-groups' />
                    <SidebarMenu.Item title="Wizard" to='/forms/wizard' />
                    <SidebarMenu.Item title="Text Mask" to='/forms/text-mask' />
                    <SidebarMenu.Item title="Typeahead" to='/forms/typeahead' />
                    <SidebarMenu.Item title="Toggles" to='/forms/toggles' />
                    <SidebarMenu.Item title="Editor" to='/forms/editor' />
                    <SidebarMenu.Item title="Date Picker" to='/forms/date-picker' />
                    <SidebarMenu.Item title="Dropzone" to='/forms/dropzone' />
                    <SidebarMenu.Item title="Sliders" to='/forms/sliders' />
                </SidebarMenu.Item> */}
                { /* -------- Tables ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-trello"></i>}
                    title="Tables"
                >
                    <SidebarMenu.Item title="Tables" to='/tables/tables' />
                    <SidebarMenu.Item title="Extended Tables" to='/tables/extended-table' />
                    <SidebarMenu.Item title="AgGrid" to='/tables/ag-grid' />
                </SidebarMenu.Item> */}
                { /* -------- Apps ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-mouse-pointer"></i>}
                    title="Apps"
                >
                    <SidebarMenu.Item title="Projects">
                        <SidebarMenu.Item title="Projects List" to="/apps/projects/list" />
                        <SidebarMenu.Item title="Projects Grid" to="/apps/projects/grid" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Tasks">
                        <SidebarMenu.Item title="Tasks List" to="/apps/tasks/list" />
                        <SidebarMenu.Item title="Tasks Grid" to="/apps/tasks/grid" />
                        <SidebarMenu.Item title="Tasks Kanban" to="/apps/tasks-kanban" />
                        <SidebarMenu.Item title="Tasks Details" to="/apps/task-details" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Files">
                        <SidebarMenu.Item title="Files List" to="/apps/files/list" />
                        <SidebarMenu.Item title="Files Grid" to="/apps/files/grid" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Search Results">
                        <SidebarMenu.Item title="Search Results" to="/apps/search-results" />
                        <SidebarMenu.Item title="Images Results" to="/apps/images-results" />
                        <SidebarMenu.Item title="Videos Results" to="/apps/videos-results" />
                        <SidebarMenu.Item title="Users Results" to="/apps/users-results" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Users">
                        <SidebarMenu.Item title="Users List" to="/apps/users/list" />
                        <SidebarMenu.Item title="Users Grid" to="/apps/users/grid" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Gallery">
                        <SidebarMenu.Item title="Gallery Grid" to="/apps/gallery-grid" />
                        <SidebarMenu.Item title="Gallery Table" to="/apps/gallery-table" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Mailbox">
                        <SidebarMenu.Item title="Inbox" to="/apps/inbox" />
                        <SidebarMenu.Item title="New Email" to="/apps/new-email" />
                        <SidebarMenu.Item title="Email Details" to="/apps/email-details" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Profile">
                        <SidebarMenu.Item title="Profile Details" to="/apps/profile-details" />
                        <SidebarMenu.Item title="Profile Edit" to="/apps/profile-edit" />
                        <SidebarMenu.Item title="Account Edit" to="/apps/account-edit" />
                        <SidebarMenu.Item title="Billing Edit" to="/apps/billing-edit" />
                        <SidebarMenu.Item title="Settings Edit" to="/apps/settings-edit" />
                        <SidebarMenu.Item title="Sessions Edit" to="/apps/sessions-edit" />
                    </SidebarMenu.Item>
                    <SidebarMenu.Item title="Clients" to="/apps/clients" exact />
                    <SidebarMenu.Item title="Chat" to="/apps/chat" exact />
                </SidebarMenu.Item> */}
                { /* -------- Pages ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-copy"></i>}
                    title="Pages"
                >
                    <SidebarMenu.Item title="Register" to="/pages/register" />
                    <SidebarMenu.Item title="Login" to="/pages/login" />
                    <SidebarMenu.Item title="Forgot Password" to="/pages/forgot-password" />
                    <SidebarMenu.Item title="Lock Screen" to="/pages/lock-screen" />
                    <SidebarMenu.Item title="Error 404" to="/pages/error-404" />
                    <SidebarMenu.Item title="Confirmation" to="/pages/confirmation" />
                    <SidebarMenu.Item title="Success" to="/pages/success" />
                    <SidebarMenu.Item title="Danger" to="/pages/danger" />
                    <SidebarMenu.Item title="Coming Soon" to="/pages/coming-soon" />
                    <SidebarMenu.Item title="Timeline" to="/pages/timeline" />
                </SidebarMenu.Item>
                <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-star-o"></i>}
                    title="Icons"
                    to='/icons'
                />
                <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-bookmark-o"></i>}
                    title="Docs"
                    href='https://webkom.gitbook.io/spin/v/airframe/airframe-react/documentation-react'
                /> */}
                { /* -------- Versions ---------*/ }
                {/* <SidebarMenu.Item
                    icon={<i className="fa fa-fw fa-folder-open-o"></i>}
                    title="Versions"
                >
                    <SidebarMenu.Item title="NextJS (React)" href='http://airframe.nextjs.webkom.co/' />
                    <SidebarMenu.Item title="React" href='http://dashboards.webkom.co/react/airframe' />
                    <SidebarMenu.Item title="jQuery" to="http://dashboards.webkom.co/jquery/airframe/" />
                    <SidebarMenu.Item title="Vue" to="http://dashboards.webkom.co/vue/airframe" />
                    <SidebarMenu.Item title="Angular" to="http://dashboards.webkom.co/angular/airframe" />
                    <SidebarMenu.Item title=".NET MVC" to="http://dashboards.webkom.co/net-mvc/airframe" />
                </SidebarMenu.Item> */}
            </SidebarMenu >
        );
    }
}



export default SidebarMiddleNav;
