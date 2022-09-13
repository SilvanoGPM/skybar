import { useStorage } from '$hooks/useStorage';
import { parseCookies } from 'nookies';
import { createContext, ReactNode, useCallback, useContext } from 'react';
import { useSubscription } from 'react-stomp-hooks';

import { useAuth } from './AuthContext';

interface NotificationsContextProviderProps {
  children: ReactNode;
}

type NotificationOptions = 'CANCELED' | 'STARTED' | 'FINISHED' | 'DELIVERED';

interface Notification {
  message: string;
  type: NotificationOptions;
  id: string;
}

interface NotificationsContextData {
  notifications: Notification[];
  clearNotifications: () => void;
  removeNotification: (id: string) => void;
}

export const NotificationsContext = createContext(
  {} as NotificationsContextData,
);

const messages = {
  STARTED: 'Pedido iniciado',
  CANCELED: 'Pedido cancelado',
  FINISHED: 'Pedido finalizado',
  DELIVERED: 'Pedido entregue',
};

export function NotificationsProvider({
  children,
}: NotificationsContextProviderProps) {
  const { user } = useAuth();
  const { 'skybar.token': token } = parseCookies();

  const [notifications, setNotifications] = useStorage<Notification[]>(
    '@SkyBar/Notifications',
    [],
  );

  useSubscription(
    [`/topic/updated/${user?.email}`, `/topic/request-changed/${user?.email}`],
    (message) => {
      const body = JSON.parse(message.body);

      if (body.uuid) {
        const key = body.message as NotificationOptions;

        const notificationFound = notifications.find(
          ({ id }) => id === body.uuid,
        );

        const newNotification = {
          message: messages[key],
          type: key,
          id: body.uuid,
        };

        if (notificationFound) {
          const updatedNotifications = notifications.map((notification) =>
            notification.id === body.uuid
              ? { ...newNotification }
              : notification,
          );

          setNotifications(updatedNotifications);
        } else {
          setNotifications([newNotification, ...notifications]);
        }
      }
    },
    { Authorization: token },
  );

  const removeNotification = useCallback(
    (id: string) => {
      setNotifications((notifications) =>
        notifications.filter((notification) => notification.id !== id),
      );
    },
    [setNotifications],
  );

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, [setNotifications]);

  return (
    <NotificationsContext.Provider
      value={{
        notifications,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationsContext);
}
