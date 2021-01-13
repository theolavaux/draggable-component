import React, { FC, useState, useRef } from 'react';
import './Draggable.scss';

import Box from '../Box/Box';

const Draggable: FC = () => {
  // Refs
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
    if (active) {
      const { clientX, clientY } = event;

      if (!boxRef.current) {
        return;
      }

      const {
        top,
        right,
        bottom,
        left,
      } = boxRef.current.getBoundingClientRect();
      event.preventDefault();

      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;

      const boxHeight = boxRef.current.offsetHeight;
      const boxWidth = boxRef.current.offsetWidth;

      setCurrentX(clientX - initialX);

      if (left <= 0) {
        setCurrentX(-windowWidth / 2 + boxWidth / 2);
      } else if (right >= windowWidth) {
        setCurrentX(windowWidth / 2 - boxWidth / 2);
      } else {
        setCurrentX(clientX - initialX);
      }

      if (top <= 0) {
        setCurrentY(-windowHeight / 2 + boxHeight / 2);
      } else if (bottom >= windowHeight) {
        setCurrentY(windowHeight / 2 - boxHeight / 2);
      } else {
        setCurrentY(clientY - initialY);
      }

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
      data-test="draggable"
      id="draggable"
      onMouseDown={dragStart}
      onMouseUp={dragEnd}
      onMouseMove={drag}
      role="presentation"
    >
      <Box ref={boxRef} />
    </div>
  );
};

export { Draggable as default };
