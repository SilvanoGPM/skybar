import { render, screen } from '@testing-library/react';
import * as Chakra from '@chakra-ui/react';

import { Actions } from '$components/ui/Header/Actions';
import { createUseAuth } from '$__mocks__/auth';
import { createUseOrders } from '$__mocks__/orders';

jest.mock('../../../../services/api/files', () => ({}));

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');

  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('Actions component', () => {
  it('renders correctly', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(3);

    createUseOrders();

    createUseAuth();

    render(<Actions />);

    expect(
      screen.getByRole('button', { name: /notificações/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /mostra o pedido atual/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /mudar tema/i }),
    ).toBeInTheDocument();
  });

  it('renders without ToggleThemeButton when screen is small', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(0);

    createUseOrders();

    createUseAuth();

    render(<Actions />);

    expect(
      screen.getByRole('button', { name: /notificações/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /mostra o pedido atual/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /mudar tema/i }),
    ).not.toBeInTheDocument();
  });

  it('renders without notifications and OrderPreviewOpenButton button when user not is auhenticated', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(0);

    createUseOrders();

    createUseAuth({ isAuthenticated: false, user: { role: 'USER' } });

    render(<Actions />);

    expect(
      screen.queryByRole('button', { name: /notificações/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /mostra o pedido atual/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /mudar tema/i }),
    ).not.toBeInTheDocument();
  });

  it('renders without OrderPreviewOpenButton button when dont has order', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(0);

    createUseOrders({ hasOrder: false });

    createUseAuth();

    render(<Actions />);

    expect(
      screen.getByRole('button', { name: /notificações/i }),
    ).toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /mostra o pedido atual/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole('button', { name: /mudar tema/i }),
    ).not.toBeInTheDocument();
  });
});
