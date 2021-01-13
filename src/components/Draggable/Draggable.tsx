import React, { FC, useState, useRef } from 'react';
import './Draggable.scss';

import Box from '../Box/Box';

const Draggable: FC = () => {
  // Refs
  const draggableRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  // Active state
  const [active, setActive] = useState(false);

  // Initial values
  const [initialX, setInitialX] = useState(0);
  const [initialY, setInitialY] = useState(0);

  // Current values
  const [currentX, setCurrentX] = useState(0);
  const [currentY, setCurrentY] = useState(0);

  /**
   * Use transform and translate3D to move the HTML element
   *
   * @param xPos Position x to translate
   * @param yPos Position y to translate
   * @param el Element to translate
   */
  const setTranslate = (
    xPos: number,
    yPos: number,
    el: HTMLElement | null
  ): void => {
    if (el) {
      el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }
  };

  /**
   * onDragStart event handler
   *
   * @param event
   */
  const dragStart = (event: React.MouseEvent): void => {
    const { clientX, clientY, target } = event;

    setInitialX(clientX - currentX);
    setInitialY(clientY - currentY);

    if (target === boxRef.current) {
      setActive(true);
    }
  };

  /**
   * onDrag event handler
   *
   * @param event
   */
  const drag = (event: React.MouseEvent): void => {
    const { clientX, clientY } = event;

    if (active) {
      event.preventDefault();

      setCurrentX(clientX - initialX);
      setCurrentY(clientY - initialY);

      setTranslate(currentX, currentY, boxRef.current);
    }
  };

  /**
   * onDragEnd event handler
   *
   * @param event
   */
  const dragEnd = (): void => {
    setInitialX(currentX);
    setInitialY(currentY);
    setActive(false);
  };

  return (
    <div
      id="draggable"
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
