# Customization

You can override tooltip popover style with props innerStyle

If you want override some default style, you can import the default style and update it.


```javascript
import defaultInnerStyle from 'react-responsive-tooltip/src/script/styles/tooltip-inner';
import defaultTriggerStyle from 'react-responsive-tooltip/src/script/styles/tooltip-trigger';

// defaultInnerStyle is an immutable map
const innerStyle = defaultInnerStyle.set('fontSize', '10pt');
const triggerStyle = defaultTriggerStyle.set('backgroundColor', 'blue');

const triggerLayout = <span className='btn btn-default'>?</span>;

<Tooltip triggerStyle={triggerStyle} triggerLayout={triggerLayout} innerStyle={innerStyle}>
	...
</Tooltip>
```
