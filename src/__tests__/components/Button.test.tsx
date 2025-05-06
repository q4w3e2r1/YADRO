import { render, fireEvent } from '@testing-library/react';
import Button from '../../components/Button/Button.component';

describe('Button Component', () => {
  it('renders with correct label', () => {
    const { getByText } = render(
      <Button label="Test Button" onClick={() => {}} />
    );
    expect(getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button label="Click Me" onClick={handleClick} />
    );
    
    fireEvent.click(getByText('Click Me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <Button 
        label="Styled Button" 
        onClick={() => {}} 
        className="custom-class" 
      />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('is disabled when disabled prop is true', () => {
    const { getByText } = render(
      <Button 
        label="Disabled Button" 
        onClick={() => {}} 
        disabled={true} 
      />
    );
    
    expect(getByText('Disabled Button')).toBeDisabled();
  });
}); 