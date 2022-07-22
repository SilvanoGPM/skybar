import { fireEvent, render, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { SignInButton } from '$components/ui/SignInButton';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('SignInButton component', () => {
  it('renders correctly', () => {
    render(<SignInButton />);

    expect(screen.getByRole('link', { name: /entrar/i })).toBeInTheDocument();
  });

  it('navigate to login page on click', () => {
    mockRouter.setCurrentUrl('/');

    render(<SignInButton />);

    const login = screen.getByRole('link', { name: /entrar/i });

    fireEvent.click(login);

    expect(singletonRouter).toMatchObject({ asPath: '/login' });
  });
});
