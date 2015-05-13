var Tooltip = require('./tooltip.jsx');
var React = require('react');



var ExampleSheet = React.createClass({
	render : function () {
		return (
			<div>
				<h1>Here is a serie of tooltip example</h1>

				<h2>Example 1</h2>

				<div>
						<Tooltip>
							This is an example content, it has a default style but you can customize it to fit your needs
						</Tooltip>
				</div>

			</div>
		);
	}
});



React.render(<ExampleSheet />, document.querySelector('#tooltip-container'));

