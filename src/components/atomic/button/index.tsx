import React, { ReactNode } from 'react';
import * as style from './style.module.css';
import cn from 'classnames';

interface IButtonProps {
  onClick(argument?: unknown): unknown;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  children?: ReactNode;
}

export const Button: React.FC<IButtonProps> = ({ onClick, className = '', disabled, children }) => (
  <button disabled={disabled} className={cn(style.button, className, { [style.disabled]: disabled })} onClick={onClick}>
    {children}
  </button>
);
