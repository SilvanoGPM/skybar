import { render, screen } from '@testing-library/react';
import { MenuButton } from '$components/ui/Header/MenuButton';

describe('MenuButton componenet', () => {
  it('renders correctly', () => {
    render(<MenuButton />);

    expect(
      screen.getByRole('button', { name: /abrir menu/i }),
    ).toBeInTheDocument();
  });
});
