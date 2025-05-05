import React from 'react';
import styles from './Button.module.css';

type ButtonProps = {
    onClick: () => void;
    label: string;
    className?: string;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
  };
  
  const Button: React.FC<ButtonProps> = ({
    onClick,
    label,
    className = '',
    disabled = false,
    type = 'button'
  }) => {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${styles['base-button']} ${styles[className]}`}
      >
        {label}
      </button>
    );
  };
  
  export default Button;