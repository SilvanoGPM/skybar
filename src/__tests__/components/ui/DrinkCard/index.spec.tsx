import { fireEvent, render, screen } from '@testing-library/react';

import { DrinkCard } from '$components/ui/DrinkCard';
import * as OrdersContext from '$contexts/OrdersContext';
import { createUser } from '$__mocks__/createUser';

jest.mock('../../../../services/api/files', () => ({}));

const drink = {
  uuid: 'test-uuid',
  name: 'test-name',
  picture: 'test-picture',
  price: 10,
  alcoholic: true,
  priceFormatted: 'R$ 10',
};

describe('DrinkCard component', () => {
  it('renders correctly', () => {
    createUser();

    render(<DrinkCard drink={drink} />);

    expect(
      screen.getByRole('heading', { name: 'test-name' }),
    ).toBeInTheDocument();

    expect(screen.getByText('R$ 10')).toBeInTheDocument();
  });

  it('show amount badge on user is autheticated and has user permission', () => {
    createUser({
      user: { role: 'USER' },
      isAuthenticated: true,
    });

    render(<DrinkCard drink={drink} />);

    expect(screen.getByTestId('amount-badge')).toBeInTheDocument();
  });

  it('show delete and edit badges on user is autheticated and has staff permission and showAdminActions is true', () => {
    createUser({
      user: { role: 'ADMIN' },
      isAuthenticated: true,
    });

    render(<DrinkCard drink={drink} showAdminActions />);

    expect(screen.getByTestId('delete-badge')).toBeInTheDocument();
    expect(screen.getByTestId('edit-badge')).toBeInTheDocument();
  });

  it('add drink to order on button click', () => {
    createUser();

    const addDrinkToNewOrderMock = jest.fn();

    jest.spyOn(OrdersContext, 'useOrders').mockImplementationOnce(
      () =>
        ({
          addDrinkToNewOrder: addDrinkToNewOrderMock,
        } as any), // eslint-disable-line
    );

    addDrinkToNewOrderMock.mockReturnValueOnce(true);

    render(<DrinkCard drink={drink} />);

    const button = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.click(button);

    expect(addDrinkToNewOrderMock).toHaveBeenCalledWith(drink);
    expect(addDrinkToNewOrderMock).toHaveLastReturnedWith(true);
  });

  it('dont add drink to order on button click', () => {
    createUser();

    const addDrinkToNewOrderMock = jest.fn();

    jest.spyOn(OrdersContext, 'useOrders').mockImplementationOnce(
      () =>
        ({
          addDrinkToNewOrder: addDrinkToNewOrderMock,
        } as any), // eslint-disable-line
    );

    addDrinkToNewOrderMock.mockReturnValueOnce(false);

    render(<DrinkCard drink={drink} />);

    const button = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.click(button);

    expect(addDrinkToNewOrderMock).toHaveBeenCalledWith(drink);
    expect(addDrinkToNewOrderMock).toHaveLastReturnedWith(false);
  });
});
