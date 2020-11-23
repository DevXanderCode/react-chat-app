import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';

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
        width: 100%;
    }
    `,
		<div className="main-view">
			<h5>hello from the ThreadView component</h5>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ThreadView));
