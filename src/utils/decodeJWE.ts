import jose from 'node-jose';

const decoder = new TextDecoder('utf-8');

export async function decodeJWE(jwe: string) {
  const keyBuffer = Buffer.from(String(process.env.JWT_PRIVATE_KEY), 'utf-8');

  const key = await jose.JWK.asKey({
    use: 'enc',
    alg: 'dir',
    kty: 'oct',
    k: keyBuffer,
  });

  const result = await jose.JWE.createDecrypt(key).decrypt(jwe);

  return decoder.decode(result.payload);
}
