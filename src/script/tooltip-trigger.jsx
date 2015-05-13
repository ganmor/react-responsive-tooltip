var React = require("react");

/* The button that triggers the tooltip */
var TooltipTrigger = React.createClass({

	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},

	handleMouseMove: function(e) {
    this.setState({windowWidth: window.innerWidth});
  },

  componentDidMount: function () {
    window.addEventListener('mouseove', this.handleMouseMove);
  },

  componentWillUnmount: function () {
    window.removeEventListener('mouseove', this.handleMouseMove);
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
