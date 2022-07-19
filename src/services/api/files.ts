import { supabase } from '../supabase';

const usersBucket = process.env.NEXT_PUBLIC_SUPABASE_USERS_BUCKET_NAME!;
const drinksBucket = process.env.NEXT_PUBLIC_SUPABASE_DRINKS_BUCKET_NAME!;

const userStorage = supabase.storage.from(usersBucket);
const drinkStorage = supabase.storage.from(drinksBucket);

export function getUserImage(uuid: string) {
  return userStorage.getPublicUrl(uuid).data?.publicURL || '';
}

export async function uploadDrinkImage(picture: File) {
  const buffer = await picture.arrayBuffer();

  const { error } = await supabase.storage
    .from(drinksBucket)
    .upload(picture.name, buffer, {
      contentType: 'image/jpeg',
      upsert: true,
    });

  if (error) {
    throw Error(error.message);
  }

  return drinkStorage.getPublicUrl(picture.name).data?.publicURL || '';
}
