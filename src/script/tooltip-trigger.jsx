var React = require("react");

/* The button that triggers the tootip */
var TooltipTrigger = React.createClass({
	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},

	componentDidMount : function () {
		// Start listenning to move on the document if any move occur hover the element, display the tooltip , if any move occurs outside, hide
	},

	onClick : function (e) {
		if (this.props.tooltipDisplayed) {
			this.props.onHideRequest();
		} else {
			this.props.onDisplayRequest();
		};
	},

	render : function () {
		var content = this.props.children || (<span>?</span>);
		return (
			<span style={{display:'inline-block', cursor:'pointer'}} onClick={this.onClick}>{content}</span>
		);
	}
});

module.exports = TooltipTrigger;
