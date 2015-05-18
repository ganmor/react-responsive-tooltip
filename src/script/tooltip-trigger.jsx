'use strict';

var React = require("react");



/* The button that triggers the tooltip */
var TooltipTrigger = React.createClass({

	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object,
		onHideRequest : React.PropTypes.func,
		onDisplayRequest : React.PropTypes.func
	},


	getDefaultStyle : function () {
		return {
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
	},


	onClick : function (e) {
			this.props.onToggle();
	},

	render : function () {
		var style = this.getDefaultStyle();
		var content = this.props.children || (<span>?</span>);
		return (
			<span style={style} onClick={this.onClick}>{content}</span>
		);
	}
});

module.exports = TooltipTrigger;
