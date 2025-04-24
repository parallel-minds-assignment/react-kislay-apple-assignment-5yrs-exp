import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '../../../components/shared/Modal/Modal';

describe('Modal Component', () => {
  const onCloseMock = jest.fn();
  const modalTitle = 'Test Modal';
  const modalContent = 'This is modal content';

  beforeEach(() => {
    onCloseMock.mockClear();
  });

  test('does not render when isOpen is false', () => {
    const { queryByText } = render(
      <Modal isOpen={false} onClose={onCloseMock}>
        <div>{modalContent}</div>
      </Modal>
    );
    expect(queryByText(modalContent)).not.toBeInTheDocument();
  });

  test('renders title and children when isOpen is true', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={onCloseMock} title={modalTitle}>
        <div>{modalContent}</div>
      </Modal>
    );

    expect(getByText(modalTitle)).toBeInTheDocument();
    expect(getByText(modalContent)).toBeInTheDocument();
  });

  test('calls onClose when clicking the close button', () => {
    const { getByRole } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>{modalContent}</div>
      </Modal>
    );

    fireEvent.click(getByRole('button'));
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when clicking the overlay', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>{modalContent}</div>
      </Modal>
    );

    const overlay = getByText(modalContent).closest('.modal-overlay')!;
    fireEvent.click(overlay);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('does not call onClose when clicking inside modal content', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={onCloseMock}>
        <div>{modalContent}</div>
      </Modal>
    );

    const content = getByText(modalContent);
    fireEvent.click(content);
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('does not close on overlay click if closeOnOverlayClick is false', () => {
    const { getByText } = render(
      <Modal isOpen={true} onClose={onCloseMock} closeOnOverlayClick={false}>
        <div>{modalContent}</div>
      </Modal>
    );

    const overlay = getByText(modalContent).closest('.modal-overlay')!;
    fireEvent.click(overlay);
    expect(onCloseMock).not.toHaveBeenCalled();
  });

  test('does not render close button if showCloseButton is false', () => {
    const { queryByRole } = render(
      <Modal isOpen={true} onClose={onCloseMock} showCloseButton={false}>
        <div>{modalContent}</div>
      </Modal>
    );

    expect(queryByRole('button')).not.toBeInTheDocument();
  });
});
