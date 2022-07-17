import { ApiError } from '$errors/ApiError';
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
  try {
    const { headers } = await httpClient.post('/login', { email, password });
    return headers.authorization;
  } catch (error) {
    const err = error as { response: { data: { status: number } } };
    const status = err?.response?.data?.status || 0;

    if (status === 401) {
      const userExists = await verifyUserByEmail(email);

      const message = userExists
        ? 'Senha incorreta'
        : 'Nenhum usuário encontrado com esse E-mail';

      throw new ApiError(message);
    }

    throw new Error('Aconteceu um erro ao tentar conectar no servidor');
  }
}

export async function findUserByEmail(email: string) {
  const { data } = await httpClient.get<User>(
    `/users/admin/find-by-email/${email}`,
  );

  return data;
}

export async function verifyUserByEmail(email: string) {
  try {
    await httpClient.get<User>(`/users/verify-by-email/${email}`);
    return true;
  } catch {
    return false;
  }
}
