import { render, screen } from '@testing-library/react';
import 'next-router-mock';

import { DefaultLayout } from '$components/ui/DefaultLayout';
import { createUseOrders } from '$__mocks__/orders';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('@chakra-ui/react', () => {
  const originalModule = jest.requireActual('@chakra-ui/react');

  return {
    __esModule: true,
    ...originalModule,
    useBreakpointValue: jest.fn().mockReturnValue(3),
  };
});

jest.mock('../../../services/api/files', () => ({}));

describe('DefaultLayout component', () => {
  it('renders correctly', () => {
    createUseOrders({ total: { base: 10, formatted: 'R$ 10' } });

    render(
      <DefaultLayout>
        <p>Test</p>
      </DefaultLayout>,
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
