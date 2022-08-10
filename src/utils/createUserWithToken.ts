import decode from 'jwt-decode';

import { decodeJWE } from './decodeJWE';

export interface DecodedUser {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
  authorities: string[];
}

export async function createUserWithToken(token: string) {
  const jwe = token.replace('Bearer ', '');
  const jwt = await decodeJWE(jwe);
  return decode<DecodedUser>(jwt);
}
