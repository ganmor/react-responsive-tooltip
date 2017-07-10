'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _tooltipTrigger = require('./styles/tooltip-trigger');

var _tooltipTrigger2 = _interopRequireDefault(_tooltipTrigger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* Trigger the tooltip */
var TooltipTrigger = _react2.default.createClass({
	displayName: 'TooltipTrigger',


	propTypes: {
		style: _react2.default.PropTypes.object,
		//onHideRequest: React.PropTypes.func,
		//onDisplayRequest: React.PropTypes.func,
		onToggle: _react2.default.PropTypes.func.isRequired,
		children: _react2.default.PropTypes.node
	},

	onClick: function onClick(e) {
		this.props.onToggle();
	},
	render: function render() {
		var style = this.props.style || _tooltipTrigger2.default.toJS();
		var content = this.props.children || _react2.default.createElement(
			'span',
			null,
			'?'
		);

		return _react2.default.createElement(
			'span',
			{ style: style, onClick: this.onClick },
			content
		);
	}
});

exports.default = TooltipTrigger;