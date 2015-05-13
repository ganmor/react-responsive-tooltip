'use strict';

var React = require("react");
var objectAssign = require('object-assign');
var TooltipInner = require('./tooltip-inner');
var TooltipTrigger = require('./tooltip-trigger');

/*
*	A tooltip component that has a default style
*/






/* The Main component container */
var ToolTipOuter = React.createClass({

	propTypes: {
		className :  React.PropTypes.string,
		btnClassName : React.PropTypes.string,
		style :  React.PropTypes.object,
		btnStyle :  React.PropTypes.object,
		displayed : React.PropTypes.boolean
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

	componentDidMount : function () {
		this.recomputePosition();
	},

	recomputePosition : function () {
		this.setState({
			position : window.getComputedStyle(this.getDOMNode())
		});
	},

	getInitialState : function () {
		return {
			displayed : this.props.displayed,
			position : null
		};
	},

	setTooltipDisplayed : function () {
		this.setState({
			displayed : true
		});
	},

	setTooltipHidden: function () {
		this.setState({
			displayed : false
		});
	},

	render : function () {
		var style, className;

		style = this.getDefaultStyle();
		style.position = 'relative';

		objectAssign(style, this.props.style);
		className = className += " " + this.props.className;

		return (
			<div style={style} className={className}>

				<TooltipTrigger className={this.props.btnClassName}
						onDisplayRequest={this.setTooltipDisplayed}
						onHideRequest={this.setTooltipHidden}
						tooltipDisplayed={this.state.displayed}
						style={this.props.btnStyle}>
						{this.props.btnLayout}
				</TooltipTrigger>

				{this.state.displayed && this.state.position &&
					(<TooltipInner position={this.state.position} onHideRequest={this.setTooltipHidden}>
						{this.props.children}
					</TooltipInner>
				)}

			</div>
		);
	}
});



/* Exports, amd will come as a feature request */
module.exports = ToolTipOuter;


