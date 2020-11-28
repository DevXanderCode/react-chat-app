import * as AuthActions from './authActions';

export const setupSocket = (token, userId) => {
	return (dispatch) => {
		const socket = new WebSocket('ws://localhost:8080');

		socket.onopen = () => {
			if (token) {
				// add already logging in user
				socket.send(
					JSON.stringify({
						type: 'CONNECT_WITH_TOKEN',
						data: { token, userId }
					})
				);

				dispatch({
					type: 'SETUP_SOCKET',
					payload: socket
				});
			} else {
				dispatch({
					type: 'SETUP_SOCKET',
					payload: socket
				});
			}
		};

		socket.onmessage = (message) => {
			let data = JSON.parse(message.data);
			switch (data.type) {
				case 'LOGGEDIN':
					dispatch(AuthActions.loggedIn(data));
					break;
				case 'GOT_USERS':
					dispatch({
						type: 'GOT_USERS',
						payload: data.data.users
					});
					break;
				case 'ADD_THREAD':
					dispatch({
						type: 'ADD_THREAD',
						payload: { thread: data.thread, threadExist: data.threadExist }
					});
					break;
				case 'GOT_THREAD':
					dispatch({
						type: 'GOT_THREAD',
						payload: { threadId: data.thread.id, thread: data.thread, threadExist: data.threadExist }
					});
					break;
				case 'INITIAL_THREADS':
					dispatch({
						type: 'INITIAL_THREADS',
						payload: data.data
					});
					break;
				case 'GOT_MESSAGES':
					console.log('logging data of GotMessages:', data);
					dispatch({
						type: 'ADD_MESSAGES_TO_THREAD',
						payload: {
							threadId: data.threadId,
							messages: data.messages
						}
					});
					break;
				case 'ADD_MESSAGE_TO_THREAD':
					dispatch({
						type: 'ADD_SINGLE_MESSAGE',
						payload: {
							threadId: data.threadId,
							message: data.message
						}
					});
					// using jquery to scroll
					// $(.main-view).scrollTop = $(".main-view").scrollHeight
					// using core js
					document.getElementById('main-view').scrollTop = document.getElementById('main-view').scrollHeight;
					break;
				default:
				// do Nothing
			}
		};
	};
};
