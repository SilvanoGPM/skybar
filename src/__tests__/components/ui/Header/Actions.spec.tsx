import { render, screen } from '@testing-library/react';
import * as Chakra from '@chakra-ui/react';

import { Actions } from '$components/ui/Header/Actions';
import { createUser } from '$__mocks__/createUser';

jest.mock('../../../../services/api/files', () => ({}));

jest.mock('../../../../contexts/OrdersContext', () => ({
  useOrders() {
    return { hasOrder: true };
  },
}));

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');

  return {
    __esModule: true,
    ...originalModule,
  };
});

describe('Actions component', () => {
  it('renders correctly with ThemeButton when screen is large', () => {
    jest.spyOn(Chakra, 'useBreakpointValue').mockReturnValue(3);

    createUser();

    render(<Actions />);

    expect(screen.getByRole('button', { name: /notificações/i }));
    expect(screen.getByRole('button', { name: /mostra o pedido atual/i }));
    expect(screen.getByRole('button', { name: /mudar tema/i }));
  });
});
