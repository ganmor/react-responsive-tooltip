import React from 'react';
import ReactDOM from 'react-dom';

import TooltipInner from './tooltip-inner';
import TooltipTrigger from './tooltip-trigger';
import DomUtils from './dom-utils';


/*
 * A tooltip component that has a default style
 */


/** The Main component container **/
const TooltipOuter = React.createClass({

	propTypes: {
		/* Style and className of the container */
		className: React.PropTypes.string,
		style: React.PropTypes.object,

		/* Style and class of the tooltip trigger */
		triggerStyle: React.PropTypes.object,
		triggerLayout: React.PropTypes.node,

		/* Style and class of the tooltip content */
		innerStyle: React.PropTypes.object,
		displayed: React.PropTypes.bool,
		children: React.PropTypes.node.isRequired,
	},

	//
	//	Life Cycle
	//

	getInitialState() {
		return {
			displayed: this.props.displayed,
			clicked: false,
			position: null,
			scrollTop: 0
		};
	},

	componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		document.addEventListener('scroll', this.handleScroll);

		this.tooltipInnerDiv = document.createElement("div");
		document.body.appendChild(this.tooltipInnerDiv);
		this._renderTooltipInner();
	},

	componentWillReceiveProps() {
		this.updatePosition();
	},

	componentDidUpdate() {
		this._renderTooltipInner();
	},

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);
		document.removeEventListener('scroll', this.handleScroll);

		ReactDOM.unmountComponentAtNode(this.tooltipInnerDiv);
		document.body.removeChild(this.tooltipInnerDiv);
	},


	//
	//	State Control
	//

	setTooltipUnclicked() {
		this.setState({
			clicked: false
		});
	},

	setTooltipClicked() {
		this.setState({
			clicked: true
		});
	},

	setTooltipDisplayed() {
		this.setState({
			displayed: true,
			position: this.getPosition()
		});
	},

	setTooltipHidden() {
		this.setState({
			displayed: false
		});
	},

	getPosition() {
		const clientRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
		return {
			bottom: clientRect.bottom,
			height: clientRect.height,
			left: clientRect.left,
			right: clientRect.right,
			top: clientRect.top + this.state.scrollTop,
			width: clientRect.width
		};
	},

	updatePosition() {
		this.setState({
			position: this.getPosition()
		});
	},

	toggle() {
		if (this.state.clicked) {
			this.setTooltipUnclicked();
		} else {
			this.setTooltipClicked();
		}
	},

	handleMouseMove(e) {
		const domNode = ReactDOM.findDOMNode(this);
		if (e.target === domNode || DomUtils.isDescendant(domNode, e.target)) {
			this.setTooltipDisplayed();
		} else {
			this.setTooltipHidden();
		}
	},

	handleScroll(e) {
		const scrollTop = e.target.body.scrollTop;
		this.setState({ scrollTop });
		this.updatePosition();
	},


	//
	//	Rendering logic
	//

	_renderTooltipInner() {
		if (this.state.displayed || this.state.clicked) {
			const props = {
				position: this.state.position,
				onHideRequest: this.setTooltipUnclicked,
				clicked: this.state.clicked,
				style: this.props.innerStyle
			};
			const tooltipInner = React.createElement(TooltipInner, props, this.props.children);
			ReactDOM.render(tooltipInner, this.tooltipInnerDiv);
		} else {
			ReactDOM.unmountComponentAtNode(this.tooltipInnerDiv);
		}
	},

	render() {
		const style = this.props.style || {};
		style.position = 'relative';

		const className = this.props.className || null;

		return (
			<span style={style} className={className}>
				<TooltipTrigger style={this.props.triggerStyle} onToggle={this.toggle}>
					{this.props.triggerLayout}
				</TooltipTrigger>
			</span>
		);
	}
});


/* Exports, amd will come as a feature request */
export default TooltipOuter;
