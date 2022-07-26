import { render, screen } from '@testing-library/react';

import { Chakra, getServerSideProps } from '$components/Chakra';
import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

describe('Chakra component', () => {
  it('renders correctly', () => {
    render(<Chakra cookies="test-cookies">Test</Chakra>);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('renders correctly with localStorage when cookies dont is string', () => {
    render(<Chakra cookies={{}}>Test</Chakra>);

    expect(screen.getByText(/test/i)).toBeInTheDocument();
  });

  it('loads initial data', async () => {
    const response = await getServerSideProps({
      req: { headers: { cookie: 'test-cookie' } },
    } as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>);

    expect(response).toEqual(
      expect.objectContaining({ props: { cookies: 'test-cookie' } }),
    );
  });

  it('loads initial with empty string cookies prop when no cookie in req', async () => {
    const response = await getServerSideProps({
      req: { headers: { cookie: undefined } },
    } as GetServerSidePropsContext<ParsedUrlQuery, PreviewData>);

    expect(response).toEqual(
      expect.objectContaining({ props: { cookies: '' } }),
    );
  });
});
