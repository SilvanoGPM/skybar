import { httpClient } from '$services/httpClient';
import { getUserImage } from './files';

export interface User {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  role: string;
  birthDay: string;
  lockRequests: false;
  image: string;
  lockRequestsTimestamp: Date | null;
}

interface LoginParams {
  email: string;
  password: string;
}

export async function getUserInfo() {
  const { data } = await httpClient.get<Omit<User, 'image'>>(
    '/users/all/user-info',
  );

  const image = getUserImage(data.uuid);

  return { ...data, image };
}

export async function login({ email, password }: LoginParams) {
  return httpClient.post('/login', { email, password });
}

export async function findUserByEmail(email: string) {
  const { data } = await httpClient.get<User>(
    `/users/admin/find-by-email/${email}`,
  );

  return data;
}
