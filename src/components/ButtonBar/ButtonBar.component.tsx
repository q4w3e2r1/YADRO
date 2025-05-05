import React from 'react';
import Button from '../Button/Button.component';
import styles from './ButtonBar.module.css';

type ButtonBarProps = {
  onFetch: () => void;
  onClear: () => void;
  onSave: () => void;
};

const ButtonBar: React.FC<ButtonBarProps> = ({
  onSave,
  onFetch,
  onClear,
}) => {
  return (
    <div className={styles['data-controls']}>
      <Button 
        label="fetch" 
        onClick={onFetch} 
        className="fetch-button"
      />
      <Button
        label="clear"
        onClick={onClear}
        className="clear-button"
      />
        <Button
          label="save"
          onClick={onSave}
          className="save-button"
        />
    </div>
  );
};

export default ButtonBar