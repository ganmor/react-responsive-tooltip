/*global window, document */
'use strict';

class DomUtils {

	static isDescendant(parent, child) {
		var node = child.parentNode;
		while (node !== null) {
			if (node === parent) {
				return true;
			}
			node = node.parentNode;
		}
		return false;
	}

	static getParentOverflowScroll(target) {
		if (target === window || target === document) {
			return document.body;
		}

		for (var el = target; el; el = el.parentElement) {
			var overflowY = window.getComputedStyle(el).overflowY;
			if (overflowY === 'auto' || overflowY === 'scroll') {
				return  el;
			}
		}
		return window;
	}
}

export default DomUtils;
