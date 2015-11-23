export default class DomUtils {

	static isDescendant(parent, child) {
		let node = child && child.parentNode;
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

		for (let el = target; el; el = el.parentElement) {
			const overflowY = window.getComputedStyle(el).overflowY;
			if (overflowY === 'auto' || overflowY === 'scroll') {
				return  el;
			}
		}
		return window;
	}
}
