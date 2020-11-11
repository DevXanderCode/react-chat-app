import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Signup = (props) => {
	return (
		<div className="form-wrapper">
			<h2>Signup</h2>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
