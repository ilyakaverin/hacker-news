import React from 'react';
import * as style from './style.module.css';
import cn from 'classnames';

interface IButtonProps {
  text: string;
  onClick(argument?: unknown): unknown;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const Button: React.FC<IButtonProps> = ({ text, onClick, isLoading, className = '', disabled }) => (
  <button disabled={disabled} className={cn(style.button, className)} onClick={onClick}>
    {isLoading ? 'Loading' : text}
  </button>
);
