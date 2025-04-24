import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from '../../../components/shared/Card/Card';

describe('Card Component', () => {
  const frontText = 'Front Side';
  const backText = 'Back Side';

  test('renders frontContent only when not flippable', () => {
    const { getByText, queryByText } = render(
      <Card frontContent={<div>{frontText}</div>} />
    );

    expect(getByText(frontText)).toBeInTheDocument();
    expect(queryByText(backText)).not.toBeInTheDocument();
  });

  test('renders both frontContent and backContent when flippable', () => {
    const { getByText } = render(
      <Card
        frontContent={<div>{frontText}</div>}
        backContent={<div>{backText}</div>}
        isFlippable
      />
    );

    expect(getByText(frontText)).toBeInTheDocument();
    expect(getByText(backText)).toBeInTheDocument();
  });

  test('calls onHover when flipOnHover is true', () => {
    const onHoverMock = jest.fn();
    const { getByText } = render(
      <Card
        frontContent={<div>{frontText}</div>}
        onHover={onHoverMock}
        isFlippable
        flipOnHover
        backContent={<div>{backText}</div>}
      />
    );

    fireEvent.mouseEnter(getByText(frontText));
    expect(onHoverMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClick when card is clicked', () => {
    const onClickMock = jest.fn();
    const { getByText } = render(
      <Card
        frontContent={<div>{frontText}</div>}
        onClick={onClickMock}
        isFlippable
        backContent={<div>{backText}</div>}
      />
    );

    fireEvent.click(getByText(frontText));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
