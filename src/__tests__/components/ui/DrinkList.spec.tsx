import { render, screen } from '@testing-library/react';
import { useInView } from 'react-intersection-observer';

import { DrinkList } from '$components/ui/DrinkList';

import '$__mocks__/intersectionObserverMock';

const useInViewMocked = useInView as jest.Mock;

jest.mock('react-intersection-observer');

jest.mock('../../../contexts/AuthContext', () => ({
  useAuth() {
    return {};
  },
}));

const drinks = [
  {
    uuid: 'test-uuid',
    name: 'test-name',
    picture: 'test-picture',
    price: 10,
    alcoholic: true,
    priceFormatted: 'R$ 10',
  },
];

describe('DrinkList component', () => {
  it('renders correctly with invisible elements', () => {
    useInViewMocked.mockReturnValue([null, false]);

    render(
      <DrinkList
        title="test-tile"
        drinks={drinks}
        empty={{ title: 'test-empty-title' }}
      />,
    );

    expect(screen.getByText('test-tile')).toBeInTheDocument();
  });

  it('renders correctly wiith visible elements', () => {
    useInViewMocked.mockReturnValue([null, true]);

    render(
      <DrinkList
        title="test-tile"
        drinks={drinks}
        empty={{ title: 'test-empty-title' }}
      />,
    );

    expect(screen.getByText('test-tile')).toBeInTheDocument();
  });

  it('show message when drinks is empty', () => {
    render(
      <DrinkList
        title="test-tile"
        drinks={[]}
        empty={{ title: 'test-empty-title' }}
      />,
    );

    expect(screen.getByText('test-empty-title'));
  });
});
