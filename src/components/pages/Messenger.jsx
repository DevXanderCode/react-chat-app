import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { SideBar, ThreadView } from '../partials';

const Messenger = (props) => {
	return (
		<div className="messenger-container">
			<SideBar />
			<ThreadView />
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});
const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Messenger));
