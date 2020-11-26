import * as React from 'react';
import { connect } from 'react-redux';

const Message = (props) => {
	return (
		<div>
			<h5>hello </h5>
		</div>
	);
};

const mapStateToProps = (state) => ({
	...state.auth,
	...state.chat
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Message);
