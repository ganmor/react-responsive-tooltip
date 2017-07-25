import React from "react";
import ReactDOM from "react-dom";

import Tooltip from "./tooltip";
import "./lib/color-picker.css";

const ExampleComponent = React.createClass({
	render() {
		return <div style={{ border: "10px solid #AAA" }}>ExampleComponent</div>;
	}
});

const ExampleSheet = React.createClass({
	render() {
		return (
			<div>
				<h1>Here is a serie of tooltip example</h1>

				<h2>Tooltip with a default layout</h2>
				<p>React tooltip has a default style, this is the moist simple use case</p>
				<p>
					<i>You can drag the tooltip around while open to see the content adjust to the position</i>
				</p>

				<h2>Customize the tooltip trigger</h2>

				<Tooltip>
					<ExampleComponent />
				</Tooltip>

				<h2>Customize the tooltip inner content</h2>
				<p> Tooltip inner is just a react component. Thus it can contain anything, including other react components</p>
			</div>
		);
	}
});

ReactDOM.render(<ExampleSheet />, document.querySelector("#tooltip-container"));
