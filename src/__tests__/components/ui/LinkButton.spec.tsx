import { fireEvent, render, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { LinkButton } from '$/components/ui/LinkButton';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('LinkButton component', () => {
  it('renders correctly', () => {
    render(<LinkButton href="/test">Test</LinkButton>);

    expect(screen.getByRole('link', { name: /test/i })).toBeInTheDocument();
  });

  it('navigate to href on click', () => {
    mockRouter.setCurrentUrl('/test-2');

    render(<LinkButton href="/test">Test</LinkButton>);

    const link = screen.getByRole('link', { name: /test/i });

    fireEvent.click(link);

    expect(singletonRouter).toMatchObject({ asPath: '/test' });
  });
});
