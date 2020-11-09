import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as chatActions from './store/actions/chatActions';

function App({ setupSocket, ...props }) {
	React.useEffect(() => {
		setupSocket();
	}, []);
	return (
		<div className="App">
			<Router>
				<Switch>
					<Route
						path="/login"
						render={(props) => {
							return <h1>Login</h1>;
						}}
					/>

					<Route
						exact
						path="/"
						render={(props) => {
							return <h1>Home</h1>;
						}}
					/>
				</Switch>
			</Router>
		</div>
	);
}

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({
	setupSocket: () => {
		dispatch(chatActions.setupSocket());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
