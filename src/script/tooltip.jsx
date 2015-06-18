/*global window, document */
'use strict';

import React from 'react';
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
		className :  React.PropTypes.string,
		style :  React.PropTypes.object,

		/* Style and class of the tooltip trigger */
		btnClassName : React.PropTypes.string,
		btnStyle :  React.PropTypes.object,

		/* Style and class of the tooltip content */
		innerStyle : React.PropTypes.object,
		displayed : React.PropTypes.boolean
	},

	//
	//	Life Cycle
	//

	getInitialState() {
		return {
			displayed : this.props.displayed,
			clicked : false,
			position : null
		};
	},

	componentDidMount() {
		document.addEventListener('mousemove', this.handleMouseMove);
		this.setState({
			position : this.getDOMNode().getBoundingClientRect()
		});
	},

	componentWillReceiveProps() {
		this.setState({
			position : this.getDOMNode().getBoundingClientRect()
		});
	},

	componentWillUnmount() {
		document.removeEventListener('mousemove', this.handleMouseMove);
	},

	handleMouseMove(e) {
		var target = document.elementFromPoint(e.pageX, e.pageY);
		if (target === this.getDOMNode() || DomUtils.isDescendant(this.getDOMNode(), target)) {
			this.setTooltipDisplayed();
		} else {
			this.setTooltipHidden();
		}
	},


	//
	//	State Control
	//

	toggle() {
		if (this.state.clicked) {
			this.setTooltipUnclicked();
		} else {
			this.setTooltipClicked();
		}
	},

	setTooltipUnclicked() {
		this.setState({
			clicked : false
		});
	},

	setTooltipClicked() {
		this.setState({
			clicked : true
		});
	},

	setTooltipDisplayed() {
		this.setState({
			displayed : true,
			position : this.getDOMNode().getBoundingClientRect()
		});
	},

	setTooltipHidden() {
		this.setState({
			displayed : false
		});
	},


	//
	//	Rendering logic
	//

	render() {
		const style = this.props.style || {};
		style.position = 'relative';

		const className = this.props.className || '';

		return (
			<span style={style} className={className}>
				<TooltipTrigger className={this.props.btnClassName}
						onToggle={this.toggle}
						tooltipDisplayed={this.state.displayed}
						clicked={this.state.clicked}
						style={this.props.btnStyle}>
						{this.props.btnLayout}
				</TooltipTrigger>

				{(this.state.displayed || this.state.clicked) &&
					(<TooltipInner position={this.state.position}
							onHideRequest={this.setTooltipUnclicked}
							clicked={this.state.clicked}
							style={this.props.innerStyle}>
						{this.props.children}
					</TooltipInner>
				)}
			</span>
		);
	}
});


/* Exports, amd will come as a feature request */
export default ToolTipOuter;
