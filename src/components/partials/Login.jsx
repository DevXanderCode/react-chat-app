import * as React from 'react';
import { connect } from 'react-redux';
import Styled from 'style-it';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import FormikField from '../../components/common/FormikField';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import LockIcon from '@material-ui/icons/Lock';

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

const Login = ({ socket, ...props }) => {
	const classes = useStyles();

	const initialValues = {
		email: '',
		password: ''
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required('Please your email is required in order to login'),
		password: Yup.string().required('Password is required').min(8, 'password must be at least 8 characters long')
	});
	return Styled.it(
		`
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
	.form {
		width: 100%
	}

	@media only screen and (max-width: 768px){
		.form-size{
			width: 100%;
			// height: 100%;
			transition: all 0.6s ease-in-out;
		}
		.form-wrapper {
			background-color: #FFFFFF;
			display: flex;
			// align-items: center;
			justify-content: center;
			// flex-direction: column;
			padding: 0 15px;
			// height: 100%;
			text-align: center;
			// margin-top: 3rem;
		}
		.form{ 
			width: 100%;
			height: 100%
		}
	}
	`,
		<div className="form-wrapper form-size">
			<div className="form">
				<h2 style={{ margin: '2rem 0' }}>LOGIN</h2>
				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={(values, { setSubmitting }) => {
						console.log('logging login form values: ', values);
						socket &&
							socket.send(
								JSON.stringify({
									type: 'LOGIN',
									data: {
										email: values.email,
										password: values.password
									}
								})
							);
					}}
				>
					{({ values, handleSubmit }) => (
						<Form onSubmit={handleSubmit}>
							<FormikField name="email" label="Email" variant="outlined" showIcon required />
							<FormikField
								name="password"
								type="password"
								label="Password"
								variant="outlined"
								showIcon
								rounded
								required
							/>
							<Link
								to="/forgot-password"
								style={{
									display: 'block',
									textDecoration: 'none',
									color: '#333',
									fontSize: '14px',
									margin: '15px 0'
								}}
							>
								<LockIcon style={{ color: '#444', width: '20px' }} /> Forgot your password?
							</Link>
							<Button type="submit" className={classes.button}>
								Login
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
