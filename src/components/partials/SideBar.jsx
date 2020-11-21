import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles({
	searchButton: {
		backgroundColor: 'rgba(4,185,95, .8)',
		borderRadius: '15px',
		fontSize: '12px'
	}
});

const SideBar = ({ socket, users, ...props }) => {
	const classes = styles();
	const [ searchValue, setSearchValue ] = React.useState('');

	const search = () => {
		socket.send(JSON.stringify({ type: 'SEARCH', data: searchValue }));
	};
	return Styled.it(
		`
    .sidebar{
        background-color: white;
        float: left;
        width: 300px;
        max-width: 25%;
        height: 100vh;
        position: fixed;
        top: 0;
        border-right: 1px solid #ddd;
    }
    ul.thread-list{
        list-style-type: none;
        padding: 0;
    }
    ul.thread-list li a .zmdi {
        float: left;
        font-size: 48px;
        padding: 5px 15px;
        color: #ccc;
    }
    ul.thread-list li a{
        text-decoration: none;
        color: #444;
    }
    ul.thread-list li a h5 {
        font-size: 14px;
        padding: 10px;
        font-weight: 700;
        padding-bottom: 0;
        margin-bottom: 0;
    }
    ul.thread-list li a p {
        font-size: 14px;
        color: #999;
    }
    ul.thread-list label{
        padding-left: 20px;
        font-size: 12px;
        color: #aaa;
        padding-top: 10px;
    }
    .search-container{
        display: flex;
        flexWrap: wrap;
    }
    `,
		<div className="sidebar">
			<div className="search-container">
				<input
					className="form-control"
					placeholder="Search..."
					value={searchValue}
					onChange={(e) => setSearchValue(e.target.value)}
				/>
				<Button className={classes.searchButton} onClick={(e) => search()}>
					Search
				</Button>
			</div>
			{users.length > 0 ? (
				users.length > 0 && (
					<ul className="thread-list">
						<label> Results</label>
						{users.map((user, idx) => (
							<li key={idx}>
								<Link to="">
									<i className="zmdi zmdi-account-circle" />
									<h5>{user.name}</h5>
									<p>{user.email}</p>
								</Link>
							</li>
						))}
					</ul>
				)
			) : (
				<ul className="thread-list">
					<label>Messages</label>
					<li>
						<Link to="/thread">
							<i className="zmdi zmdi-account-circle" />
							<h5>Name</h5>
							<p>This is the last message</p>
						</Link>
					</li>
					<li>
						<Link to="/thread">
							<i className="zmdi zmdi-account-circle" />
							<h5>Name</h5>
							<p>This is the last message</p>
						</Link>
					</li>
					<li>
						<Link to="/thread">
							<i className="zmdi zmdi-account-circle" />
							<h5>Name</h5>
							<p>This is the last message</p>
						</Link>
					</li>
				</ul>
			)}
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SideBar));
