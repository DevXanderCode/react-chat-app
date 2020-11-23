import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';

const ThreadView = ({ socket, ...props }) => {
	React.useEffect(
		() => {
			socket.send(
				JSON.stringify({
					type: 'THREAD_lOAD',
					data: props.match.params.threadId
				})
			);
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
