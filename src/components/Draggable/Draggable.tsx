import React, { FC, useState, useRef } from 'react';
import './Draggable.scss';

import Box from '../Box/Box';

const Draggable: FC = () => {
  const draggableRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState(false);
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [xOffset, setXOffset] = useState(0);
  const [yOffset, setYOffset] = useState(0);

  const setTranslate = (xPos: number, yPos: number, el: HTMLElement) => {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
  };

  const dragStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (e.type === 'touchstart') {
      setInitialX((e as React.TouchEvent).touches[0].clientX - xOffset);
      setInitialY((e as React.TouchEvent).touches[0].clientY - yOffset);
    } else {
      setInitialX((e as React.MouseEvent).clientX - xOffset);
      setInitialY((e as React.MouseEvent).clientY - yOffset);
    }

    if (e.target === boxRef.current) {
      setActive(true);
    }
  };

  const drag = (e: React.TouchEvent | React.MouseEvent) => {
    if (active) {
      e.preventDefault();

      if (e.type === 'touchmove') {
        setCurrentX((e as React.TouchEvent).touches[0].clientX - initialX);
        setCurrentY((e as React.TouchEvent).touches[0].clientY - initialY);
      } else {
        setCurrentX((e as React.MouseEvent).clientX - initialX);
        setCurrentY((e as React.MouseEvent).clientY - initialY);
      }

      setXOffset(currentX);
      setYOffset(currentY);

      setTranslate(currentX, currentY, boxRef.current as HTMLElement);
    }
  };

  const dragEnd = () => {
    setInitialX(currentX);
    setInitialY(currentY);
    setActive(false);
  };

  return (
    <div
      id="draggable"
      onTouchStart={dragStart}
      onTouchEnd={dragEnd}
      onTouchMove={drag}
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={drag}
      ref={draggableRef}
      role="presentation"
    >
      <Box ref={boxRef} />
    </div>
  );
};

export { Draggable as default };
