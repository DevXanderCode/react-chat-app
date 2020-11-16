import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import FormikField from '../../components/common/FormikField';
import * as Yup from 'yup';
import * as AuthActions from '../../store/actions/authActions';
import Button from '@material-ui/core/Button';

const Login = () => {
	const initialValues = {
		email: '',
		password: ''
	};

	const validationSchema = Yup.object().shape({
		email: Yup.string().email().required('Please your email is required in order to login'),
		password: Yup.string().required('Password is required').min(8, 'password must be at least 8 characters long')
	});
	return (
		<div className="form-wrapper">
			<h2>hello from the login component </h2>
			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting }) => {
					console.log('logging login form values: ', values);
				}}
			>
				{({ values, handleSubmit }) => (
					<Form onSubmit={handleSubmit}>
						<FormikField name="email" label="Email" variant="outlined" showIcon={true} required />
						<FormikField
							name="password"
							type="password"
							label="Password"
							variant="outlined"
							showIcon={true}
							required
						/>
						<Button type="submit"> Login</Button>
					</Form>
				)}
			</Formik>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
