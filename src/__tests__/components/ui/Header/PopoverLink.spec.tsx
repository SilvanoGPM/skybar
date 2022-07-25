import { fireEvent, render, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { PopoverLink } from '$components/ui/Header/PopoverLink';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('PopoverLink component', () => {
  it('renders correctly', () => {
    render(<PopoverLink href="/test">Test</PopoverLink>);

    expect(screen.getByRole('link', { name: /test/i })).toBeInTheDocument();
  });

  it('redirects to href prop', () => {
    mockRouter.setCurrentUrl('/');

    render(<PopoverLink href="/test">Test</PopoverLink>);

    const link = screen.getByRole('link', { name: /test/i });

    fireEvent.click(link);

    expect(singletonRouter).toMatchObject({ asPath: '/test' });
  });
});
