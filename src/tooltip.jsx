var React = require("react");

var Tooltip = require('tooltip');

/*
*	A tooltip component that has a default style
*
*	Fully customizable, using classes & / or style
*
*	Example of use :
*
*	<Tooltip.Outer>
*		<Tooltip.Inner><Tooltip.Inner>
*		<Tooltip.Trigger></Tooltip.Trigger>
*	</Tooltip.Outer>
*
*/


/* The Main component container */
var ToolTipOuter = React.createClass({
	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},
	render : function () {
		var style, className;

		style = {};
		style.position = 'relative';

		Object.assign(style,this.props.style);
		className = className += " " + this.props.className;

		return (
			<div style={style} className={className}>
				{this.props.children}
			</div>
		);
	}
});


/* The content of the tooltip while fully displayed */
var ToolTipInner = React.createClass({

	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},

	getInitialState : function () {
		var overlay = document.createElement('div');
		return {
			visible : false,
			overlayDiv :
		};
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
		var style
		// TODO
		return (<div style={}>{this.props.children}</div>);
	},

	render : function () {
		React.render(this._renderOverlay(), this.state.overlayDiv);
		return false;
	}
});


/* The button that triggers the tootip */
var ToolTipTrigger = React.createClass({
	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},
	render : function () {
		return (
			<span>?</span>
		);
	}
});


/* Exports, amd will come as a feature request */
module.exports = {
	Outer : ToolTipOuter,
	Inner : ToolTipeInner,
	Trigger : ToolTipTrigger
};


