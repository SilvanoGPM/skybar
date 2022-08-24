import { Icon, Spinner } from '@chakra-ui/react';

import {
  RiCheckFill,
  RiCloseFill,
  RiHeartFill,
  RiPlayCircleFill,
} from 'react-icons/ri';

export type BadgeKey = keyof typeof badges;

export const badges = {
  PROCESSING: {
    title: 'Esperando confirmação',
    bgColor: 'blue.400',
    children: <Spinner size="sm" color="white" />,
  },

  STARTED: {
    title: 'Pedido iniciado',
    bgColor: 'yellow.600',
    children: <Icon as={RiPlayCircleFill} color="white" />,
  },

  FINISHED: {
    title: 'Pedido finalizado',
    bgColor: 'green.400',
    children: <Icon as={RiCheckFill} color="white" />,
  },

  CANCELED: {
    title: 'Pedido cancelado',
    bgColor: 'red.400',
    children: <Icon as={RiCloseFill} color="white" />,
  },

  DELIVERED: {
    title: 'Pedido entregue',
    bgColor: 'red.400',
    children: <Icon as={RiHeartFill} color="white" />,
  },
};
