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

import { NavLink } from './NavLink';
import { NavSection } from './NavSection';

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="Geral">
        <NavLink icon={RiHomeLine} href="/">
          Ínicio
        </NavLink>

        <NavLink icon={RiLoginBoxFill} href="/login">
          Login
        </NavLink>

        <NavLink icon={BiDrink} href="/drinks/search">
          Bebidas
        </NavLink>
      </NavSection>

      <NavSection title="Pedidos">
        <NavLink icon={BiStopwatch} href="/orders/latest">
          Últimos pedidos
        </NavLink>

        <NavLink icon={RiMoneyDollarBoxFill} href="/orders/my">
          Meus pedidos
        </NavLink>

        <NavLink icon={RiSearchLine} href="/orders/search">
          Pesquisar pedidos
        </NavLink>
      </NavSection>

      <NavSection title="Admins">
        <NavLink icon={RiUserLine} href="/users">
          Usuários
        </NavLink>

        <NavLink icon={RiDashboardLine} href="/dashboard">
          Dashboard
        </NavLink>
      </NavSection>

      <NavSection title="Outros">
        <NavLink icon={SiAirtable} href="/tables">
          Mesas
        </NavLink>

        <NavLink icon={RiImageLine} href="/images">
          Imagens
        </NavLink>
      </NavSection>
    </Stack>
  );
}
