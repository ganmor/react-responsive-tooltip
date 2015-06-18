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