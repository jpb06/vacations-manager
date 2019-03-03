import {
    Router,
    Route,
    Redirect
} from 'react-router-dom';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import CalendarPage from './pages/CalendarPage';
import MyProfilePage from './pages/MyProfilePage';
import ServicesPage from './pages/ServicesPage';
import { history } from './helpers/history';


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        localStorage.getItem('user')
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    )} />
)


export class Routes extends Component {
    render() {
        return (
            <Router history={history}>
                <div>
                    {
                        localStorage.getItem('user')
                            ? <Navbar />
                            : <div></div>
                    }
                    <PrivateRoute exact path="/home" component={HomePage} /> 
                    <PrivateRoute exact path="/calendar" component={() => <CalendarPage/>} />
                    <PrivateRoute exact path="/services" component={() => <ServicesPage />} />
                    <PrivateRoute exact path="/myprofile" component={() => <MyProfilePage />} />
                    <Route exact path="/" component={LoginPage} />
                    <Route exact path="/login" component={LoginPage} />
                </div>
            </Router>
        )
    }
}