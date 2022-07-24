import { Empty } from '$components/ui/Empty';
import { render, screen } from '@testing-library/react';

describe('Empty component', () => {
  it('renders correctly', () => {
    render(<Empty title="Test" message="Message test" />);

    expect(screen.getByRole('heading', { name: /test/i })).toBeInTheDocument();
  });
});
