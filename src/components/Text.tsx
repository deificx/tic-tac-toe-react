import React from 'react';
import styles from './text.module.css';

export const Text: React.FC<{type: 'h1' | 'p'}> = ({children, type}) =>
  React.createElement(type, {className: styles.text}, children);
