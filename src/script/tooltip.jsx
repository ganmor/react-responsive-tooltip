/*global window, document */
'use strict';

var React = require("react");
var TooltipInner = require('./tooltip-inner');
var TooltipTrigger = require('./tooltip-trigger');



/*
*	A tooltip component that has a default style
*/


/** The Main component container **/
var ToolTipOuter = React.createClass({

	statics : {
		isDescendant : function(parent, child) {
				 var node = child.parentNode;
				 while (node !== null) {
						 if (node === parent) {
								 return true;
						 }
						 node = node.parentNode;
				 }
				 return false;
		}
	},

	propTypes: {

		/* Style and className of the container */
		className :  React.PropTypes.string,
		style :  React.PropTypes.object,

		/* Style and class of the tooltip trigger */
		btnClassName : React.PropTypes.string,
		btnStyle :  React.PropTypes.object,

		/* Style and class of the tooltip content */
		innerStyle : React.PropTypes.object,
		displayed : React.PropTypes.boolean
	},

	//
	//	Life Cycle
	//


	getInitialState : function () {
		return {
			displayed : this.props.displayed,
			clicked : false,
			position : null
		};
	},

	componentDidMount : function () {
		document.addEventListener('mousemove', this.handleMouseMove);
		this.setState({
			position : this.getDOMNode().getBoundingClientRect()
		});
	},


	componentWillReceiveProps : function () {
		this.setState({
			position : this.getDOMNode().getBoundingClientRect()
		});
	},

  componentWillUnmount: function () {
    document.removeEventListener('mousemove', this.handleMouseMove);
  },

	handleMouseMove: function(e) {
		var target = document.elementFromPoint(e.pageX, e.pageY);
		if (target === this.getDOMNode() || ToolTipOuter.isDescendant(this.getDOMNode(), target)) {
			this.setTooltipDisplayed();
		} else {
			this.setTooltipHidden();
		}
  },



	//
	//	State Control
	//

	toggle : function () {
		if (this.state.clicked) {
			this.setTooltipUnclicked();
		} else {
			this.setTooltipClicked();
		}
	},

	setTooltipUnclicked : function () {
		this.setState({
			clicked : false
		});
	},

	setTooltipClicked : function () {
		this.setState({
			clicked : true
		});
	},

	setTooltipDisplayed : function () {
		this.setState({
			displayed : true,
			position : this.getDOMNode().getBoundingClientRect()
		});
	},

	setTooltipHidden: function () {
		this.setState({
			displayed : false
		});
	},

	//
	//	Rendering logic
	//

	render : function () {
		var style, className;

		style = this.props.style || {};
		style.position = 'relative';

		className = className += " " + this.props.className;

		return (
			<div style={style} className={className}>

				<TooltipTrigger className={this.props.btnClassName}
						onToggle={this.toggle}
						tooltipDisplayed={this.state.displayed}
						clicked={this.state.clicked}
						style={this.props.btnStyle}>
						{this.props.btnLayout}
				</TooltipTrigger>

				{(this.state.displayed || this.state.clicked) &&
					(<TooltipInner
							position={this.state.position}
							onHideRequest={this.setTooltipUnclicked}
							clicked={this.state.clicked}
							style={this.props.innerStyle}>
						{this.props.children}
					</TooltipInner>
				)}

			</div>
		);
	}
});



/* Exports, amd will come as a feature request */
module.exports = ToolTipOuter;


