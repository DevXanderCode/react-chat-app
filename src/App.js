import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as chatActions from './store/actions/chatActions';
import Auth from './components/pages/Auth';

function App({ setupSocket, token, ...props }) {
	React.useEffect(() => {
		setupSocket();
	}, []);
	return (
		<div className="App">
			<button
				onClick={(e) => {
					e.preventDefault();
					props.socket && props.socket.send(JSON.stringify({ type: 'Hello', data: 'world' }));
				}}
			>
				Send Message
			</button>
			<Router>
				<Switch>
					<Route path="/login" component={Auth} />
					<Route path="/signup" component={Auth} />

					<Route
						exact
						path="/"
						render={(props) => {
							if (!token) {
								return <Redirect to="/login" />;
							} else {
								return <h1>Home</h1>;
							}
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
