A React responsive and customizable tooltip component

Works on desktop and touch device.
Displayed on touch on touch device, hidden when any part of the page is touched again

## Basic Usage

The tooltip has a default style and a default positionning configuration

```
<ToolTip>
  My fabulous tooltip content
</ToolTip>
```


Available Props

- className
- style

- btnClassName
- btnStyle

- innerStyle
- displayed



# Customization

You can override tooltip popover style with props innerStyle

If you want override some default style, you can import the default style and update it.


```javascript
import defaultInnerStyle from 'react-responsive-tooltip/src/script/styles/tooltip-inner';

// defaultInnerStyle is an immutable map
const innerStyle = defaultInnerStyle.set('fontSize', '10pt');

<Tooltip innerStyle={innerStyle}>
	...
</Tooltip>
```



# Example

```javascript
'use strict';

import Tooltip from 'react-responsible-tooltip';
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
				<Tooltip btnLayout={trigger}>
					<div>Another tooltip text</div>
				</Tooltip>
			</div>
		);
	}
});

export default Example;
```
