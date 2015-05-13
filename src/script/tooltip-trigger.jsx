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
			backgroundColor:'#aaa',
			color:'white',
			borderRadius:'15px',
			width:'10px',
			height:'10px',
			textAlign:'center',
			padding:'5px',
			lineHeight:'10px',
			fontFamily:'arial',
			fontSize:'12px',
			cursor:'pointer'
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
