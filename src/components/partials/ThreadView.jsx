import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import Styled from 'style-it';
import Message from './Message';
import bgImage from '../../images/chat-bg-1.png';

const ThreadView = ({ socket, threads, ...props }) => {
	React.useEffect(
		() => {
			let currentThread = threads.filter((t) => t.id === props.match.params.threadId)[0];
			if (currentThread && socket.readyState) {
				let skip = currentThread.messages || 0;
				socket.send(
					JSON.stringify({
						type: 'THREAD_LOAD',
						data: {
							threadId: props.match.params.threadId,
							skip
						}
					})
				);
			}
		},
		[ props.match.params.threadId ]
	);
	//  const bgImage = require("../../images/chat-bg-1.jpg");
	return Styled.it(
		`
    .main-view{
        position: fixed;
        left: 340px;
        background-color: #F5F5F5;
        height: 100vh;
		width: calc(100% - 340px);
		max-height: calc(100% - 150px);
		overflow: hidden;
		overflow-y: auto;
		background-size: cover;
		object-fit: cover;
	}
	.main-view:before{
		opacity: .2
	}

    `,
		<div
			className="main-view"
			id="main-view"
			style={{
				backgroundImage: `url(${bgImage})`
			}}
		>
	
				{/* <h5>hello from the ThreadView component</h5> */}
				{threads.filter((thread) => thread.id === props.match.params.threadId).map((thread, idx) => (
					<div key={idx} className="messenger-container">
						{thread.Messages && thread.Messages.length > 0 ? (
							thread.Messages.map((msg, mId) => (
								<Message
									value={msg}
									key={mId}
									profile={thread.profiles && thread.profiles.filter((p) => p.id === msg.userId)[0]}
								/>
							))
						) : (
							<p> No Messages </p>
						)}
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
