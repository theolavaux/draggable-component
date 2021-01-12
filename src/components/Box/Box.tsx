import React, { forwardRef } from 'react';
import './Box.scss';

const Dragabble = forwardRef<HTMLDivElement>((props, ref) => {
  return <div id="box" ref={ref} />;
});

export { Dragabble as default };
