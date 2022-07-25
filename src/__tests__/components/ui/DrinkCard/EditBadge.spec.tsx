import { render, screen } from '@testing-library/react';
import { EditBadge } from '$components/ui/DrinkCard/EditBadge';

describe('EditBadge component', () => {
  it('renders correctly', () => {
    render(<EditBadge uuid="test-uuid" />);

    const link = screen.getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/drinks/edit/test-uuid');
    expect(screen.getByTestId('edit-badge')).toBeInTheDocument();
  });
});
