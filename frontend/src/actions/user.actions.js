import { history } from '../helpers/history';
import  { authenticationServices } from '../services/authentication';
import { ActionTypes } from '../actions/actionTypes';

export const userActions = {
    login,
    logout
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));
        authenticationServices.login(email, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error));
                }
            );
    };

    function request(user) { return { type: ActionTypes.LOGIN_REQUEST, user } }
    function success(user) { return { type: ActionTypes.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: ActionTypes.LOGIN_FAILURE, error } }
}

function logout() {
    authenticationServices.logout().then(t => 
    {
        console.log(t);
            history.push('/login');       
    });
     return { type: ActionTypes.LOGOUT };
}