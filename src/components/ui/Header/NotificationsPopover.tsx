import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { BiBell, BiCheckCircle, BiLike, BiPlayCircle } from 'react-icons/bi';
import { RiCloseCircleLine, RiCloseLine } from 'react-icons/ri';

import { useNotifications } from '$contexts/NotificationsContext';

import { LinkButton } from '../LinkButton';

const notificationsTypes = {
  CANCELED: { color: 'red.500', icon: RiCloseCircleLine },
  STARTED: { color: 'yellow.700', icon: BiPlayCircle },
  FINISHED: { color: 'blue.400', icon: BiCheckCircle },
  DELIVERED: { color: 'green.500', icon: BiLike },
};

export function NotificationsPopover() {
  const { notifications, clearNotifications, removeNotification } =
    useNotifications();

  const disclosure = useDisclosure();

  return (
    <Popover {...disclosure}>
      <PopoverTrigger>
        <Box pos="relative" mr="2">
          <IconButton
            aria-label="Notificações"
            colorScheme="gray"
            icon={<Icon as={BiBell} />}
          />

          {notifications.length > 0 && (
            <Center
              fontSize="sm"
              pos="absolute"
              top="-2"
              right="-2"
              bg="red"
              color="white"
              rounded="full"
              w="6"
              h="6"
            >
              {notifications.length}
            </Center>
          )}
        </Box>
      </PopoverTrigger>

      <PopoverContent _dark={{ bg: 'gray.900' }} _light={{ bg: 'gray.50' }}>
        <PopoverArrow />

        <PopoverHeader
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          Notificações
          <PopoverCloseButton />
        </PopoverHeader>

        <PopoverBody>
          <VStack spacing="4" py="4" rounded="lg">
            {notifications.map((notification) => {
              const { color, icon } = notificationsTypes[notification.type];

              return (
                <Flex
                  w="full"
                  py="4"
                  px="6"
                  rounded="md"
                  direction="column"
                  pos="relative"
                  key={notification.id}
                  _dark={{ bg: 'gray.800' }}
                  _light={{ bg: 'gray.100' }}
                >
                  <IconButton
                    aria-label="Remover notificação"
                    variant="unstyled"
                    pos="absolute"
                    top="-2"
                    left="0"
                    bg="red.400"
                    color="white"
                    onClick={() => removeNotification(notification.id)}
                    size="xs"
                    rounded="full"
                    icon={<Icon as={RiCloseLine} />}
                  />

                  <Flex align="center" justify="space-between">
                    <Heading fontSize="xl">{notification.message}</Heading>

                    <Icon as={icon} color={color} />
                  </Flex>

                  <LinkButton
                    size="sm"
                    mt="2"
                    onClick={() => {
                      disclosure.onClose();
                      removeNotification(notification.id);
                    }}
                    href={`/orders/${notification.id}`}
                  >
                    Ver pedido
                  </LinkButton>
                </Flex>
              );
            })}

            {notifications.length === 0 && <Text>Sem notificações 🔔</Text>}
          </VStack>
        </PopoverBody>

        {notifications.length > 0 && (
          <PopoverFooter>
            <Button w="full" colorScheme="gray" onClick={clearNotifications}>
              Limpar notificações
            </Button>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
}
