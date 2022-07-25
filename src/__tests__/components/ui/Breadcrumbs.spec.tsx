import { fireEvent, render, screen } from '@testing-library/react';
import singletonRouter from 'next/router';
import mockRouter from 'next-router-mock';

import { Breadcrumbs } from '$components/ui/Breadcrumbs';

import '$__mocks__/intersectionObserverMock';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

const items = [
  { href: '/', label: 'test' },
  { href: '/test-2', label: 'test-2' },
];

describe('Breadcrumbs component', () => {
  it('renders correctly', () => {
    render(<Breadcrumbs items={items} />);

    expect(screen.getByText('test')).toBeInTheDocument();
    expect(screen.getByTestId('current-page')).toBeInTheDocument();
  });

  it('redirect to clicked item', () => {
    mockRouter.setCurrentUrl('/test-2');

    render(<Breadcrumbs items={items} />);

    const item = screen.getByText('test');

    fireEvent.click(item);

    expect(singletonRouter).toMatchObject({ asPath: '/' });
  });
});
