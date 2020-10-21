import React from 'react';
import classNames from 'classnames';
import styles from './button.module.css';

export const Button: React.FC<React.ComponentProps<'button'>> = ({
  children,
  className,
  // tslint:disable-next-line:trailing-comma
  ...props
}) => (
  <button className={classNames(styles.button, className)} {...props}>
    {children}
  </button>
);
