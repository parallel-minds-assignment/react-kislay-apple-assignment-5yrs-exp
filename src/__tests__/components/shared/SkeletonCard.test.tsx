import React from 'react';
import { render } from '@testing-library/react';
import SkeletonCard from '../../../components/shared/Skeleton/SkeletonCard';

describe('SkeletonCard Component', () => {
  test('renders all skeleton elements', () => {
    const { container } = render(<SkeletonCard />);

    expect(container.querySelector('.skeleton-card')).toBeInTheDocument();
    expect(container.querySelector('.skeleton-poster')).toBeInTheDocument();
    expect(container.querySelector('.skeleton-content')).toBeInTheDocument();
    expect(container.querySelector('.skeleton-title')).toBeInTheDocument();
    expect(container.querySelectorAll('.skeleton-text')).toHaveLength(2);
    expect(container.querySelector('.skeleton-button')).toBeInTheDocument();
  });
});
