import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Styled from 'style-it';
import Messenger from './components/pages/Messenger';
import * as chatActions from './store/actions/chatActions';
import Auth from './components/pages/Auth';
import * as AuthActions from './store/actions/authActions';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';

require('bootstrap');

function App({ setupSocket, token, user, logout, ...props }) {
	React.useEffect(() => {
		setupSocket(token, user.id);
	}, []);
	return Styled.it(
		`
	.app{
		background-color: rgba(112, 112, 112,.1);
	}
	`,
		<div className="app">
			<Router>
				<Switch>
					<Route
						exact
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
						exact
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
						path="/:threadId"
						render={(props) => {
							if (!token) {
								return <Redirect to="/login" />;
							} else {
								return <Messenger />;
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
								return <Messenger />;
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
	setupSocket: (token, userId) => {
		dispatch(chatActions.setupSocket(token, userId));
	},
	logout: () => {
		dispatch(AuthActions.logout());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
