import { render, screen } from '@testing-library/react';

import { OrderPreviewOpenButton } from '../../../components/ui/OrderPreviewOpenButton';

describe('OrderPreviewOpenButton component', () => {
  it('renders correctly', () => {
    render(<OrderPreviewOpenButton />);

    expect(
      screen.getByRole('button', { name: /mostra o pedido atual/i }),
    ).toBeInTheDocument();
  });
});
