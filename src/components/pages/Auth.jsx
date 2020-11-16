import * as React from 'react';
import Styled from 'style-it';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as AuthActions from '../../store/actions/authActions';
import { Signup, Login } from '../partials';

const useStyles = makeStyles({
	button: {
		borderRadius: '20px',
		border: '1px solid #FF4B2B',
		backgroundColor: '#FF4B2B',
		color: '#FFFFFF',
		fontSize: '12px',
		fontWeight: 'bold',
		padding: '12px 45px',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		transition: 'transform 80ms ease-in',

		'&:hover': {
			color: 'black',
			backgroundColor: 'rgba(255,75,43, .4)'
		},

		'&.focus': {
			outline: 'none'
		},

		'&:active': {
			transform: 'scale(0.95)'
		}
	},
	ghost: {
		backgroundColor: 'transparent',
		borderColor: 'white',
		borderRadius: '20px',
		border: '1px solid #FF4B2B',
		fontSize: '12px',
		fontWeight: 'bold',
		padding: '12px 45px',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		transition: 'transform 80ms ease-in',
		color: 'white',

		'&:focus': {
			outline: 'none'
		}
	}
});

const Auth = ({ ...props }) => {
	const classes = useStyles();
	return Styled.it(
		`.auth-wrapper{	background: #f6f5f7;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-family: 'Montserrat', sans-serif;
		height: 100vh;
		margin: -30px 0 50px;}
		h1 {
			font-weight: bold;
			margin: 0;
		}
		
		h2 {
			text-align: center;
		}
		
		p {
			font-size: 14px;
			font-weight: 100;
			line-height: 20px;
			letter-spacing: 0.5px;
			margin: 20px 0 30px;
		}
		.auth-container{
			background-color: #fff;
			border-radius: 10px;
			  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
					0 10px 10px rgba(0,0,0,0.22);
			position: relative;
			overflow: hidden;
			width: 768px;
			max-width: 100%;
			min-height: 480px;
		}
			.form-container {
				position: absolute;
				top: 0;
				height: 100%;
				transition: all 0.6s ease-in-out;
			}
			.overlay-container {
				position: absolute;
				top: 0;
				left: 50%;
				width: 50%;
				height: 100%;
				overflow: hidden;
				transition: transform 0.6s ease-in-out;
				z-index: 100;
			}
			.overlay {
			background: #FF416C;
			background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
			background: linear-gradient(to right, #FF4B2B, #FF416C);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 0 0;
			color: #FFFFFF;
			position: relative;
			left: -100%;
			height: 100%;
			width: 200%;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}
		.overlay-panel {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 0 40px;
			text-align: center;
			top: 0;
			height: 100%;
			width: 50%;
			transform: translateX(0);
			transition: transform 0.6s ease-in-out;
		}
		.overlay-right {
			right: 0;
			transform: translateX(0);
		}
		`,
		<div className="auth-wrapper">
			<div className="auth-container">
				{props.match.path === '/signup' ? (
					<div>
						<Signup className="form-container" />
					</div>
				) : (
					<div>
						<Login className="form-container" />
						<div className="overlay-container" style={{ width: '50%' }}>
							<div className="overlay">
								<div className="overlay-panel overlay-right">
									<h1>Hello, Friend!</h1>
									<p>Enter your personal details and start journey with us</p>
									<Link to="/signup" style={{ textDecoration: 'none' }}>
										<Button className={classes.ghost} id="signUp">
											Sign Up
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Auth));
