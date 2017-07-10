'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DomUtils = function () {
	function DomUtils() {
		_classCallCheck(this, DomUtils);
	}

	_createClass(DomUtils, null, [{
		key: 'isDescendant',
		value: function isDescendant(parent, child) {
			var node = child && child.parentNode;
			while (node !== null) {
				if (node === parent) {
					return true;
				}
				node = node.parentNode;
			}
			return false;
		}
	}, {
		key: 'getParentOverflowScroll',
		value: function getParentOverflowScroll(target) {
			if (target === window || target === document) {
				return document.body;
			}

			for (var el = target; el; el = el.parentElement) {
				var overflowY = window.getComputedStyle(el).overflowY;
				if (overflowY === 'auto' || overflowY === 'scroll') {
					return el;
				}
			}
			return window;
		}
	}]);

	return DomUtils;
}();

exports.default = DomUtils;