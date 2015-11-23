import React from 'react';

import defaultStyle from './styles/tooltip-trigger';

/* Trigger the tooltip */
const TooltipTrigger = React.createClass({

	propTypes: {
		style: React.PropTypes.object,
		//onHideRequest: React.PropTypes.func,
		//onDisplayRequest: React.PropTypes.func,
		onToggle: React.PropTypes.func.isRequired,
		children: React.PropTypes.node
	},

	onClick(e) {
		this.props.onToggle();
	},

	render() {
		const style = this.props.style || defaultStyle.toJS();
		const content = this.props.children || (<span>?</span>);

		return (
			<span style={style} onClick={this.onClick}>{content}</span>
		);
	}
});

export default TooltipTrigger;
