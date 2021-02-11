import React from 'react';
import Config from '../../config/Config'
import AuthenticationService from '../../services/AuthenticationService'
class DashboardGeneral extends React.Component {
    constructor(props){
        super(props);
    }
    componentDidMount(){
        if (AuthenticationService.getUser()){
            console.log('succeed');
        }
        else{
            this.props.history.push({
                pathname: "/login",
            })
        }
    }
    
    render(){
        return (
            <h1>Dashboard</h1>
        )
    }
}


export default DashboardGeneral;