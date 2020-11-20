import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as chatActions from './store/actions/chatActions';
import Auth from './components/pages/Auth';
import * as AuthActions from './store/actions/authActions';

function App({ setupSocket, token, logout, ...props }) {
	React.useEffect(() => {
		setupSocket();
	}, []);
	return (
		<div className="App">
			<button onClick={(e) => logout()}>Log Out</button>
			<Router>
				<Switch>
					<Route
						path="/login"
						render={(props) => {
							if (token) {
								return <Redirect to="/" />;
							} else {
								return <Auth />;
							}
						}}
					/>
					<Route
						path="/signup"
						render={(props) => {
							if (token) {
								return <Redirect to="/" />;
							} else {
								return <Auth />;
							}
						}}
					/>

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
	},
	logout: () => {
		dispatch(AuthActions.logout());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
