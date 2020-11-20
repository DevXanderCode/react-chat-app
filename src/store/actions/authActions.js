export const loggedIn = (data) => {
	return (dispatch) => {
		dispatch({
			type: 'LOGGEDIN',
			payload: data
		});
	};
};
