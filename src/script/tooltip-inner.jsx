/*global window, document */
'use strict';

var React = require("react");

/* The content of the tooltip while fully displayed */
var TooltipInner = React.createClass({

	static : {
			GetParentOverflowScroll : function (target) {

			 if (target === window || target === document) {
					return document.body;
				}

				for (var el = target; el; el = el.parentElement) {
					var overflowY = window.getComputedStyle(el).overflowY;
					if (overflowY === 'auto' || overflowY === 'scroll') {return  el ;}
				}
				return window;
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
			overlayDiv : overlay
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
	},

	componentWillUnmount : function () {
		if (this.state.overlayDiv && this.state.overlayDiv.parentNode) {
			this.state.overlayDiv.parentNode.removeChild(this.state.overlayDiv);
		}
	},

	//
	//	Utils
	//

	getAvailableRightSpace : function () {

	},

	getDefaultWidth : function () {
	//		if (
	},

	getWidth : function () {
		return this.props.width || this.getDefaultWidth();
	},

	handleOverlayClick : function (e) {
		e.stopPropagation();
		this.props.onHideRequest();
	},

	_renderOverlay : function () {
		var style, position;

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

	getPreferedHorizontalDir : function (dir) {
		if (this.props.horizontalDir === 'left' || this.props.horizontalDir === 'right') {
			return this.props.horizontalDir;
		}
		//return this.props.position.left >
	},

	getPreferedVerticalDir : function (dir) {
		return dir;
	},

	render : function () {

		var style = this.getDefaultStyle();
		var windowWidth = window.innerWidth;
		var windowHeight = windowWidth.innerHeight;

		var verticalDir =  this.getPreferedVerticalDir();
		var horizontalDir = this.getPreferedHorizontalDir(this.props.horizontalDir);

		if (verticalDir === 'left') {
		 	style.left = this.props.position.left;
		} else {
			style.right = windowWidth - this.props.position.left;
		}

		if (horizontalDir === 'down') {
			style.top = this.props.position.top;
		} else {
			style.bottom = windowHeight - this.props.position.top;
		}

		return <div style={style}>{this.props.children}</div>;
	}

});

module.exports = TooltipInner;
