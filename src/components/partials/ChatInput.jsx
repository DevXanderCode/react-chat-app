import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import Styled from 'style-it';

const ChatInput = (props) => {
	const [ content, setContent ] = React.useState('');
	return Styled.it(
		`
        .input-view{
            position: fixed;
            left: 300px;
            bottom: 0;
            width: 100%;
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
		<div className="input-view">
			<input
				className="form-control"
				type="text"
				placeholder="Write your message"
				value={content}
				onChange={(e) => setContent(e.target.value)}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ChatInput));
