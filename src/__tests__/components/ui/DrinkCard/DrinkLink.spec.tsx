import { DrinkLink } from '$components/ui/DrinkCard/DrinkLink';
import { render, screen } from '@testing-library/react';

describe('DrinkLink component', () => {
  it('renders correctly', () => {
    render(<DrinkLink drinkUUID="test-uuid" fullHeight />);

    expect(screen.getByRole('link', { name: /visualizar bebida/i }));
  });
});
