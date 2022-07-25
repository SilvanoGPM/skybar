import { fireEvent, render, screen } from '@testing-library/react';

import { UserInfoPopover } from '$components/ui/Header/UserInfoPopover';
import { createUseAuth } from '$__mocks__/auth';

jest.mock('../../../../services/api/files', () => ({}));

describe('UserInfoPopover component', () => {
  it('renders correctly', () => {
    createUseAuth({ user: { role: 'USER', name: 'test-name' } });

    render(<UserInfoPopover>Test</UserInfoPopover>);

    expect(screen.getByRole('button', { name: /test/i })).toBeInTheDocument();
    expect(screen.getByText(/logado como/i)).toBeInTheDocument();
    expect(screen.getByText('test-name')).toBeInTheDocument();
    expect(screen.getByText(/meu perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/meus pedidos/i)).toBeInTheDocument();
    expect(screen.getByText(/sair/i)).toBeInTheDocument();
  });

  it('call signOut on footer button click', () => {
    const signOutMock = jest.fn();

    createUseAuth({
      user: { role: 'USER', name: 'test-name' },
      signOut: signOutMock,
    });

    render(<UserInfoPopover>Test</UserInfoPopover>);

    const signOutButton = screen.getByText(/sair/i);

    fireEvent.click(signOutButton);

    expect(signOutMock).toHaveBeenCalled();
  });
});
