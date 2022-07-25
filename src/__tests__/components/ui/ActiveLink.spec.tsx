import { fireEvent, render, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { ActiveLink } from '$components/ui/ActiveLink';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('ActiveLink component', () => {
  it('renders correctly', () => {
    render(
      <ActiveLink href="/test">
        <a>Test</a>
      </ActiveLink>,
    );

    expect(screen.getByRole('link', { name: /test/i })).toBeInTheDocument();
  });

  it('is active when shouldMatchExactHref prop is true and current url is equal to href prop', () => {
    mockRouter.setCurrentUrl('/test');

    render(
      <ActiveLink href="/test" as="/test" shouldMatchExactHref>
        <a>Test</a>
      </ActiveLink>,
    );

    expect(screen.getByTestId('is-active')).toBeInTheDocument();
  });

  it('is active when shouldMatchExactHref prop is true and current url is equal to as prop', () => {
    mockRouter.setCurrentUrl('/test');

    render(
      <ActiveLink href="" as="/test" shouldMatchExactHref>
        <a>Test</a>
      </ActiveLink>,
    );

    expect(screen.getByTestId('is-active')).toBeInTheDocument();
  });

  it('redirects to path on click', () => {
    mockRouter.setCurrentUrl('/');

    render(
      <ActiveLink href="/test">
        <a>Test</a>
      </ActiveLink>,
    );

    const link = screen.getByRole('link', { name: /test/i });

    fireEvent.click(link);

    expect(singletonRouter).toMatchObject({ asPath: '/test' });
  });
});
