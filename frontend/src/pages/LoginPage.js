import React, { Component } from 'react';
import { Container, Row, Col, FormGroup, Input } from 'reactstrap';
import "./../styles/pages/login.scss";
import { connect } from "react-redux";
import {userActions } from "../actions/user.actions"

class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.props.dispatch(userActions.logout());

        this.state = {
            username: '',
            password: '',
        };

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { email, password } = this.state;
        if (email && password) {
            this.props.dispatch(userActions.login(email, password));
        }
    }

    render() {
            return(
                <Container className="login-panel">
                    <Row>
                        <Col xs={{ size: 4, offset: 4 }} >
                            <form>
                                <FormGroup>
                                    <Input name="email"
                                        type="email"
                                        placeholder="Email de connexion"
                                        className="form-control"
                                        onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <Input name="password"
                                        type="password"
                                        placeholder="Password"
                                        className="form-control"
                                        onChange={this.handleChange} />
                                </FormGroup>
                                <FormGroup>
                                    <button
                                        color="primary"
                                        className="btn-login"
                                        onClick={this.handleSubmit} type="button">Se connecter</button>
                                </FormGroup>

                            </form>
                        </Col>
                    </Row>
                </Container>)
    }    
}

function mapStateToProps(state) {
    return {
        authentication: state.authentication
    };
}

LoginPage = connect(
    mapStateToProps,
)(LoginPage);


export default LoginPage;