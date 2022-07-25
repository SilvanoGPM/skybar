import { fireEvent, render, screen } from '@testing-library/react';

import { DeleteBadge } from '$components/ui/DrinkCard/DeleteBadge';

describe('DeleteBadge component', () => {
  it('renders spinner on prop isDeleting is true', () => {
    render(<DeleteBadge uuid="test-uuid" name="test-name" isDeleting />);

    expect(screen.queryByText('test-name')).not.toBeInTheDocument();
  });

  it('calls handleDelete on button click', () => {
    const onDeleteMock = jest.fn();

    render(
      <DeleteBadge uuid="test-uuid" name="test-name" onDelete={onDeleteMock} />,
    );

    const button = screen.getByTestId('delete-button');

    fireEvent.click(button);

    expect(onDeleteMock).toHaveBeenCalledWith('test-uuid');
  });
});
