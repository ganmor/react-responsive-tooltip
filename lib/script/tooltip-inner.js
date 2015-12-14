'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _domUtils = require('./dom-utils');

var _domUtils2 = _interopRequireDefault(_domUtils);

var _tooltipInner = require('./styles/tooltip-inner');

var _tooltipInner2 = _interopRequireDefault(_tooltipInner);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* The content of the tooltip while fully displayed */
var TooltipInner = _react2.default.createClass({
	displayName: 'TooltipInner',

	propTypes: {
		/* Customize style */
		className: _react2.default.PropTypes.string,
		style: _react2.default.PropTypes.object,
		position: _react2.default.PropTypes.object,

		/* Force the width of the inner tooltip */
		width: _react2.default.PropTypes.string,
		height: _react2.default.PropTypes.string,
		onHideRequest: _react2.default.PropTypes.func.isRequired,
		clicked: _react2.default.PropTypes.bool,
		children: _react2.default.PropTypes.node.isRequired
	},

	getInitialState: function getInitialState() {
		var overlay = document.createElement('div');
		return {
			visible: false,
			overlayDiv: overlay
		};
	},

	//
	//	Life cycle
	//

	componentDidMount: function componentDidMount() {
		document.body.appendChild(this.state.overlayDiv);
		_reactDom2.default.render(this._renderOverlay(), this.state.overlayDiv);
	},
	componentWillReceiveProps: function componentWillReceiveProps() {
		this.setState({
			containingNode: _reactDom2.default.findDOMNode(this),
			position: this.props.position
		});
	},
	componentDidUpdate: function componentDidUpdate() {
		_reactDom2.default.render(this._renderOverlay(), this.state.overlayDiv);
	},
	componentWillUnmount: function componentWillUnmount() {
		if (this.state.overlayDiv && this.state.overlayDiv.parentNode) {
			this.state.overlayDiv.parentNode.removeChild(this.state.overlayDiv);
		}
	},

	//
	//	Utils
	//

	getAvailableRightSpace: function getAvailableRightSpace() {},
	getMaxWidth: function getMaxWidth() {
		return _domUtils2.default.getParentOverflowScroll(this.state.containingNode).innerWidth - this.props.position.left;
	},
	getMaxHeight: function getMaxHeight() {// TODO

	},
	handleMouseMove: function handleMouseMove(e) {
		var domNode = _reactDom2.default.findDOMNode(this);
		var target = document.elementFromPoint(e.pageX, e.pageY);
		if (target === domNode || _domUtils2.default.isDescendant(domNode, target)) {
			this.setTooltipDisplayed();
		} else {
			this.setTooltipHidden();
		}
	},
	handleOverlayClick: function handleOverlayClick(e) {
		e.stopPropagation();
		this.props.onHideRequest();
	},
	_renderOverlay: function _renderOverlay() {
		if (!this.state.containingNode || !this.props.position) {
			return _react2.default.createElement('span', null);
		}

		if (!this.props.clicked) {
			return _react2.default.createElement('span', null);
		}

		var style = {
			position: 'fixed',
			opacity: '0',
			background: 'rgba(0,0,0)',
			cursor: 'pointer',
			width: '100%',
			height: '100%',
			top: '0',
			left: '0'
		};

		return _react2.default.createElement(
			'div',
			{ style: style, onClick: this.handleOverlayClick },
			'this should be transparent overlay that cover the whole window'
		);
	},

	/*getHorizontalDir() {
 	if (this.props.horizontalDir === 'left' || this.props.horizontalDir === 'right') {
 		return this.props.horizontalDir;
 	}
 	return this.props.position.left > this.state.containingNode.offsetHeight;
 },
 	getVerticalDir(dir) {
 	return dir;
 },*/

	render: function render() {
		var style = this.props.style || _tooltipInner2.default.toJS();

		//const windowWidth = window.innerWidth;
		//const windowHeight = windowWidth.innerHeight;

		if (!this.state.containingNode || !this.props.position) {
			return _react2.default.createElement('span', null);
		}

		//const verticalDir = this.getVerticalDir();
		//const horizontalDir = this.getHorizontalDir();

		// React.findDOMNode(this).innerHeight;
		// this.getDOMNode().innerHeight

		style.left = this.props.position.left;
		style.top = this.props.position.top + this.props.position.height + 5; // 5px of margin
		style.maxWidth = this.getMaxWidth();

		return _react2.default.createElement(
			'span',
			{ style: style },
			this.props.children
		);
	}
});

exports.default = TooltipInner;