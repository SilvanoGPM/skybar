import { render, screen } from '@testing-library/react';
import * as Chakra from '@chakra-ui/react';

import { UserInfo } from '$components/ui/Header/UserInfo';
import { createUser } from '$__mocks__/createUser';

jest.mock('../../../../services/api/files', () => ({}));

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');

  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('UserInfo component', () => {
  it('renders correctly', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(3);

    createUser({ user: { name: 'User Test', email: 'test-email@test.com' } });

    render(<UserInfo />);

    expect(screen.getByText(/user/i)).toBeInTheDocument();
    expect(screen.getByText(/test-email@test.com/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /user test/i })).toBeInTheDocument();
  });

  it('renders only avatar when screen size is small', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(0);

    createUser({ user: { name: 'User Test', email: 'test-email@test.com' } });

    render(<UserInfo />);

    expect(screen.getByRole('img', { name: /user test/i })).toBeInTheDocument();
    expect(screen.queryByText(/user/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/test-email@test.com/i)).not.toBeInTheDocument();
  });
});
