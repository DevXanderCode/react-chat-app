import * as React from 'react';
import { connect } from 'react-redux';

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
