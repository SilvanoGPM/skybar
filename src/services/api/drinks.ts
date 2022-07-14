import { httpClient } from '$services/httpClient';

export interface Drink {
  uuid: string;
  createdAt: string;
  updatedAt: string;
  volume: number;
  name: string;
  picture: string;
  description: string;
  price: number;
  additional: string;
  additionalList: string[];
  alcoholic: boolean;
}

export interface TopDrink {
  drinkUUID: string;
  name: string;
  total: number;
}

export async function findDrinkByUUID(uuid: string) {
  const { data } = await httpClient.get<Drink>(`/drinks/${uuid}`);

  return data;
}

export async function getTopDrinks(size = 5) {
  const { data } = await httpClient.get<TopDrink[]>(
    `/requests/top-drinks?size=${size}`,
  );

  return data;
}

export async function getTopDrinksMapped(size?: number) {
  const topDrinks = await getTopDrinks(size);

  const drinks = topDrinks.map(({ drinkUUID }) => findDrinkByUUID(drinkUUID));

  return Promise.all(drinks);
}
