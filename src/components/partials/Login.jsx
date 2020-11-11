import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as AuthActions from '../../store/actions/authActions';

const Login = () => {
	return (
		<div className="form-wrapper">
			<h2>hello from the login component </h2>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
