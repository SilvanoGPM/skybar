import qs from 'query-string';

import { httpClient } from '$services/httpClient';

import type { Pagination } from './types';
import { uploadDrinkImage } from './files';

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

export interface DrinkToCreate {
  name: string;
  description: string;
  additional: string;
  price: number;
  volume: number;
  alcoholic: boolean;
  picture: File | string | null;
}

export interface DrinkSearchParams {
  name?: string;
  description?: string;
  additional?: string;
  alcoholic?: string;
  greaterThanOrEqualToPrice?: number;
  lessThanOrEqualToPrice?: number;
  greaterThanOrEqualToVolume?: number;
  lessThanOrEqualToVolume?: number;
  page?: number;
  size?: number;
  sort?: string;
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

export async function getTopDrinks(size = 10) {
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

export async function getLatestDrinks(size = 10) {
  const { data } = await httpClient.get<Pagination<Drink>>(
    `/drinks?size=${size}&page=0&sort=createdAt,desc`,
  );

  return data.content;
}

export async function getHotAndNewDrinks() {
  const latestDrinks = await getLatestDrinks();
  const topDrinksRaw = await getTopDrinks();

  const topDrinks = topDrinksRaw.map(({ drinkUUID }) => ({
    uuid: drinkUUID,
  }));

  return { latestDrinks, topDrinks };
}

export async function searchDrink(params: DrinkSearchParams) {
  const searchParams = qs.stringify(params, {
    skipEmptyString: true,
    skipNull: true,
  });

  const { data } = await httpClient.get<Pagination<Drink>>(
    `/drinks/search?${searchParams}`,
  );

  return data;
}

export async function drinkUploadImage(drink: DrinkToCreate) {
  const { picture } = drink;

  if (picture && picture instanceof File) {
    const image = await uploadDrinkImage(picture);
    return { ...drink, picture: image };
  }

  return drink;
}

export async function createDrink(drinkToCreate: DrinkToCreate) {
  const drink = await drinkUploadImage(drinkToCreate);

  const { data } = await httpClient.post<Drink>('/drinks/barmen', drink);

  return data;
}
