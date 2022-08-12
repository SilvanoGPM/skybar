import { Dispatch, SetStateAction } from 'react';

import {
  Button,
  Divider,
  Heading,
  LightMode,
  SimpleGrid,
  useBoolean,
  useToast,
} from '@chakra-ui/react';

import {
  cancelOrder,
  deliverOrder,
  finishOrder,
  startOrder,
  StatusItems,
} from '$services/api/orders';

import { Order } from '.';

interface ActionsProps {
  isStaff: boolean;
  isOwner: boolean;
  setOrder: Dispatch<SetStateAction<Order>>;
  order: Order;
}

const requests = {
  START: { message: 'Pedido iniciado com sucesso', call: startOrder },
  FINISH: { message: 'Pedido finalizado com sucesso', call: finishOrder },
  DELIVER: { message: 'Pedido entregue com sucesso', call: deliverOrder },
};

export function Actions({ isStaff, isOwner, order, setOrder }: ActionsProps) {
  const [isActionLoading, setIsActionLoading] = useBoolean();

  const toast = useToast();

  async function handleCancel() {
    try {
      setIsActionLoading.on();

      await cancelOrder(order.uuid);

      toast({ title: 'Pedido cancelado com sucesso', status: 'success' });

      setOrder({ ...order, status: 'CANCELED' });
    } catch {
      toast({ title: 'Erro ao cancelar pedido', status: 'error' });
    } finally {
      setIsActionLoading.off();
    }
  }

  async function handleStep(step: 'START' | 'FINISH' | 'DELIVER') {
    try {
      setIsActionLoading.on();

      const request = requests[step];

      await request.call(order.uuid);

      toast({ title: request.message, status: 'success' });

      const delivered = step === 'DELIVER';

      const status = !delivered ? ((step + 'ED') as StatusItems) : order.status;

      setOrder({ ...order, status, delivered });
    } catch {
      toast({ title: 'Erro ao executar ação', status: 'error' });
    } finally {
      setIsActionLoading.off();
    }
  }

  if (order.delivered || (isOwner && order.status !== 'PROCESSING')) {
    return null;
  }

  return (
    <>
      <Divider my="8" />

      <Heading mb="8">Ações</Heading>

      <LightMode>
        <SimpleGrid minChildWidth="200px" spacing="4">
          {!order.delivered && (
            <>
              {isStaff && order.status === 'PROCESSING' && (
                <Button
                  onClick={() => handleStep('START')}
                  isLoading={isActionLoading}
                >
                  Iniciar pedido
                </Button>
              )}

              {isStaff && order.status === 'STARTED' && (
                <Button
                  onClick={() => handleStep('FINISH')}
                  isLoading={isActionLoading}
                >
                  Finalizar pedido
                </Button>
              )}

              {isStaff && order.status === 'FINISHED' && (
                <Button
                  onClick={() => handleStep('DELIVER')}
                  isLoading={isActionLoading}
                >
                  Entregar pedido
                </Button>
              )}
            </>
          )}

          {((isOwner && order.status === 'PROCESSING') ||
            (isStaff &&
              (order.status === 'PROCESSING' ||
                order.status === 'STARTED'))) && (
            <Button
              onClick={handleCancel}
              isLoading={isActionLoading}
              colorScheme="red"
              color="white"
            >
              Cancelar pedido
            </Button>
          )}
        </SimpleGrid>
      </LightMode>
    </>
  );
}
