import { NavSection } from '$components/ui/Sidebar/NavSection';
import { render, screen } from '@testing-library/react';

describe('NavSection component', () => {
  it('renders correctly', () => {
    render(
      <NavSection title="test-section-title">
        <p>test-section-children</p>
      </NavSection>,
    );

    expect(screen.getByText('test-section-title')).toBeInTheDocument();
    expect(screen.getByText('test-section-children')).toBeInTheDocument();
  });
});
