'use strict';

var React = require("react");
var objectAssign = require('object-assign');

/*
*	A tooltip component that has a default style
*/


/* The content of the tooltip while fully displayed */
var TooltipInner = React.createClass({

	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},

	getInitialState : function () {
		var overlay = document.createElement('div');
		return {
			visible : false,
			overlayDiv : overlay
		};
	},


	componentDidUpdate : function () {
		React.render(this._renderOverlay(), this.state.overlayDiv);
	},

	componentDidMount : function () {
		document.body.appendChild(this.state.overlayDiv);
	},

	componentWillUnmount : function () {
		if (this.state.overlayDiv && this.state.overlayDiv.parentNode) {
			this.state.overlayDiv.parentNode.removeElement(this.state.overlayDiv);
		}
	},

	_renderOverlay : function () {
		var style;
		// TODO
		return (<div>{this.props.children}</div>);
	},

	render : function () {
		return false;
	}
});


/* The button that triggers the tootip */
var TooltipTrigger = React.createClass({
	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},

	onClick : function (e) {
		this.props.onTrigger();
	},

	render : function () {
		var content = this.props.children || (<span>?</span>);
		return (
			<span onClick={this.props.onClick}>{content}</span>
		);
	}
});



/* The Main component container */
var ToolTipOuter = React.createClass({

	propTypes: {
		className :  React.PropTypes.string,
		btnClassName : React.PropTypes.string,
		style :  React.PropTypes.object,
		btnStyle :  React.PropTypes.object,
		displayed : React.PropTypes.boolean
	},

	getInitialState : function () {
		return {
			displayed : this.props.displayed
		};
	},

	setTooltipActive : function () {
		this.setState({
			displayed : true
		});
	},

	render : function () {
		var style, className;

		style = {};
		style.position = 'relative';

		objectAssign(style, this.props.style);
		className = className += " " + this.props.className;

		return (
			<div style={style} className={className}>

				<TooltipTrigger className={this.props.btnClassName}
						onTrigger={this.setTooltipActive}
						style={this.props.btnStyle}>
						{this.props.btnLayout}
				</TooltipTrigger>

				<TooltipInner>
					{this.props.children}
				</TooltipInner>

			</div>
		);
	}
});



/* Exports, amd will come as a feature request */
module.exports = ToolTipOuter;


