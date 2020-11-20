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
		`.auth-wrapper{	
		background: #f6f5f7;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		font-family: 'Montserrat', sans-serif;
		min-height: 103vh;
		margin: -20px 0 0px;
		transition: all 0.6s ease-in-out
		}

		@keyframes show {
			0%, 49.99% {
				opacity: 0;
				z-index: 1;
			}
			
			50%, 100% {
				opacity: 1;
				z-index: 5;
			}
		}
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
			transition: all 0.6s ease-in-out;
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
			height: 100%;
			overflow: hidden;
			transition: all 0.6s ease-in-out;
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
			transition: all 0.6s ease-in-out;
		}
	    .overlay-panel {
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 0 30px 0 30px;
			text-align: center;
			top: 0;
			height: 100%;
			width: 50%;
			transform: translateX(0);
			transition: all 0.6s ease-in-out;
		}
		.size-overlay {
			width: 50%;
			text-align: center;
			transform: translateX(0);
			transition: all 0.6s ease-in-out;
		}
		.overlay-right {
			right: 0;
			transform: translateX(0);
			transition: all 0.6s ease-in-out;
		}
		.overlay-left {
			transform: translateX(-20%);
			transition: all 0.6s ease-in-out;
		}
		.form-container.right-panel-active .sign-up-container {
			transform: translateX(100%);
			opacity: 1;
			z-index: 5;
			animation: show 0.6s;
		}

		
		.desktop-d-none{
			display: none
		}

		// media query for mobile responsiveness
		@media only screen and (max-width: 768px){
			.size-overlay{
				width: 100%;
				text-align: center;
				transition: all 0.6s ease-in-out;
			}
			.mobile-d-none{
				display: none
			}
			.mobile-overlay-container{
			position: static;
			overflow: hidden;
			transition: all 0.6s ease-in-out;
			z-index: 100;
			}
			.mobile-overlay{
			background: #FF416C;
			background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
			background: linear-gradient(to right, #FF4B2B, #FF416C);
			background-repeat: no-repeat;
			background-size: cover;
			background-position: 0 0;
			color: #FFFFFF;
			position: static;
			height: 100%;
			transform: translateX(0);
			transition: all 0.6s ease-in-out;
			padding: 20px 0;
			}
			.mobile-overlay-panel{
				position: static;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 0 30px 0 30px;
			text-align: center;
			// top: 0;
			height: 100%;
			// width: 50%;
			transform: translateX(0);
			transition: all 0.6s ease-in-out;
			}
			.desktop-d-none{
				display: block
			}
		}
		`,
		<div className="auth-wrapper">
			<div className="auth-container">
				{props.match.path === '/signup' ? (
					<div>
						<div className="desktop-d-none size-overlay mobile-overlay-container">
							<div className="mobile-overlay">
								<div className="mobile-overlay-panel size-overlay">
									<h1>Welcome Back!</h1>
									<p>To keep connected with us please login with your personal info</p>
									<Link to="/login" style={{ textDecoration: 'none' }}>
										<Button className={classes.ghost} id="signUp">
											Login
										</Button>
									</Link>
								</div>
							</div>
						</div>
						<Signup className="form-container" />

						<div className="mobile-d-none size-overlay overlay-container">
							<div className="overlay">
								<div className="overlay-panel size-overlay overlay-right">
									<h1>Welcome Back!</h1>
									<p>To keep connected with us please login with your personal info</p>
									<Link to="/login" style={{ textDecoration: 'none' }}>
										<Button className={classes.ghost} id="signUp">
											Login
										</Button>
									</Link>
								</div>
							</div>
						</div>
					</div>
				) : (
					<div>
						<div className="desktop-d-none size-overlay mobile-overlay-container">
							<div className="mobile-overlay">
								<div className="mobile-overlay-panel size-overlay">
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
						<Login className="form-container" />
						<div className="mobile-d-none size-overlay overlay-container">
							<div className="overlay">
								<div className="overlay-panel size-overlay overlay-right">
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
