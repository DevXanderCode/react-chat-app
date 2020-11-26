import * as React from 'react';
import { connect } from 'react-redux';
import Style from 'style-it';

const Message = ({ msg, user, ...props }) => {
	console.log('message', msg);
	return (
		<div className={`message-item ${msg.userId === user.id ? 'msg-right' : 'msg-left'}`}>
			<i className="zmdi zmdi-account-circle" />
			<div className="chat-bubble">{msg.content}</div>
		</div>
		// <h2>hello</h2>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
