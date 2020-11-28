import * as React from 'react';
import { connect } from 'react-redux';
import Style from 'style-it';
import moment from 'moment';

const Message = ({ value, msg, user, profile, ...props }) => {
	// console.log('message', msg);
	return Style.it(
		`
        .message-item{
            display: flex;
            padding: .8rem;
        }
        .msg-right{
            text-align: right;
            margin-left: auto:
        }
        .message-item .msg-item{
            margin-left: auto
        }
       
        .message-item .chat-bubble{
            display: flex;
            max-width: fit-content;
            padding: 13px 15px;
            // padding-top: 4px;
            border-radius: 20px 20px 20px 0px;
            margin: 0px 5px;
            background-color: #6BB36B;
            color: white;
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
            text-align: right;
        }
        .message-item.msg-right .zmdi.zmdi-account-circle{
            margin-left: auto;
            margin-right: 0;
        }
        .message-item.msg-right .chat-bubble{
            background-color: #E1F0E1;
            color: black;
            border-radius: 20px 20px 0px 20px;
        }
      .time-stamp{
          font-size: .8rem;
        //   display: flex;
          color: #6BB36B;
          float: left;
          tex-align: left;
          margin-top: auto;
          margin-bottom: auto;
          padding-left: 1.5%;
      }
      .msg-right .time-stamp{
         color: #11F011;
         float:right;
        text-align: right;
        margin-left: auto;
        padding-right: 1.5%;
        padding-left: 0;
      }
      .msg-right .time-stamp-none{
          display: none;
      }
      .msg-left .time-stamp-left-none{
        display: none
      }
    `,
		<div>
			{/* {console.log('logging message value', value.length)} */}
			{value && value.content ? (
				<div className={`message-item ${value.userId === user.id ? 'msg-right' : 'msg-left'}`}>
					{/* <i className="zmdi zmdi-account-circle" /> */}
					<div className="time-stamp time-stamp-left-none">{moment(value.date).format('HH:mm')}</div>
					<div className="chat-bubble" title={profile && profile.name} data-toggle="tooltip">
						{value.content}
					</div>
					<div className="time-stamp time-stamp-none">{moment(value.date).format('HH:mm')}</div>
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
