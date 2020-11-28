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
        width: calc(100% - 340px);
        margin-left: 340px;
        display: flex;
        padding: 20px 10px;
        box-shadow: 1px 1px 5px 15px rgba(112,112,112,.3);
        margin-bottom: .08rem; 
    }   

    `,
		<div className="header-container">
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
