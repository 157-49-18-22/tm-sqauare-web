import React from 'react';

/**
 * Wrap content for buttery scroll-triggered entrance.
 * @param {string} variant - up | down | left | right | scale | image | fade
 * @param {number} delay - ms delay before animation starts
 */
const Reveal = ({
  children,
  as: Tag = 'div',
  variant = 'up',
  delay = 0,
  className = '',
  style,
  ...rest
}) => (
  <Tag
    data-reveal={variant}
    className={className}
    style={{
      ...style,
      ...(delay ? { '--reveal-delay': `${delay}ms` } : {}),
    }}
    {...rest}
  >
    {children}
  </Tag>
);

export default Reveal;
