import * as React from 'react';
import Styled from 'style-it';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as AuthActions from '../../store/actions/authActions';
import { Signup, Login } from '../partials';

const Auth = ({ ...props }) => {
	return Styled.it(
		`.auth-wrapper{	background: #f6f5f7;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-family: 'Montserrat', sans-serif;
		height: 100vh;
		margin: -30px 0 50px;}`,
		<div className="auth-wrapper">{props.match.path === '/signup' ? <Signup /> : <Login />}</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
