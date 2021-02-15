import React from 'react';
import Config from '../../config/Config'
import AuthenticationService from '../../services/AuthenticationService'
import { Container } from './../../components';
import { HeaderMain } from './../components/HeaderMain';
import ReCharts from './../Graphs/ReCharts/ReCharts';
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
            <ReCharts/>
        )
    }
}


export default DashboardGeneral;