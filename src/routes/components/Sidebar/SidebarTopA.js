import React from 'react';
import { Link } from 'react-router-dom';

import { 
    Sidebar,
    UncontrolledButtonDropdown,
    Avatar,
    AvatarAddOn,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from './../../../components';
import { randomAvatar } from './../../../utilities';

const avatarImg = randomAvatar();

class SidebarTopA extends React.Component{
    constructor(props){
        super(props);
        console.log('props in sideA >>>', props);
    }
    render(){
        return(
            <React.Fragment>
                { /* START: Sidebar Default */ }
                <Sidebar.HideSlim>
                    <Sidebar.Section className="pt-0">
                        <Link to="/" className="d-block">
                            <Sidebar.HideSlim>
                                <Avatar.Image
                                    size="lg"
                                />
                            </Sidebar.HideSlim>
                        </Link>
                        
                        <UncontrolledButtonDropdown>
                            <DropdownToggle color="link" className="pl-0 pb-0 btn-profile sidebar__link">
                                {this.props.data.profileData.name}
                                {/* <i className="fa fa-angle-down ml-2"></i> */}
                            </DropdownToggle>
                        </UncontrolledButtonDropdown>
                        <div className="small sidebar__link--muted">
                            { this.props.data.profileData.designation}
                        </div>
                    </Sidebar.Section>
                </Sidebar.HideSlim>
                { /* END: Sidebar Default */ }

                { /* START: Sidebar Slim */ }
                <Sidebar.ShowSlim>
                    <Sidebar.Section>
                        <Avatar.Image
                            size="sm"
                        />
                    </Sidebar.Section>
                </Sidebar.ShowSlim>
                { /* END: Sidebar Slim */ }
            </React.Fragment>
        )
    }
}

export default SidebarTopA;
