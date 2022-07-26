import { Can } from '$components/Can';
import { createUseAuth } from '$__mocks__/auth';
import { render, screen } from '@testing-library/react';

jest.mock('../../services/api/files', () => ({}));

describe('Can component', () => {
  it('renders correctly', () => {
    createUseAuth();

    render(<Can roles={['USER']}>Test</Can>);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('dont renders on user dont has roles or not is authenticated', () => {
    createUseAuth({ user: { role: 'BARMEN' }, isAuthenticated: true });

    render(<Can roles={['ADMIN']}>Test</Can>);

    expect(screen.queryByText(/test/i)).not.toBeInTheDocument();
  });
});
