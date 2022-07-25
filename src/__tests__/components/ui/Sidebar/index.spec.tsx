import { render, screen } from '@testing-library/react';
import * as Chakra from '@chakra-ui/react';
import 'next-router-mock';

import { Sidebar } from '$components/ui/Sidebar';
import { createUseAuth } from '$__mocks__/auth';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('../../../../services/api/files', () => ({}));

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');

  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('Sidebar component', () => {
  it('renders correctly', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(3);

    createUseAuth();

    render(<Sidebar />);

    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /ínicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bebidas/i })).toBeInTheDocument();
  });

  it('renders drawer with sidebar when not is a large screen', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValueOnce(0);

    createUseAuth();

    render(<Sidebar />);

    expect(screen.queryByTestId('sidebar')).not.toBeInTheDocument();
  });
});
