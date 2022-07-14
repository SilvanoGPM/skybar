import { supabase } from '../supabase';

const usersBucket = process.env.NEXT_PUBLIC_SUPABASE_USERS_BUCKET_NAME!;

const userStorage = supabase.storage.from(usersBucket);

export function getUserImage(uuid: string) {
  return userStorage.getPublicUrl(uuid).data?.publicURL || '';
}
