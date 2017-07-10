'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tooltipInner = require('./tooltip-inner');

var _tooltipInner2 = _interopRequireDefault(_tooltipInner);

var _tooltipTrigger = require('./tooltip-trigger');

var _tooltipTrigger2 = _interopRequireDefault(_tooltipTrigger);

var _domUtils = require('./dom-utils');

var _domUtils2 = _interopRequireDefault(_domUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
 * A tooltip component that has a default style
 */

/** The Main component container **/
var ToolTipOuter = _react2.default.createClass({
	displayName: 'ToolTipOuter',


	propTypes: {
		/* Style and className of the container */
		className: _react2.default.PropTypes.string,
		style: _react2.default.PropTypes.object,

		/* Style and class of the tooltip trigger */
		triggerStyle: _react2.default.PropTypes.object,
		triggerLayout: _react2.default.PropTypes.node,

		/* Style and class of the tooltip content */
		innerStyle: _react2.default.PropTypes.object,
		displayed: _react2.default.PropTypes.bool,
		children: _react2.default.PropTypes.node.isRequired
	},

	//
	//	Life Cycle
	//

	getInitialState: function getInitialState() {
		return {
			displayed: this.props.displayed,
			clicked: false,
			position: null,
			scrollTop: 0
		};
	},
	componentDidMount: function componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('scroll', this.handleScroll);

		this.tooltipInnerDiv = document.createElement("div");
		document.body.appendChild(this.tooltipInnerDiv);
		this._renderTooltipInner();
	},
	componentWillReceiveProps: function componentWillReceiveProps() {
		this.updatePosition();
	},
	componentDidUpdate: function componentDidUpdate() {
		this._renderTooltipInner();
	},
	componentWillUnmount: function componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('scroll', this.handleScroll);

		_reactDom2.default.unmountComponentAtNode(this.tooltipInnerDiv);
		document.body.removeChild(this.tooltipInnerDiv);
	},


	//
	//	State Control
	//

	setTooltipUnclicked: function setTooltipUnclicked() {
		this.setState({
			clicked: false
		});
	},
	setTooltipClicked: function setTooltipClicked() {
		this.setState({
			clicked: true
		});
	},
	setTooltipDisplayed: function setTooltipDisplayed() {
		this.setState({
			displayed: true,
			position: this.getPosition()
		});
	},
	setTooltipHidden: function setTooltipHidden() {
		this.setState({
			displayed: false
		});
	},
	getPosition: function getPosition() {
		var clientRect = _reactDom2.default.findDOMNode(this).getBoundingClientRect();
		return {
			bottom: clientRect.bottom,
			height: clientRect.height,
			left: clientRect.left,
			right: clientRect.right,
			top: clientRect.top + this.state.scrollTop,
			width: clientRect.width
		};
	},
	updatePosition: function updatePosition() {
		this.setState({
			position: this.getPosition()
		});
	},
	toggle: function toggle() {
		if (this.state.clicked) {
			this.setTooltipUnclicked();
		} else {
			this.setTooltipClicked();
		}
	},
	handleMouseMove: function handleMouseMove(e) {
		var domNode = _reactDom2.default.findDOMNode(this);
		if (e.target === domNode || _domUtils2.default.isDescendant(domNode, e.target)) {
			this.setTooltipDisplayed();
		} else {
			this.setTooltipHidden();
		}
	},
	handleScroll: function handleScroll(e) {
		var scrollTop = e.target.body.scrollTop;
		this.setState({ scrollTop: scrollTop });
		this.updatePosition();
	},


	//
	//	Rendering logic
	//

	_renderTooltipInner: function _renderTooltipInner() {
		if (this.state.displayed || this.state.clicked) {
			var props = {
				position: this.state.position,
				onHideRequest: this.setTooltipUnclicked,
				clicked: this.state.clicked,
				style: this.props.innerStyle
			};
			var tooltipInner = _react2.default.createElement(_tooltipInner2.default, props, this.props.children);
			_reactDom2.default.render(tooltipInner, this.tooltipInnerDiv);
		} else {
			_reactDom2.default.unmountComponentAtNode(this.tooltipInnerDiv);
		}
	},
	render: function render() {
		var style = this.props.style || {};
		style.position = 'relative';

		var className = this.props.className || null;

		return _react2.default.createElement(
			'span',
			{ style: style, className: className },
			_react2.default.createElement(
				_tooltipTrigger2.default,
				{ style: this.props.triggerStyle, onToggle: this.toggle },
				this.props.triggerLayout
			)
		);
	}
});

/* Exports, amd will come as a feature request */
exports.default = ToolTipOuter;