import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthenticationService from '../../services/AuthenticationService'
import {
    NavItem,
    NavLink
} from './../../components';
import { constant } from 'lodash';

class NavbarUser extends React.Component{
    constructor(props){
        super(props);
        console.log('props >>>',props);
        this.state = {
            isLoading: false
        }
    }

    doLogout(){
        AuthenticationService.deleteToken();
        console.log('logged out >>>', AuthenticationService.getToken());
        this.props.history.push({
            pathname: "/login",
        })
    }

    render(){
        return(
            <NavItem>
                <NavLink tag={ Link } disabled={this.state.isLoading} onClick={() => this.doLogout()}>
                    <i className="fa fa-power-off"></i>
                </NavLink>
            </NavItem>
        );
    }
}



// const NavbarUser = (props) => (
//     <NavItem { ...props }>
//         <NavLink tag={ Link } to="/login">
//             <i className="fa fa-power-off"></i>
//         </NavLink>
//     </NavItem>
// );
// NavbarUser.propTypes = {
//     className: PropTypes.string,
//     style: PropTypes.object
// };

export default NavbarUser;
