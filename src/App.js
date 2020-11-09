import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

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

export default App;
