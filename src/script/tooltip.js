import React from 'react';
import ReactDOM from 'react-dom';

import TooltipInner from './tooltip-inner';
import TooltipTrigger from './tooltip-trigger';
import DomUtils from './dom-utils';


/*
 * A tooltip component that has a default style
 */


/** The Main component container **/
const ToolTipOuter = React.createClass({

	propTypes: {
		/* Style and className of the container */
		className: React.PropTypes.string,
		style: React.PropTypes.object,

		/* Style and class of the tooltip trigger */
		btnClassName: React.PropTypes.string,
		btnStyle: React.PropTypes.object,

		/* Style and class of the tooltip content */
		innerStyle: React.PropTypes.object,
		displayed: React.PropTypes.bool,
		btnLayout: React.PropTypes.node,
		children: React.PropTypes.node.isRequired,
	},

	//
	//	Life Cycle
	//

	getInitialState() {
		return {
			displayed: this.props.displayed,
			clicked: false,
			position: null
		};
	},

	componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);

		this.tooltipInnerDiv = document.createElement("div");
		document.body.appendChild(this.tooltipInnerDiv);
		this._renderTooltipInner();
	},

	componentWillReceiveProps() {
		this.setState({
			position: ReactDOM.findDOMNode(this).getBoundingClientRect()
		});
	},

	componentDidUpdate() {
		this._renderTooltipInner();
	},

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);

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
			position: ReactDOM.findDOMNode(this).getBoundingClientRect()
		});
	},

	setTooltipHidden() {
		this.setState({
			displayed: false
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
		const target = document.elementFromPoint(e.pageX, e.pageY);
		if (target === domNode || DomUtils.isDescendant(domNode, target)) {
			this.setTooltipDisplayed();
		} else {
			this.setTooltipHidden();
		}
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
				<TooltipTrigger className={this.props.btnClassName}
						onToggle={this.toggle}
						tooltipDisplayed={this.state.displayed}
						clicked={this.state.clicked}
						style={this.props.btnStyle}>
					{this.props.btnLayout}
				</TooltipTrigger>
			</span>
		);
	}
});


/* Exports, amd will come as a feature request */
export default ToolTipOuter;
