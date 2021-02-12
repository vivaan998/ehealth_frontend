import React from 'react';
import { Link } from 'react-router-dom';
import validator from 'validator';
import AuthenticationService from '../../../services/AuthenticationService'
import Config from '../../../config/Config'
import {
    Form,
    FormGroup,
    FormText,
    Input,
    InputGroup,
    CustomInput,
    Button,
    Label,
    EmptyLayout,
    ThemeConsumer,
    InputGroupAddon,
} from './../../../components';

import { HeaderAuth } from "../../components/Pages/HeaderAuth";
import { FooterAuth } from "../../components/Pages/FooterAuth";

class Login extends React.Component {
    
    constructor(props){
        super();
        this.state = {
            emailId: '',
            password: '',
            emailId_errorMessage: '',
            password_errorMessage: '',
            authenticationMessage: '',
            hidePassword: true,
            color: "black",
            isLoading: false,
        }
    }

    async Authenticate() {
        this.setState(({
            isLoading: true,
            authenticationMessage: '',
        }))
        if (this.state.emailId == ''){
            this.setState({
                emailId_errorMessage: "Enter email ID",
                isLoading: false
            });
            return
        }
        else{
            if (validator.isEmail(this.state.emailId)){
                this.setState({
                    emailId_errorMessage: ""
                });
            }
            else{
                this.setState({
                    emailId_errorMessage: "Enter a valid email ID",
                    isLoading: false
                })
                return 
            }
            
        }
        if (this.state.password == ''){
            this.setState({
                password_errorMessage: "Enter password",
                isLoading: false
            });
            return
        }
        else{
            this.setState({
                password_errorMessage: ""
            });
            const postData = {
                email: this.state.emailId,
                password: this.state.password
            }
            try{
                const response = await AuthenticationService.Login(postData);
                if (response.status == true) {
                    console.log(response.data);
                    this.setState({
                        color: "success",
                        authenticationMessage: "Login successful",
                        isLoading: false,
                    });

                    AuthenticationService.setToken(response.data.access_token);
                    // Config.access_token = response.data.access_token;
                    // Config.role_id = 100;
                    
                    this.props.history.replace({
                        pathname: "/dashboard",
                        state: {
                            id: 7,
                            color: 'green'
                        }
                    })  
                    
                    
                }
                else{
                    this.setState({
                        color: "danger",
                        isLoading: false,
                        authenticationMessage: response.data.data.error
                    });
                }
            }
            catch (e){
                console.log(e, e.data)      
            }
        }

    }
    onChangeEmail(value){
        this.setState({
            emailId: value
        });
    }

    onChangePassword(value){
        this.setState({
            password: value
        })
    }

    secureEntry(){
        this.setState({
            hidePassword: !this.state.hidePassword,
        });
    }

    render(){
        return (
            <EmptyLayout>
                <EmptyLayout.Section center>
                    { /* START Header */}
                    <HeaderAuth 
                        title="Login"
                    />
                    { /* END Header */}
                    { /* START Form */}
                    <Form className="mb-3">
                        <FormGroup>
                            <Label for="emailAdress">
                                Email Address
                            </Label>
                            <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <i className="fa fa-fw fa-envelope"></i>
                                    </InputGroupAddon>
                                    <Input 
                                        type="email"
                                        name="emailId" 
                                        id="emailId"
                                        placeholder="user@example.com" 
                                        className="bg-white"
                                        value={this.state.emailId}
                                        onChange={e => this.onChangeEmail(e.target.value)}
                                        
                                    />
                            </InputGroup>
                            
                            <FormText color="danger">
                                {this.state.emailId_errorMessage}
                            </FormText>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">
                                Password
                            </Label>
                            <InputGroup>
                                    <InputGroupAddon addonType="prepend">
                                        <i className="fa fa-fw fa-lock"></i>
                                    </InputGroupAddon>
                                    <Input 
                                        type={(this.state.hidePassword) ? ('password') : ('text')}
                                        name="password" 
                                        id="password"
                                        placeholder="Password" 
                                        className="bg-white"
                                        value={this.state.password}
                                        onChange={e => this.onChangePassword(e.target.value)}
                                    />
                                    {(this.state.hidePassword) ?
                                        <InputGroupAddon addonType="append" onClick={() => this.secureEntry()}>
                                            <i className="fa fa-fw fa-eye-slash"></i>
                                        </InputGroupAddon>  
                                        :
                                        <InputGroupAddon addonType="append" onClick={() => this.secureEntry()}>
                                            <i className="fa fa-fw fa-eye"></i>
                                        </InputGroupAddon>  
                                    }

                            </InputGroup>
                            
                            <FormText color="danger">
                                {this.state.password_errorMessage}
                            </FormText>
                        </FormGroup>
                        <ThemeConsumer>
                        {
                            ({ color }) => (
                                <Button 
                                    color={ color } 
                                    block 
                                    tag={ Link } 
                                    onClick={() => this.Authenticate()}
                                    disabled={this.state.isLoading}
                                >
                                {this.state.isLoading ? ('Logging In...') : ('Login')}
                                </Button>
                            )
                        }
                        </ThemeConsumer>

                        <FormText color={this.state.color}>
                            {this.state.authenticationMessage}
                        </FormText>
                        
                    </Form>
                    <FooterAuth />
                </EmptyLayout.Section>
            </EmptyLayout>
        );
    }
}


export default Login;
