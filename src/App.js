import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

function App() {
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

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(App);
