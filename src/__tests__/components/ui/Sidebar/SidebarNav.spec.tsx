import { render, screen } from '@testing-library/react';
import 'next-router-mock';

import { SidebarNav } from '$components/ui/Sidebar/SidebarNav';
import { createUser } from '$__mocks__/createUser';

jest.mock('next/dist/client/router', () => require('next-router-mock'));

jest.mock('../../../../services/api/files', () => ({}));

describe('SidebarNav component', () => {
  it('renders correctly', () => {
    render(<SidebarNav />);

    expect(screen.getByRole('link', { name: /ínicio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /bebidas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
  });

  it('renders only user links', () => {
    createUser({ isAuthenticated: true, user: { role: 'USER' } });

    render(<SidebarNav />);

    expect(
      screen.queryByRole('link', { name: /login/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /meus pedidos/i }),
    ).toBeInTheDocument();
  });

  it('renders only staff links', () => {
    createUser({ isAuthenticated: true, user: { role: 'BARMEN' } });

    render(<SidebarNav />);

    expect(
      screen.queryByRole('link', { name: /login/i }),
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /últimos pedidos/i }),
    ).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /pesquisar pedidos/i }),
    ).toBeInTheDocument();

    expect(screen.getByRole('link', { name: /mesas/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /imagens/i })).toBeInTheDocument();
  });

  it('renders only admins links', () => {
    createUser({ isAuthenticated: true, user: { role: 'ADMIN' } });

    render(<SidebarNav />);

    expect(
      screen.queryByRole('link', { name: /login/i }),
    ).not.toBeInTheDocument();

    expect(screen.getByRole('link', { name: /usuários/i })).toBeInTheDocument();

    expect(
      screen.getByRole('link', { name: /dashboard/i }),
    ).toBeInTheDocument();
  });
});
