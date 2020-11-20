export const loggedIn = (data) => (dispatch) => {
	return (dispatch) => {
		dispatch({
			type: 'LOGGEDIN',
			payload: data
		});
	};
};
