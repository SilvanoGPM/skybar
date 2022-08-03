import { Stack } from '@chakra-ui/react';
import { BiDrink, BiStopwatch } from 'react-icons/bi';
import { SiAirtable } from 'react-icons/si';

import {
  RiDashboardLine,
  RiHomeLine,
  RiImageLine,
  RiLoginBoxFill,
  RiMoneyDollarBoxFill,
  RiSearchLine,
  RiUserLine,
} from 'react-icons/ri';

import { useAuth } from '$contexts/AuthContext';
import { getUserPermissions } from '$utils/getUserPermissions';

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  const { user } = useAuth();

  const { isGuest, isUser, isStaff, isAdmin } = getUserPermissions(user?.role);

  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink icon={RiHomeLine} href="/">
          Ínicio
        </NavLink>

        <NavLink icon={BiDrink} href="/drinks">
          Bebidas
        </NavLink>

        {isGuest && (
          <NavLink icon={RiLoginBoxFill} href="/login">
            Login
          </NavLink>
        )}
      </NavSection>

      {!isGuest && (
        <NavSection title="Pedidos">
          {isStaff && (
            <NavLink icon={BiStopwatch} href="/orders/latest">
              Últimos pedidos
            </NavLink>
          )}

          {isUser && (
            <NavLink icon={RiMoneyDollarBoxFill} href="/orders">
              Meus pedidos
            </NavLink>
          )}

          {isStaff && (
            <NavLink icon={RiSearchLine} href="/orders/search">
              Pesquisar pedidos
            </NavLink>
          )}
        </NavSection>
      )}

      {isAdmin && (
        <NavSection title="Admins">
          <NavLink icon={RiUserLine} href="/users">
            Usuários
          </NavLink>

          <NavLink icon={RiDashboardLine} href="/dashboard">
            Dashboard
          </NavLink>
        </NavSection>
      )}

      {isStaff && (
        <NavSection title="Outros">
          <NavLink icon={SiAirtable} href="/tables">
            Mesas
          </NavLink>

          <NavLink icon={RiImageLine} href="/images">
            Imagens
          </NavLink>
        </NavSection>
      )}
    </Stack>
  );
}
