import { render, screen } from '@testing-library/react';

import { OneLineText } from '$components/ui/OneLineText';

describe('OneLineText component', () => {
  it('renders correctly', () => {
    render(<OneLineText>Test Text</OneLineText>);

    expect(screen.getByText(/test text/i)).toBeInTheDocument();
  });
});
