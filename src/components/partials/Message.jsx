import * as React from 'react';
import { connect } from 'react-redux';
import Style from 'style-it';

const Message = ({ value, msg, user, ...props }) => {
	// console.log('message', msg);
	return Style.it(
		`
        .message-item{
            padding: .8rem;
        }
        .msg-right{
            text-align: right;
        }
        .message-item .chat-bubble{
            max-width: 600px;
            display: inline-block;
            padding: 10px 15px;
            padding-top: 4px;
            border-radius: 5px;
            margin: 0px 5px;
            background-color: #ddd
        }
        .message-item .zmdi.zmdi-account-circle {
            float: left;
            font-size: 32px;
            margin-top: 5px;
            margin-left: 0;
            margin-right: 5px;
            color: #ddd
        }
        .message-item.msg-right .zmdi.zmdi-account-circle{
            float:right;
        }
        .message-item.msg-right .zmdi.zmdi-account-circle{
            margin-left: 5px;
            margin-right: 0;
        }
        .message-item.msg-right .chat-bubble{
            background-color: #1d8ff1;
            color: #fff
        }
      
    `,
		<div>
			{/* {console.log('logging message value', value)} */}
			{value ? (
				<div className={`message-item ${value.userId === user.id ? 'msg-right' : 'msg-left'}`}>
					<i className="zmdi zmdi-account-circle" />
					<div className="chat-bubble">{value.content}</div>
				</div>
			) : (
				<h5>no message</h5>
			)}
		</div>

		// <h2>hello</h2>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
