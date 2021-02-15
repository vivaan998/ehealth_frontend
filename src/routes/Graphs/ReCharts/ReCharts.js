import React from 'react';

import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardDeck,
    Button
} from './../../../components'
import { HeaderMain } from "../../components/HeaderMain"
import SimpleBarChart from "./components/SimpleBarChart";
import SpecifiedDomainRadarChart from "./components/SpecifiedDomainRadarChart";
import ProviderImmunizationsChartTable from './../../Tables/ExtendedTable/components/ProviderImmunizationsChartTable';

import ChartsService from '../../../services/ChartsService';
class ReCharts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barMonthImmunization: [],
            isLoadingBarMonthImmunization: false,
            radarProviderImmunization: [],
            tableProviderImmunization: [],
            isLoadingTableProviderImmunization: false,
            isLoadingRadarProviderImmunization: false
        }
    }
    
    getBarMonthImmunization = async () => {
        this.setState({
            isLoadingBarMonthImmunization: true
        })
        try{
            const response = await ChartsService.getMonthlyImmunization();
            if (response.status == true) {
                this.setState({
                    barMonthImmunization: response.data.result,
                    isLoadingBarMonthImmunization: false
                });
            }
            else{
                this.setState({
                    isLoadingBarMonthImmunization: false
                });
            }
        }
        catch(e){
        }
    }

    getRadarProviderImmunization = async () => {
        this.setState({
            isLoadingRadarProviderImmunization: true,
            isLoadingTableProviderImmunization: true
        })
        try{
            const response = await ChartsService.getProviderImmunization();
            if (response.status == true) {
                this.setState({
                    radarProviderImmunization: response.data.result,
                    tableProviderImmunization: response.data.result,
                    isLoadingRadarProviderImmunization: false,
                    isLoadingTableProviderImmunization: false
                });
            }
            else{
                this.setState({
                    isLoadingTableProviderImmunization: false,
                    isLoadingRadarProviderImmunization: false
                });
            }
        }
        catch(e){
            console.log('error >>>', e);
        }
    }

    componentDidMount(){
        this.getBarMonthImmunization();
        this.getRadarProviderImmunization();
    }

    render() {
        return (
            <Container>
                <HeaderMain
                    title="Dashboard"
                    className="mb-4 mt-4"
                />

                { /* START Header 1 */}
                <Row>
                    
                </Row>
                { /* END Header 1 */}
                { /* START Section 1 */}
                <CardDeck>
                    { /* START Card Graph */}
                    <Card className="mb-3">
                        <CardBody>
                            <div className="d-flex">
                                <div>
                                    <h6 className="card-title mb-1">
                                    Month Vs Total Immunizations
                                    </h6>
                                    <p>The below bar graph shows the analytics of total immunizations done in a per month fashion.</p>
                                </div>
                            </div>
                            <br/>
                            {this.state.isLoadingBarMonthImmunization ? 'Loading data...' : <SimpleBarChart data={this.state.barMonthImmunization}/>}
                            
                        </CardBody>
                    </Card>
                    
                    { /* START Card Graph */}
                </CardDeck>

                { /* START Header 2 */}
                <Row>
                    
                </Row>
                { /* END Header 2 */}
                { /* START Section 2 */}
                <CardDeck>
                    { /* START Card Graph */}
                    <Card className="mb-3">
                        <CardBody>
                            <div className="d-flex">
                                <div>
                                    <h6 className="card-title mb-1">
                                        Provider Vs Immunizations
                                    </h6>
                                    <p>Radar chart demonstrates the data of total immunization done by a specific provider</p>
                                </div>
                            </div>
                            {this.state.isLoadingRadarProviderImmunization ? 'Loading data...' : <SpecifiedDomainRadarChart data={this.state.radarProviderImmunization}/>}
                        </CardBody>
                    </Card>
                    
                    { /* START Card Graph */}
                    { /* START Card Graph */}
                     <Card className="mb-3">
                        <CardBody>
                            <div className="d-flex">
                                <div>
                                    <h6 className="card-title mb-1">
                                        Provider Vs Immunizations
                                    </h6>
                                    <p>Tabular visualization of provider and their number of immunizations done</p>
                                </div>
                            </div>
                            {this.state.isLoadingTableProviderImmunization ? 'Loading data...' : <ProviderImmunizationsChartTable data={this.state.tableProviderImmunization}/>}
                        </CardBody>
                    </Card>
                    { /* START Card Graph */}
                </CardDeck>

            </Container>
        )
    }
}


export default ReCharts;
