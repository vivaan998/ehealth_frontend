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
import { HeaderMain } from "../../components/HeaderMain";
import { HeaderDemo } from "../../components/HeaderDemo";

import { SimpleBarChart } from "./components/SimpleBarChart";
import { StackedBarChart } from "./components/StackedBarChart";
import { MixBarChart } from "./components/MixBarChart";
import { PositiveAndNegativeBarChart } from "./components/PositiveAndNegativeBarChart";
import { BarChartStackedBySign } from "./components/BarChartStackedBySign";
import { BarChartHasBackground } from "./components/BarChartHasBackground";
import { SimpleLineChart } from "./components/SimpleLineChart";
import { DashedLineChart } from "./components/DashedLineChart";
import { VerticalLineChart } from "./components/VerticalLineChart";
import { CustomizedLabelLineChart } from './components/CustomizedLabelLineChart';
import { SimpleAreaChart } from "./components/SimpleAreaChart";
import { StackedAreaChart } from "./components/StackedAreaChart";
import { PercentAreaChart } from "./components/PercentAreaChart";
import { AreaChartFillByValue } from "./components/AreaChartFillByValue";
import { TwoLevelPieChart } from "./components/TwoLevelPieChart";
import { StraightAnglePieChart } from "./components/StraightAnglePieChart";
import { PieChartWithCustomizedLabel } from "./components/PieChartWithCustomizedLabel";
import { PieChartWithPaddingAngle } from "./components/PieChartWithPaddingAngle";
import { PieChartWithPaddingAngleHalf } from "./components/PieChartWithPaddingAngleHalf";
import { SpecifiedDomainRadarChart } from "./components/SpecifiedDomainRadarChart";
import { SimpleRadialBarChart } from './components/SimpleRadialBarChart';
import { LineBarAreaComposedChart } from "./components/LineBarAreaComposedChart";
import { TinyLineChart } from "./components/TinyLineChart";
import { TinyAreaChart } from "./components/TinyAreaChart";
import { TinyBarChart } from './components/TinyBarChart';
import { TinyPieChart } from './components/TinyPieChart';
import { TinyDonutChart } from './components/TinyDonutChart';
import { VerticalComposedChart } from './components/VerticalComposedChart';

export const ReCharts = () => (
    <Container>
        <HeaderMain 
            title="Dashboard"
            className="mb-4 mt-4"
        />

        { /* START Header 1 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={1} 
                    title="Bar Charts" 
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
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
                                StackedBarChart
                                <span className="small ml-1 text-muted">
                                    #1.02
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/90v76x08/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <SimpleBarChart />
                </CardBody>
            </Card>
            {/* <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                StackedBarChart
                                <span className="small ml-1 text-muted">
                                    #1.02
                                </span>
                            </h6>
                            <p>Bar Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/90v76x08/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <StackedBarChart />
                </CardBody>
            </Card> */}
            { /* START Card Graph */}
        </CardDeck>

        { /* START Header 2 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={2} 
                    title="Line Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
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
                                SimpleLineChart
                                <span className="small ml-1 text-muted">
                                    #2.01
                                </span>
                            </h6>
                            <p>Line Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/xqjtetw0/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <SimpleLineChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                DashedLineChart
                                <span className="small ml-1 text-muted">
                                    #2.02
                                </span>
                            </h6>
                            <p>Line Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/nptzh7ez/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <DashedLineChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        
        { /* START Header 3 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={3} 
                    title="Area Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 3 */}
        { /* START Section 3 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                SimpleAreaChart
                                <span className="small ml-1 text-muted">
                                    #3.01
                                </span>
                            </h6>
                            <p>Area Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/Lrffmzfc/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <SimpleAreaChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                StackedAreaChart
                                <span className="small ml-1 text-muted">
                                    #3.02
                                </span>
                            </h6>
                            <p>Area Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/c1rLyqj1/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <StackedAreaChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        { /* START Section 3 */}

        { /* START Header 4 */}
        <Row>
            <Col lg={ 12 }>
                <HeaderDemo 
                    no={4} 
                    title="Pie Charts" 
                    className="mt-5"
                    subTitle={(
                        <React.Fragment>
                            Quickly build your charts with decoupled, reusable React components.
                        </React.Fragment>
                    )}
                />
            </Col>
        </Row>
        { /* END Header 4 */}
        { /* START Section 4 */}
        <CardDeck>
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                TwoLevelPieChart
                                <span className="small ml-1 text-muted">
                                    #4.01
                                </span>
                            </h6>
                            <p>Pie Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/w6wsrc52/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <TwoLevelPieChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
            { /* START Card Graph */}
            <Card className="mb-3">
                <CardBody>
                    <div className="d-flex">
                        <div>
                            <h6 className="card-title mb-1">
                                StraightAnglePieChart
                                <span className="small ml-1 text-muted">
                                    #4.02
                                </span>
                            </h6>
                            <p>Pie Charts</p>
                        </div>
                        <span className="ml-auto">
                            <Button color="link" href="https://jsfiddle.net/alidingling/pb1jwdt1/" target="_blank">
                                <i className="fa fa-external-link"></i>
                            </Button>
                        </span>
                    </div>
                    <StraightAnglePieChart />
                </CardBody>
            </Card>
            { /* START Card Graph */}
        </CardDeck>
        
    </Container>
);

export default ReCharts;
