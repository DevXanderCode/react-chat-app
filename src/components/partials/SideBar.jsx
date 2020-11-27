import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import StringController from '../../controllers/StringContoller';

const styles = makeStyles({
	searchButton: {
		borderRadius: '100px',
		'&:focus': {
			outline: 'none'
		}
	}
});

const SideBar = ({ socket, users, user, threads, ...props }) => {
	const classes = styles();
	const [ searchValue, setSearchValue ] = React.useState('');

	const search = () => {
		socket.send(JSON.stringify({ type: 'SEARCH', data: searchValue }));
	};

	const findOrCreateThread = (id) => {
		socket.send(
			JSON.stringify({
				type: 'FIND_THREAD',
				data: [ user.id, id ]
			})
		);
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
		overflow: hidden;
		overflow-y:auto;
    }
    ul.thread-list{
        list-style-type: none;
		padding: 0;
		overflow: hidden;
		overflow-y: auto;
		padding: 15px 0;
		display: flex;
		flex-direction: column; 
    }
    ul.thread-list li a .zmdi {
        float: left;
        font-size: 70px;
        padding: 5px 15px;
        color: #ccc;
    }
    ul.thread-list li a{
        text-decoration: none;
		color: #444;
		display: flex;
		// flex-direction: column;
	}
	ul.thread-list li a div.detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		justify-items: center;
		align-content: center;
	}
    ul.thread-list li a div.detail h5 {
        font-size: 14px;
        padding: 0px;
        font-weight: 700;
        padding-bottom: 0;
		margin-bottom: 0;
		width: 100%;
    }
    ul.thread-list li a div.detail p {
        font-size: 14px;
		color: #999;
		width: 100%;
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
		border: 1px solid #eee;
		border-radius: 50px;
		margin: 1rem 1rem 0;
		padding: .15rem 0 .15rem;
	}
	input.form-control{
		margin: auto 0;
		height: 1rem;
	}
	input.form-control:focus{
		box-shadow: none
	}
    `,
		<div className="sidebar">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					search();
				}}
			>
				<div className="search-container">
					<input
						className="form-control"
						style={{ border: 'none' }}
						placeholder="Search..."
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
					/>
					<Button className={classes.searchButton} type="submit" onClick={(e) => search()}>
						<SearchIcon />
					</Button>
				</div>
			</form>
			{searchValue ? users.length > 0 ? (
				<ul className="thread-list">
					<label> Results</label>
					{users.filter((u) => u.id !== user.id).map((user, idx) => (
						<li key={idx}>
							<a
								onClick={(e) => {
									e.preventDefault();
									findOrCreateThread(user.id);
								}}
							>
								<i className="zmdi zmdi-account-circle" />
								<div className="detail">
									<h5>{StringController.truncateString(user.name, 24)}</h5>
									<p>{user.email}</p>
								</div>
							</a>
						</li>
					))}
				</ul>
			) : (
				<ul className="thread-list">
					<label> Results</label>
				</ul>
			) : threads.length > 0 ? (
				<ul className="thread-list">
					<label>Messages</label>
					{threads.map((thread, threadIndex) => (
						<li key={threadIndex}>
							<Link to={`/${thread.id}`}>
								<i className="zmdi zmdi-account-circle" />
								<div className="detail">
									<h5>{thread.id}</h5>
									<p>This is the last message</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<ul className="thread-list">
					<label>Messages</label>
					<li>
						<Link to="/thread">
							{/* <i className="zmdi zmdi-account-circle" /> */}
							<h4>No New Message</h4>
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
