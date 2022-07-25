import { fireEvent, render, screen } from '@testing-library/react';
import { BiTestTube } from 'react-icons/bi';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { NavLink } from '$components/ui/Sidebar/NavLink';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('NavLink component', () => {
  it('renders correctly', () => {
    render(
      <NavLink href="/test" icon={BiTestTube}>
        test
      </NavLink>,
    );

    expect(screen.getByRole('link', { name: /test/i }));
  });

  it('redirects to href prop', () => {
    mockRouter.setCurrentUrl('/');

    render(
      <NavLink href="/test" icon={BiTestTube}>
        test
      </NavLink>,
    );

    const link = screen.getByRole('link', { name: /test/i });

    fireEvent.click(link);

    expect(singletonRouter).toMatchObject({ asPath: '/test' });
  });
});
