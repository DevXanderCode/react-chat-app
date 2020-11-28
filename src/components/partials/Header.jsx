import * as React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import Style from 'style-it';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import * as AuthActions from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
	logoutBtn: {
		position: 'relative',
		left: 'calc(100% - 250px)'
	}
}));

const Header = ({ threads, users, user, logout, ...props }) => {
	const classes = useStyles();
	let threadId = props.match.params.threadId;

	return Style.it(
		`
    .header-container{
        width: calc(100% - 340px);
        margin-left: 340px;
        display: flex;
        padding: 0 10px;
        box-shadow: 1px 1px 5px 15px rgba(112,112,112,.3);
        margin-bottom: .08rem; 
    }
    .profile-container{
        display: flex;
        jus
    } 
    .profile-container .profile-details{
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
    .profile-container .profile-details h5{
        margin-bottom: 0
    }
    .profile-container .profile-details p{
        margin-bottom: 0
    }
    .profile-container .zmdi.zmdi-account-circle{
        font-size: 75px;
        color: #ddd;
        padding: 15px;
    }

    `,
		<div className="header-container">
			<div className="profile-container">
				<i className="zmdi zmdi-account-circle" />
				{threads &&
					threadId &&
					threads
						.filter((thread) => thread.id === threadId && thread.profiles)[0]
						.profiles.filter((profile) => profile.id !== user.id)
						.map(({ username, email }, idx) => (
							<div className="profile-details" key={idx}>
								<h5>{username}</h5>
								<p>{email}</p>
							</div>
						))}
			</div>
			<Tooltip title="LogOut" arrow interactive>
				<IconButton
					className={classes.logoutBtn}
					onClick={(e) => {
						e.preventDefault();
						logout();
					}}
				>
					<ExitToAppIcon />
				</IconButton>
			</Tooltip>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({
	logout: () => {
		dispatch(AuthActions.logout());
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
