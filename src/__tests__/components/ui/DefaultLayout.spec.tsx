import { render, screen } from '@testing-library/react';
import 'next-router-mock';

import { DefaultLayout } from '$components/ui/DefaultLayout';

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
    render(
      <DefaultLayout>
        <p>Test</p>
      </DefaultLayout>,
    );

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });
});
