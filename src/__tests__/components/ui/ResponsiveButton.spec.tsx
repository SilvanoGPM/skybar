import { render, screen } from '@testing-library/react';

import { ResponsiveButton } from '../../../components/ui/ResponsiveButton';

describe('ResponsiveButton component', () => {
  it('renders correctly like a Button', () => {
    render(<ResponsiveButton aria-label="Button Test" />);

    expect(
      screen.getByRole('button', { name: /button test/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('renders correctly like a IconButton', () => {
    render(<ResponsiveButton aria-label="Button Test" onlyIcon />);

    expect(
      screen.getByRole('button', { name: /button test/i }),
    ).toBeInTheDocument();

    expect(screen.getByTestId('icon-button')).toBeInTheDocument();
  });
});
