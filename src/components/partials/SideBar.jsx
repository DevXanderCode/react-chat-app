import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link, NavLink, Redirect } from 'react-router-dom';
import Styled from 'style-it';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import moment from 'moment';
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
        width: 340px;
        // max-width: 25%;
        height: 100vh;
        position: fixed;
        top: 0;
		border-right: 1px solid #ddd;
		overflow: hidden;
		overflow-y:auto;
    }
    ul.thread-list{
        list-style-type: none;
		overflow: hidden;
		overflow-y: auto;
		padding: 15px 0 0;
		display: flex;
		flex-direction: column; 
		margin-bottom: 0;
    }
    ul.thread-list li a .zmdi {
        float: left;
        font-size: 70px;
        padding: 15px 15px;
        color: #ccc;
    }
    ul.thread-list li a{
        text-decoration: none;
		color: #444;
		display: flex;
		// flex-direction: column;
		border-bottom: 1px solid #D6E4D6;
		background-color: #DFEEDF
	}
	ul.thread-list li a:hover{
		background-color: #6BB36B
	}
	ul.thread-list li a div.detail {
		display: flex;
		flex-direction: column;
		justify-content: center;
		// align-items: center;
		justify-items: center;
		align-content: center;
		width: 100%;
		margin-right: 15px;
	}
	ul.thread-list li a div.detail .more-detail{
		display: flex;
		justify-content: space-between;
		// padding-right: 5px;
	}
    ul.thread-list li a div.detail .more-detail h5 {
        font-size: 16px;
        padding: 0px;
        font-weight: 700;
        padding-bottom: 0;
		margin-bottom: 0;
		color: #black
		// width: 100%;
	}
	.thread-active h5, .thread-active div, .thread-active p{
		color: #D5E5D5 !important;
	}
	ul.thread-list li a div.detail .more-detail div{
		color: #black;
	}
    ul.thread-list li a div.detail p {
        font-size: 14px;
		color: #404040;
		width: 100%;
		margi-bottom: 0;
		color: #black;
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
	.sidebar form {
		position: -webkit-sticky;
		position: sticky;
		top: 0px;
		background-color: white;
		padding: 2px 10px;
		padding-bottom: 10px;
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
							<Link
								to="/"
								onClick={(e) => {
									// e.preventDefault();
									findOrCreateThread(user.id);
									setSearchValue('');
								}}
							>
								<i className="zmdi zmdi-account-circle" />
								<div className="detail">
									<h5>{StringController.truncateString(user.name, 24)}</h5>
									<p>{user.email}</p>
								</div>
							</Link>
						</li>
					))}
				</ul>
			) : (
				<ul className="thread-list">
					<label> Results</label>
				</ul>
			) : threads.length > 0 ? (
				<ul className="thread-list">
					<label style={{ borderBottom: '1px solid #D6E4D6', paddingBottom: '.5rem', marginBottom: '0' }}>
						Messages
					</label>
					{threads.map((thread, threadIndex) => (
						<li key={threadIndex}>
							<NavLink
								to={`/${thread.id}`}
								activeClassName="thread-active"
								activeStyle={{ backgroundColor: '#6BB36B', color: 'black' }}
							>
								<i className="zmdi zmdi-account-circle" />
								<div className="detail">
									<div className="more-detail">
										{/* <h5>{StringController.truncateString(thread.id, 15)}</h5> */}
										<h5>
											{thread.profiles &&
											thread.profiles.length > 0 &&
											thread.profiles.length <= 2 ? (
												StringController.truncateString(
													thread.profiles.filter((profile) => profile.id !== user.id)[0].name,
													20
												)
											) : (
												StringController.truncateString(thread.id, 20)
											)}
										</h5>
										<div>
											{thread.Messages && thread.Messages.length > 0 ? (
												moment(thread.Messages[thread.Messages.length - 1].date).format('HH:mm')
											) : (
												moment(thread.lastUpdated).format('HH:mm')
											)}
										</div>
									</div>
									<p style={{ marginBottom: '0' }}>
										{thread.Messages && thread.Messages.length > 0 ? (
											StringController.truncateString(
												thread.Messages[thread.Messages.length - 1].content,
												33
											)
										) : (
											'Start a Conversation'
										)}
									</p>
								</div>
							</NavLink>
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
