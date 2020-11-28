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
			// console.log('logging action .payload of the add thread', action.payload);
			return {
				...state,
				threads:
					state.threads.filter((t) => t.id === action.payload.id).length === 0
						? [ action.payload ].concat(state.threads)
						: state.threads
			};
		case 'INITIAL_THREADS':
			// console.log('logging the action.payload of initial thread', action.payload);
			return {
				...state,
				threads: [
					...action.payload.sort(function(a, b) {
						if (a.Messages.length > 0 && b.Messages.length > 0) {
							// console.log(
							// 	'logging a and b',
							// 	new Date(a.Messages[a.Messages.length - 1].date) -
							// 		new Date(b.Messages[b.Messages.length - 1].date)
							// );
							return (
								new Date(b.Messages[b.Messages.length - 1].date) -
								new Date(a.Messages[a.Messages.length - 1].date)
							);
						} else if (a.Messages.length > 0 && b.Messages.length === 0) {
							return new Date(b.lastUpdated) - new Date(a.Messages[a.Messages - 1]);
						} else if (a.Messages.length === 0 && b.Messages.length > 0) {
							return new Date(b.Messages[b.Messages.length - 1].date) - new Date(a.lastUpdated);
						} else {
							return b.lastUpdated - a.lastUpdated;
						}
					})
				]
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
			// console.log('logging ADD_MESSAGES_TO_THREAD', action.payload, action);
			return {
				...state,
				threads: state.threads.map((t) => {
					if (t.id === action.payload.threadId) {
						// console.log('logging current thread', t);
						return {
							...t,
							Messages: action.payload.messages.content
								? action.payload.messages.concat(t.Messages)
								: t.Messages
							// Messages: action.payload.messages.content && t.Messages.concat(action.payload.messages)
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
