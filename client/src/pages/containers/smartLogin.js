'use strict';

import {connect} from 'react-redux';

import {
    loginUserRequested
} from 'pages/actions';

import Login from 'pages/components/user/login';

const mapStateToProps = state => ({
    user: state.user,
    loading: state.loading,
    loggedIn: state.loggedIn
});

const mapDispatchProps = (dispatch) => ({
    onLoginUser: (username) => {
        dispatch(loginUserRequested(username));
    }
});

const LoginContainer = connect(
    mapStateToProps, 
    mapDispatchProps
)(Login);

export default LoginContainer;