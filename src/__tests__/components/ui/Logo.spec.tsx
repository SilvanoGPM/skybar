import { render, screen, fireEvent } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { Logo } from '../../../components/ui/Logo';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

describe('Logo component', () => {
  it('renders correctly', () => {
    render(<Logo />);

    expect(screen.getByRole('link')).toBeInTheDocument();
    expect(screen.getByText(/sky/i)).toBeInTheDocument();
    expect(screen.getByText(/bar/i)).toBeInTheDocument();
  });

  it('navigate to home on click in logo', () => {
    mockRouter.setCurrentUrl('/test');

    render(<Logo />);

    const logo = screen.getByRole('link');

    fireEvent.click(logo);

    expect(singletonRouter).toMatchObject({ asPath: '/' });
  });
});
