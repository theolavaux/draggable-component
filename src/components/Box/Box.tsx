import React, { forwardRef } from 'react';
import './Box.scss';

const Box = forwardRef<HTMLDivElement>((props, ref) => {
  return <div id="box" ref={ref} />;
});

export { Box as default };
