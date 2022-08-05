import { fireEvent, render, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { Link } from '$/components/ui/Link';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Link component', () => {
  it('renders correctly', () => {
    render(<Link href="/test">Test</Link>);

    expect(screen.getByRole('link', { name: /test/i })).toBeInTheDocument();
  });

  it('navigate to href on click', () => {
    mockRouter.setCurrentUrl('/test-2');

    render(<Link href="/test">Test</Link>);

    const link = screen.getByRole('link', { name: /test/i });

    fireEvent.click(link);

    expect(singletonRouter).toMatchObject({ asPath: '/test' });
  });
});
