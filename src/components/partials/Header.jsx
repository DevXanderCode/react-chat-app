import * as React from 'react';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { IconButton } from '@material-ui/core';
import { connect } from 'react-redux';
import Style from 'style-it';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import * as AuthActions from '../../store/actions/authActions';

const useStyles = makeStyles((theme) => ({
	logoutBtn: {
		position: 'relative',
		left: 'calc(100% - 50px)'
	}
}));

const Header = ({ logout, ...props }) => {
	const classes = useStyles();

	return Style.it(
		`
    .header-container{
        width: calc(100% - 300px);
        margin-left: 300px;
        display: flex; 
    }

    `,
		<div className="header-container">
			<Tooltip title="LogOut" arrow>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
