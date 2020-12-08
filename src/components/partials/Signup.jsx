import * as React from 'react';
import { connect } from 'react-redux';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { makeStyles, styled } from '@material-ui/core/styles';
import Styled from 'style-it';
import FormikField from '../common/FormikField';

const useStyles = makeStyles({
	button: {
		borderRadius: '20px',
		border: '1px solid #82e082',
		backgroundColor: '#56a356',
		color: '#FFFFFF',
		fontSize: '12px',
		fontWeight: 'bold',
		padding: '12px 45px',
		letterSpacing: '1px',
		textTransform: 'uppercase',
		transition: 'transform 80ms ease-in',
		outline: 'none',
		marginBottom: '1rem',

		'&:hover': {
			color: 'black',
			backgroundColor: '#82e082'
		},

		'&.focus': {
			outline: 'none'
		},

		'&:active': {
			transform: 'scale(0.95)',
			outline: 'none'
		}
	},
	ghost: {
		backgroundColor: 'transparent',
		borderColor: 'white',
		'&.focus': {
			outline: 'none'
		}
	}
});

const Signup = ({ socket, ...props }) => {
	const classes = useStyles();

	const initialValues = {
		fullname: '',
		email: '',
		username: '',
		password: '',
		confirmPassword: ''
	};

	const validationSchema = Yup.object().shape({
		fullname: Yup.string().required('Please your fullname is required').min(8, 'your fullname is too short'),
		email: Yup.string().email('invalid email').required('please your email is required'),
		username: Yup.string()
			.required('please your username is required')
			.min(3, 'username is too short')
			.max(20, 'username too long'),
		password: Yup.string()
			.required('please password is required')
			.min(8, 'your passwod muct be at least 8 charcters long'),
		confirmPassword: Yup.string()
			.required('Please confirm your password')
			.oneOf([ Yup.ref('password'), null ], "passwords don't match")
	});
	return Styled.it(
		`
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
	.form-wrapper {
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 0 15px;
		height: 100%;
		text-align: center;
		// margin-top: 3rem;
	}
	.form-size {
		width: 50%;
	}
	.sign-up-container {
		left: 0;
		width: 50%;
		opacity: 0;
		z-index: 1;
	}
	.form-container.right-panel-active .sign-up-container {
		transform: translateX(100%);
		opacity: 1;
		z-index: 5;
		animation: show 0.6s;
	}
	.form{
		width: 100%
	}

	@media only screen and (max-width: 768px){
		.form-size{
			width: 100%;
			transition: all 0.6s ease-in-out;
		}
		.form{
			width: 100%;
			height: 100%;
		}
	}	
	`,
		<div className="form-wrapper form-size">
			<div className="form">
				<h2>Signup</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						console.log('Logging Signup vlaues: ', values);
						socket &&
							socket.send(
								JSON.stringify({
									type: 'SIGNUP',
									data: {
										email: values.email,
										name: values.fullname,
										username: values.username,
										password: values.password
									}
								})
							);
					}}
				>
					{({ values, handleSubmit, ...props }) => (
						<Form onSubmit={handleSubmit}>
							<FormikField name="fullname" label="Fullname" variant="outlined" required />
							<FormikField name="email" label="Email" variant="outlined" required />
							<FormikField name="username" label="Username" variant="outlined" required />
							<FormikField name="password" label="Password" type="password" variant="outlined" required />
							<FormikField
								name="confirmPassword"
								label="confirmPassword"
								type="password"
								variant="outlined"
								required
							/>
							<Button type="submit" className={classes.button}>
								Signup
							</Button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
