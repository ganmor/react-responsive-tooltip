/*global window, document */
'use strict';

var React = require("react");

/* The content of the tooltip while fully displayed */
var TooltipInner = React.createClass({

	statics : {
			GetParentOverflowScroll : function (target) {

			 if (target === window || target === document) {
					return document.body;
				}

				for (var el = target; el; el = el.parentElement) {
					var overflowY = window.getComputedStyle(el).overflowY;
					if (overflowY === 'auto' || overflowY === 'scroll') {return  el ;}
				}
				return window;
			},
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

		/* Customize style */
		className :  React.PropTypes.string,
		style :  React.PropTypes.object,

		/* Force the width of the inner tooltip */
		width : React.PropTypes.string,
		height : React.PropTypes.string
	},

	getInitialState : function () {
		var overlay = document.createElement('div');
		return {
			visible : false,
			overlayDiv : overlay,
			position : null
		};
	},

	getDefaultStyle : function () {
		return {
			position:'absolute',
			background : '#000000',
			opacity: '0.8',
			padding:'5px',
			color:'white'
		};
	},



	//
	//	Life cycle
	//



	componentDidUpdate : function () {
		React.render(this._renderOverlay(), this.state.overlayDiv);
	},

	componentDidMount : function () {
		document.body.appendChild(this.state.overlayDiv);
		React.render(this._renderOverlay(), this.state.overlayDiv);

		this.setState({
			containingNode : this.getDOMNode(),
			position : this.props.position
		});
	},

	componentWillReceiveProps : function ()  {
		this.setState({
			containingNode : this.getDOMNode(),
			position : this.props.position
		});
	},

	componentWillUnmount : function () {
		if (this.state.overlayDiv && this.state.overlayDiv.parentNode) {
			this.state.overlayDiv.parentNode.removeChild(this.state.overlayDiv);
		}
	},



	handleMouseMove: function(e) {
		var target = document.elementFromPoint(e.pageX, e.pageY);
		if (target === this.getDOMNode() || TooltipInner.isDescendant(this.getDOMNode(), target)) {
			this.setTooltipDisplayed();
		} else {
			this.setTooltipHidden();
		}
  },



	//
	//	Utils
	//

	getAvailableRightSpace : function () {

	},

	getMaxWidth : function () {
		if (this.getHorizontalDir() === 'left') {
			return this.state.position.left;
		} else  {
			return TooltipInner.GetParentOverflowScroll(this.state.containingNode).innerWidth - this.state.position.left;
		}
	},

	getMaxHeight : function () { // TODO

	},

	handleOverlayClick : function (e) {
		e.stopPropagation();
		this.props.onHideRequest();
	},

	_renderOverlay : function () {
		var style, position;

		if (!this.state.containingNode || !this.state.position) {
			return (<span></span>);
		}

		if (!this.props.clicked) { return (<span></span>); }

		style = {
			position:'fixed',
			opacity:'0',
			background:'rgba(0,0,0)',
			cursor:'pointer',
			width:'100%',
			height:'100%',
			top:'0',
			left:'0'
		};

		return (<div style={style} onClick={this.handleOverlayClick}>this should be transparent overlay that cover the whole window</div>);
	},

	getHorizontalDir : function (dir) {
		if (this.props.horizontalDir === 'left' || this.props.horizontalDir === 'right') {
			return this.props.horizontalDir;
		}
		return this.props.position.left > this.state.containingNode.offsetHeight;
	},

	getVerticalDir : function (dir) {
		return dir;
	},

	render : function () {

		var style = this.getDefaultStyle();
		var windowWidth = window.innerWidth;
		var windowHeight = windowWidth.innerHeight;

				if (!this.state.containingNode || !this.state.position) {
			return (<span></span>);
		}

		var verticalDir =  this.getVerticalDir();
		var horizontalDir = this.getHorizontalDir();



		if (verticalDir === 'left') {
			style.right = 0;
		} else {
			style.left = 0;
		}

		if (horizontalDir === 'top') {
			style.bottom = TooltipInner.GetParentOverflowScroll(this.state.containingNode) - this.state.position.top;
		} else {
			style.top = this.state.position.height;
		}

		style.maxWidth = this.getMaxWidth();

		return <div style={style}>{this.props.children}</div>;
	}

});

module.exports = TooltipInner;
