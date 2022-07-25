import { AmountBadge } from '$components/ui/DrinkCard/AmountBadge';
import { render, screen } from '@testing-library/react';

describe('AmountBadge component', () => {
  it('renders correctly', () => {
    render(<AmountBadge amount={20} />);

    const badge = screen.getByTestId('amount-badge');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('20');
  });
});
