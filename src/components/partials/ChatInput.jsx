import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Formik, Form } from 'formik';
import FormikField from '../common/FormikField';
import Styled from 'style-it';

const ChatInput = ({ user, ...props }) => {
	const [ content, setContent ] = React.useState('');

	const sendMessage = () => {
		const msg = {
			threadId: props.match.params.threadId,
			userId: user.id
		};
	};

	return Styled.it(
		`
        .input-view{
            position: fixed;
            left: 300px;
            bottom: 0;
            width: 75%;
        }
        .input-view .form-control{
            border: none;
            border-radius: 0px;
            border-top: 1px solid #eee;
            font-size: 14px;
            padding: 10px;
            height: auto;
            outline: none;
        }
        .input-view input:focus{
            outline: none;
            border: none;
            box-shadow: none;
        }
        `,
		// <form className="input-view" onSubmit={e => {
		//     sendMessage()
		// }}>
		// 	<input
		// 		className="form-control"
		// 		type="text"
		// 		placeholder="Write your message"
		// 		value={content}
		// 		onChange={(e) => setContent(e.target.value)}
		// 	/>
		// </form>
		<div className="input-view">
			<Formik>
				<Form>
					<FormikField name="message" style={{ margin: 0 }} variant="outlined" />
				</Form>
			</Formik>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatInput));
