A React responsive and customizable tooltip component

Works on desktop and touch device.
Displayed on touch on touch device, hidden when any part of the page is touched again

[![](https://img.shields.io/npm/v/react-responsive-tooltip.svg)](https://www.npmjs.com/package/react-responsive-tooltip)
[![](https://img.shields.io/npm/dm/react-responsive-tooltip.svg)](https://www.npmjs.com/package/react-responsive-tooltip)

# Basic Usage

The tooltip has a default style and a default positionning configuration

```
<ToolTip>
  My fabulous tooltip content
</ToolTip>
```

## Available Props

| Prop name     | Prop type     | Default   |
| ------------- |:-------------:| ---------:|
| className     | string        | undefined |
| style         | object        | undefined |
| btnClassName  | string        | undefined |
| btnStyle      | object        | undefined |
| innerStyle    | object        | undefined |
| displayed     | bool          | false     |


# Customization

You can override tooltip popover style with props innerStyle

If you want override some default style, you can import the default style and update it.

```javascript
import defaultInnerStyle from 'react-responsive-tooltip/lib/script/styles/tooltip-inner';
import defaultTriggerStyle from 'react-responsive-tooltip/lib/script/styles/tooltip-trigger';

// defaultInnerStyle is an immutable map
const innerStyle = defaultInnerStyle.set('fontSize', '10pt');
const triggerStyle = defaultTriggerStyle.set('backgroundColor', 'blue');

const triggerLayout = <span className='btn btn-default'>?</span>;

<ToolTip triggerStyle={triggerStyle} triggerLayout={triggerLayout} innerStyle={innerStyle}>
	...
</ToolTip>
```

# Example

```javascript
'use strict';

import ToolTip from 'react-responsive-tooltip';
import React from 'react';

const Example = React.createClass({
	render() {
		return (
			<div>
				<h1>Simple tooltip example</h1>

				<Tooltip>
					<div>
						<div>My tooltip text</div>
						<div>Could be html or another React components
					</div>
				</Tooltip>

				<h1>Customize the trigger tooltip example</h1>

				const trigger = '<span style={{pointer: 'help'}}>Could be text trigger also</span>';
				<ToolTip btnLayout={trigger}>
					<div>Another tooltip text</div>
				</ToolTip>
			</div>
		);
	}
});

export default Example;
```

# Compile es6 sources

```sh
$ npm run compile
```
Sources will be compiled with babel in the lib directory

You must have Babel 6 installed in global
```sh
$ npm install --global babel-cli
```

Babel presets are in devDependencies, don't forget doing
```sh
$ npm install
```
