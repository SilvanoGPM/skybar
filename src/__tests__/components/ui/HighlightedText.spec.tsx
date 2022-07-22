import { render, screen } from '@testing-library/react';

import { HighlightedText } from '$components/ui/HighlightedText';

describe('HighlightedText component', () => {
  it('renders correctly', () => {
    render(<HighlightedText>Test Text</HighlightedText>);

    expect(screen.getByText(/test text/i)).toBeInTheDocument();
  });
});
