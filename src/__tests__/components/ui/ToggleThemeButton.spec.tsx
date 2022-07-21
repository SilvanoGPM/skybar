import { render, screen } from '@testing-library/react';

import { ToggleThemeButton } from '../../../components/ui/ToggleThemeButton';

describe('ToggleThemeButton component', () => {
  it('renders correctly', () => {
    render(<ToggleThemeButton />);

    expect(
      screen.getByRole('button', { name: /mudar tema/i }),
    ).toBeInTheDocument();
  });
});
