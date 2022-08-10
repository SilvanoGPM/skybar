import { HighlightedText } from '$components/ui/HighlightedText';

export const orderStatus = {
  PROCESSING: {
    title: (
      <>
        Aguardando <HighlightedText>confirmação</HighlightedText>
      </>
    ),

    description: (
      <>
        O pedido foi enviado para a gerência, agora aguarde a confirmação do
        início do preparo, isso deve demorar cerca de{' '}
        <HighlightedText>5 minutos</HighlightedText>.
      </>
    ),

    animationPromise: import('$assets/lottie/wait-order.json'),
  },
  STARTED: {
    title: (
      <>
        Pedido em <HighlightedText>preparado</HighlightedText>
      </>
    ),

    description: (
      <>
        Por favor fique no aguardo enquanto{' '}
        <HighlightedText>preparamos</HighlightedText> o pedido. A qualquer
        momento o pedido pode ficar pronto, então não deixe de{' '}
        <HighlightedText>checar</HighlightedText> de tempos em tempos.
      </>
    ),

    animationPromise: import('$assets/lottie/preparing-drinks.json'),
  },
  FINISHED: {
    title: (
      <>
        Pedido <HighlightedText>finalizado</HighlightedText>
      </>
    ),

    description: (
      <>
        Seu pedido esta pronto, caso você esteja em alguma mesa, apenas aguarde
        um garçom entregá-lo, caso você apenas esteja no aguarde, vá até o
        balcão retirar seu pedido.
      </>
    ),

    animationPromise: import('$assets/lottie/order-finished.json'),
  },
  CANCELED: {
    title: (
      <>
        O pedido foi <HighlightedText>cancelado</HighlightedText>
      </>
    ),

    description: (
      <>
        Seu pedido foi cancelado, caso você não tenha o cancelado, então foi uma{' '}
        <HighlightedText>decisão da gerência</HighlightedText>, para mais
        detalhes sobre o cancelamento deste pedido, vá até a gerência.
      </>
    ),

    animationPromise: import('$assets/lottie/order-canceled.json'),
  },
};
