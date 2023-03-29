import $, { StylixProps } from '@stylix/core';
import * as React from 'react';
import { LivePreview } from 'react-live';

export const logoSrc = ` 
import $ from '@stylix/core';

// Add CSS styles directly to your html elements:
function Logo() {
  return (
    <$.div font-size="5.6em">
      <AngleBracket angle="<" margin-right="0.05em" />
    
      <$.h1 display="inline" font="inherit">
        Stylix
      </$.h1>

      <$.img 
        src="img/paintbrush.svg" 
        width="0.8em" 
        margin-left="0.2em"
        vertical-align="-5%" 
      />
      
      <AngleBracket angle=">" margin-left="0.05em" />
    </$.div>
  );
}

// Or create reusable and extendable styled  
// components with standard React patterns!
function AngleBracket({ angle, ...styles }) {
  return (
    <$.span opacity={0.4} font-weight={900} {...styles}>
      {angle}
    </$.span>
  );
}

render(<Logo />)
// (the render() function is used by this code editor 
// to display the result on the right)
`.trim();

export default React.forwardRef<HTMLDivElement, StylixProps>(function Logo(props, ref) {
  return (
    <$.span
      ref={ref}
      display="inline-block"
      font-family="Nunito, sans-serif"
      font-size={[16, 14, 10]}
      line-height="normal"
      {...props}
    >
      <LivePreview />
    </$.span>
  );
});
