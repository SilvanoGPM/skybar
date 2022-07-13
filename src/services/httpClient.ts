import axios from 'axios';
import type { HeadersDefaults } from 'axios';

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export function setHttpClientAuthorization(token: string) {
  const httpClientHeaders = httpClient.defaults.headers as HeadersDefaults & {
    Authorization: string;
  };

  httpClientHeaders['Authorization'] = token;
}
