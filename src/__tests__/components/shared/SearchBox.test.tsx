import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBox from '../../../components/shared/SearchBox';

jest.useFakeTimers();

describe('SearchBox Component', () => {
  const setup = (props = {}) => {
    const onSearchMock = jest.fn();
    const utils = render(<SearchBox onSearch={onSearchMock} {...props} />);
    const input = utils.getByPlaceholderText('Search movie titles...') as HTMLInputElement; // Updated placeholder
    return {
      ...utils,
      input,
      onSearchMock,
    };
  };

  afterEach(() => {
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  test('renders with default placeholder', () => {
    const { input } = setup();
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe('Search movie titles...'); // Updated placeholder
  });

  test('calls onSearch after debounce time', () => {
    const { input, onSearchMock } = setup({ debounceTime: 500 });

    fireEvent.change(input, { target: { value: 'Batman' } });

    // Should not be called immediately
    expect(onSearchMock).not.toHaveBeenCalled();

    // Advance timers by 500ms
    jest.advanceTimersByTime(500);

    expect(onSearchMock).toHaveBeenCalledWith('Batman');
    expect(onSearchMock).toHaveBeenCalledTimes(1);
  });

  test('clears previous timeout on rapid input', () => {
    const { input, onSearchMock } = setup({ debounceTime: 300 });

    fireEvent.change(input, { target: { value: 'B' } });
    fireEvent.change(input, { target: { value: 'Ba' } });
    fireEvent.change(input, { target: { value: 'Bat' } });

    // Fast typing: debounce should reset each time
    jest.advanceTimersByTime(300);

    expect(onSearchMock).toHaveBeenCalledTimes(1);
    expect(onSearchMock).toHaveBeenCalledWith('Bat');
  });

  test('supports custom placeholder and className', () => {
    const { getByPlaceholderText } = setup({
      placeholder: 'Search movie titles...',
      className: 'custom-class',
    });

    const input = getByPlaceholderText('Search movie titles...');
    expect(input).toHaveClass('search-box');
    expect(input).toHaveClass('custom-class');
  });

  test('autofocus attribute is set when true', () => {
    const { input } = setup({ autoFocus: true });
    expect(input).toHaveAttribute('autofocus');
  });
});
