const defaultState = {
	socket: null,
	message: '',
	threads: [],
	multipleThread: '',
	users: [],
	Messages: []
};

const chat = (state = defaultState, action) => {
	switch (action.type) {
		case 'SETUP_SOCKET':
			return {
				...state,
				socket: action.payload
			};
		case 'GOT_USERS':
			return {
				...state,
				users: [ ...action.payload ]
			};
		case 'ADD_THREAD':
			console.log('logging action .payload of the add thread', action.payload);
			return {
				...state,
				threads:
					state.threads.filter((t) => t.id === action.payload.id).length === 0
						? state.threads.concat(action.payload)
						: state.threads
			};
		case 'INITIAL_THREADS':
			return {
				...state,
				threads: action.payload
			};
		case 'ADD_SINGLE_MESSAGE':
			console.log('logging ADD_SINGLE_MESSAGE', action.payload);
			return {
				...state,
				threads: state.threads.map((thread) => {
					if (thread.id === action.payload.threadId) {
						return {
							...thread,
							Messages: thread.Messages.concat(action.payload.message)
						};
					} else {
						return thread;
					}
				})
			};
		case 'ADD_MESSAGES_TO_THREAD':
			console.log('logging ADD_MESSAGES_TO_THREAD', action.payload, action);
			return {
				...state,
				threads: state.threads.map((t) => {
					if (t.id === action.payload.threadId) {
						console.log('logging current thread', t);
						return {
							...t,
							Messages: action.payload.messages.concat(t.messages)
							// Messages: t.Messages.concat(action.payload.messages)
						};
					} else {
						return t;
					}
				})
			};
		default:
			return state;
	}
};

export default chat;
