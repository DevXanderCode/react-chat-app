import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';

const ChatInput = ({ user, socket, ...props }) => {
	const [ content, setContent ] = React.useState('');

	const sendMessage = () => {
		const msg = {
			threadId: props.match.params.threadId,
			userId: user.id,
			content,
			date: new Date()
		};
		socket.send(
			JSON.stringify({
				type: 'ADD_MESSAGE',
				message: msg,
				threadId: msg.threadId
			})
		);

		setContent('');
	};

	return Styled.it(
		`
        .input-view{
            position: fixed;
            left: 300px;
            bottom: 0;
			width: calc(100% - 300px);
			display: flex;
			box-shadow: 0px -1px 5px rgba(0,0,0,0.2)
        }
        .input-view .input-group .form-control{
            border: none !important;
            border-radius: 0px;
            border-top: 1px solid #eee;
            font-size: 14px;
            padding: 10px;
            height: auto;
			outline: none;
			background: transparent !important;
		}
		.input-group{
			background-color: #fff !important;
		}
        .input-view input:focus{
            outline: none;
            border: none;
            box-shadow: none;
        }
        `,
		<form
			className="input-view"
			onSubmit={(e) => {
				e.preventDefault();
				sendMessage();
			}}
		>
			<div className="input-group">
				<input
					className="form-control"
					type="text"
					placeholder="Write your message"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
				<button className="btn btn-send input-group-append" style={{ margin: 'auto' }}>
					<i className="zmdi zmdi-mail-send" />
				</button>
			</div>
		</form>
		// <div className="input-view">
		// 	<Formik>
		// 		<Form>
		// 			<FormikField name="message" style={{ margin: 0 }} variant="outlined" />
		// 		</Form>
		// 	</Formik>
		// </div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatInput));
