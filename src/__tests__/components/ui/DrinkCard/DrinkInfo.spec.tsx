import { DrinkInfo } from '$components/ui/DrinkCard/DrinkInfo';
import { fireEvent, render, screen } from '@testing-library/react';

describe('DrinkInfo component', () => {
  it('renders correctly', () => {
    render(
      <DrinkInfo
        drink={{ name: 'test-name', priceFormatted: 'test-price' }}
        onAddDrinkToOrder={jest.fn()}
        showAddButton={false}
      />,
    );

    expect(
      screen.getByRole('heading', { name: 'test-name' }),
    ).toBeInTheDocument();

    expect(screen.getByText('test-price')).toBeInTheDocument();
  });

  it('calls onAddDrinkToOrder on button click', () => {
    const onAddDrinkToOrderMock = jest.fn();

    render(
      <DrinkInfo
        drink={{ name: 'test-name', priceFormatted: 'test-price' }}
        onAddDrinkToOrder={onAddDrinkToOrderMock}
        showAddButton
      />,
    );

    const button = screen.getByRole('button', { name: /adicionar/i });

    fireEvent.click(button);

    expect(onAddDrinkToOrderMock).toHaveBeenCalled();
  });
});
