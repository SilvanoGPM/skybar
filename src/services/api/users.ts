import { httpClient } from '$services/httpClient';

export interface User {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  role: string;
  birthDay: string;
  lockRequests: false;
  lockRequestsTimestamp: Date | null;
}

interface LoginParams {
  email: string;
  password: string;
}

export async function getUserInfo() {
  const { data } = await httpClient.get<User>('/users/all/user-info');

  return data;
}

export async function login({ email, password }: LoginParams) {
  return httpClient.post('/login', { email, password });
}
