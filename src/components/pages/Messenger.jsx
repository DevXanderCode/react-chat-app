import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

const Messenger = (props) => {
	return (
		<div>
			<h4> hello from the ,essanger component</h4>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Messenger));
