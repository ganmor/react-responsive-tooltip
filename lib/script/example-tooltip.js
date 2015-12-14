'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _tooltip = require('./tooltip');

var _tooltip2 = _interopRequireDefault(_tooltip);

var _reactColorPicker = require('react-color-picker');

var _reactColorPicker2 = _interopRequireDefault(_reactColorPicker);

var _reactDraggable = require('react-draggable');

var _reactDraggable2 = _interopRequireDefault(_reactDraggable);

require('./lib/color-picker.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ExampleSheet = _react2.default.createClass({
	displayName: 'ExampleSheet',
	render: function render() {
		return _react2.default.createElement(
			'div',
			null,
			_react2.default.createElement(
				'h1',
				null,
				'Here is a serie of tooltip example'
			),
			_react2.default.createElement(
				'h2',
				null,
				'Tooltip with a default layout'
			),
			_react2.default.createElement(
				'p',
				null,
				'React tooltip has a default style, this is the moist simple use case'
			),
			_react2.default.createElement(
				'p',
				null,
				_react2.default.createElement(
					'i',
					null,
					'You can drag the tooltip around while open to see the content adjust to the position'
				)
			),
			_react2.default.createElement(
				_reactDraggable2.default,
				null,
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(
						_tooltip2.default,
						null,
						'This is an example content, it has a default style but you can customize it to fit your needs'
					)
				)
			),
			_react2.default.createElement(
				'h2',
				null,
				'Customizz the tooltip trigger'
			),
			_react2.default.createElement(
				_tooltip2.default,
				null,
				_react2.default.createElement(
					'div',
					null,
					_react2.default.createElement(_reactColorPicker2.default, null)
				)
			),
			_react2.default.createElement(
				'h2',
				null,
				'Customize the tooltip inner content'
			),
			_react2.default.createElement(
				'p',
				null,
				' Tooltip inner is just a react component. Thus it can contain anything, including other react components'
			)
		);
	}
});

_reactDom2.default.render(_react2.default.createElement(ExampleSheet, null), document.querySelector('#tooltip-container'));