import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as AuthActions from '../../store/actions/authActions';
import { Signup, Login } from '../partials';

const Auth = ({ ...props }) => {
	return <div className="auth-wrapper">{props.match.path === '/signup' ? <Signup /> : <Login />}</div>;
};

const mapStateToProps = (state) => ({
	...state.auth
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
