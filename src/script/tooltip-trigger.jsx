'use strict';

import React from 'react';

const DEFAULT_STYLE = {
	backgroundColor: '#aaa',
	color: 'white',
	borderRadius: '10px',
	width: '20px',
	height: '20px',
	padding: '6px 7px 6px 5px',
	lineHeight: '10px',
	fontFamily: 'arial',
	fontSize: '13px',
	cursor: 'pointer',
	boxSizing: 'border-box',
	display: 'inline-block',
	textAlign: 'center'
};

/* The button that triggers the tooltip */
const TooltipTrigger = React.createClass({

	propTypes: {
		className: React.PropTypes.string,
		style: React.PropTypes.object,
		onHideRequest: React.PropTypes.func,
		onDisplayRequest: React.PropTypes.func
	},

	onClick(e) {
		this.props.onToggle();
	},

	render() {
		const style = this.props.style || DEFAULT_STYLE;
		const content = this.props.children || (<span>?</span>);

		return (
			<span style={style} onClick={this.onClick}>{content}</span>
		);
	}
});

export default TooltipTrigger;
