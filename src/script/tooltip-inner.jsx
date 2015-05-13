var React = require("react");


/* The content of the tooltip while fully displayed */
var TooltipInner = React.createClass({

	propTypes: {
		className :  React.PropTypes.string,
		style :  React.PropTypes.object
	},

	getInitialState : function () {
		var overlay = document.createElement('div');
		return {
			visible : false,
			overlayDiv : overlay
		};
	},

	getDefaultStyle : function () {
		return {
			position:'absolute',
			background : '#000000',
			opacity: '0.8',
			padding:'5px'
		};
	},

	componentDidUpdate : function () {
		React.render(this._renderOverlay(), this.state.overlayDiv);
	},

	componentDidMount : function () {
		document.body.appendChild(this.state.overlayDiv);
		React.render(this._renderOverlay(), this.state.overlayDiv);
	},

	componentWillUnmount : function () {
		if (this.state.overlayDiv && this.state.overlayDiv.parentNode) {
			this.state.overlayDiv.parentNode.removeChild(this.state.overlayDiv);
		}
	},

	handleOverlayClick : function (e) {
		e.stopPropagation();
		this.props.onHideRequest();
	},

	_renderOverlay : function () {
		var style, position;

		style = {
			position:'fixed',
			opacity:'0',
			background:'rgba(0,0,0)',
			cursor:'pointer',
			width:'100%',
			height:'100%',
			top:'0',
			left:'0'
		};

		return (<div style={style} onClick={this.handleOverlayClick}>this should be transparent overlay that cover the whole window</div>);
	},

	render : function () {

		var style = this.getDefaultStyle();
		style.top = this.props.position.top;
		style.left = this.props.position.left;


		return <div style={style}>{this.props.children}</div>;
	}
});

module.exports = TooltipInner;
