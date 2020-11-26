import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';
import Message from './Message';

const ThreadView = ({ socket, threads, ...props }) => {
	React.useEffect(
		() => {
			let currentThread = threads.filter((t) => t.id === props.match.params.threadId)[0];
			if (currentThread && socket.readyState) {
				let skip = currentThread.messages || 0;
				socket.send(
					JSON.stringify({
						type: 'THREAD_LOAD',
						data: { threadId: props.match.params.threadId, skip }
					})
				);
			}
		},
		[ props.match.params.threadId ]
	);

	return Styled.it(
		`
    .main-view{
        position: fixed;
        left: 300px;
        background-color: #fafafa;
        height: 100vh;
		width: calc(100% - 300px);
		max-height: calc(100% - 75px);
		overflow: hidden;
		overflow-y: auto;
    }
    `,
		<div className="main-view" id="main-view">
			{/* <h5>hello from the ThreadView component</h5> */}
			{threads.filter((thread) => thread.id === props.match.params.threadId).map((thread, idx) => (
				<div key={idx} className="messenger-container">
					{thread.Messages.map((msg, mId) => <Message msg={msg} key={mId} />)}
				</div>
			))}
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThreadView));
