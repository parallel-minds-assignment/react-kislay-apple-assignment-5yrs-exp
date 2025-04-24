import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ThemeToggle from '../../../components/shared/ThemeToggle';

describe('ThemeToggle Component', () => {
  it('renders with dark mode label when darkMode is true', () => {
    const { getByRole } = render(<ThemeToggle darkMode={true} onToggle={() => {}} />);
    expect(getByRole('button')).toHaveTextContent('☀️ Light Mode');
  });

  it('renders with light mode label when darkMode is false', () => {
    const { getByRole } = render(<ThemeToggle darkMode={false} onToggle={() => {}} />);
    expect(getByRole('button')).toHaveTextContent('🌙 Dark Mode');
  });

  it('calls onToggle when clicked', () => {
    const onToggleMock = jest.fn();
    const { getByRole } = render(<ThemeToggle darkMode={false} onToggle={onToggleMock} />);
    fireEvent.click(getByRole('button'));
    expect(onToggleMock).toHaveBeenCalledTimes(1);
  });
});
