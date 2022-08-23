import { Dispatch, SetStateAction } from 'react';

import {
  Button,
  Divider,
  Heading,
  SimpleGrid,
  useBoolean,
  useToast,
} from '@chakra-ui/react';

import { ConfirmPopover } from '$components/ui/ConfirmPopover';

import {
  cancelOrder,
  deliverOrder,
  finishOrder,
  startOrder,
  StatusItems,
} from '$services/api/orders';

import { Order } from '.';
import { queryClient } from '$services/queryClient';

type StepItems = 'START' | 'FINISH' | 'DELIVER' | 'CANCEL';

interface ActionsProps {
  isStaff: boolean;
  isOwner: boolean;
  setOrder: Dispatch<SetStateAction<Order>>;
  order: Order;
}

interface StepButtonProps {
  title: string;
  step: StepItems;
  status: StatusItems;
}

const requests = {
  START: { message: 'Pedido iniciado com sucesso', call: startOrder },
  FINISH: { message: 'Pedido finalizado com sucesso', call: finishOrder },
  DELIVER: { message: 'Pedido entregue com sucesso', call: deliverOrder },
  CANCEL: { message: 'Pedido cancelado com sucesso', call: cancelOrder },
};

export function Actions({ isStaff, isOwner, order, setOrder }: ActionsProps) {
  const [isActionLoading, setIsActionLoading] = useBoolean();

  const toast = useToast();

  async function handleStep(step: StepItems) {
    try {
      setIsActionLoading.on();

      const request = requests[step];

      await request.call(order.uuid);

      toast({
        title: request.message,
        status: 'success',
        isClosable: true,
        duration: 3000,
      });

      const delivered = step === 'DELIVER';

      const status = !delivered ? ((step + 'ED') as StatusItems) : order.status;

      queryClient.invalidateQueries('ordersToManage');

      setOrder({ ...order, status, delivered });
    } catch {
      toast({
        title: 'Erro ao executar ação',
        isClosable: true,
        duration: 3000,
        description: 'Tente recarregar a página para atualizar o pedido',
        status: 'error',
      });
    } finally {
      setIsActionLoading.off();
    }
  }

  function StepButton({ status, step, title }: StepButtonProps) {
    if (!isStaff || order.status !== status || order.delivered) {
      return null;
    }

    return (
      <ConfirmPopover
        header="Executar ação"
        body="Você realmente deseja executar esta ação?"
        onFinish={() => handleStep(step)}
      >
        <Button isLoading={isActionLoading}>{title}</Button>
      </ConfirmPopover>
    );
  }

  if (
    order.delivered ||
    (!isStaff && isOwner && order.status !== 'PROCESSING')
  ) {
    return null;
  }

  return (
    <>
      <Divider my="8" />

      <Heading mb="8">Ações</Heading>

      <SimpleGrid minChildWidth="200px" spacing="4">
        <StepButton title="Iniciar pedido" status="PROCESSING" step="START" />

        <StepButton title="Finalizar" status="STARTED" step="FINISH" />

        <StepButton title="Entregar pedido" status="FINISHED" step="DELIVER" />

        {((isOwner && order.status === 'PROCESSING') ||
          (isStaff && order.status !== 'CANCELED' && !order.delivered)) && (
          <ConfirmPopover
            header="Executar ação"
            body="Você realmente deseja executar esta ação?"
            onFinish={() => handleStep('CANCEL')}
          >
            <Button isLoading={isActionLoading} colorScheme="red" color="white">
              Cancelar pedido
            </Button>
          </ConfirmPopover>
        )}
      </SimpleGrid>
    </>
  );
}
