import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';

const ChatInput = (props) => {
	const [ content, setContent ] = React.useState('');
	return Styled.it(
		``,
		<div className="input-view">
			<input
				className="form-control"
				type="text"
				placeholder="Write your message"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatInput));
