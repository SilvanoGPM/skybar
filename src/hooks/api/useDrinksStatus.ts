import { useQuery } from 'react-query';
import { getLatestDrinks, getTopDrinks } from '$services/api/drinks';

export function useDrinksStatus(uuid: string) {
  function existsDrinkWithUUID(drinks?: Array<{ uuid: string }>) {
    return drinks?.some((drink) => drink.uuid === uuid) || false;
  }

  const { data } = useQuery(
    'drinks-status',
    async () => {
      const latestDrinks = await getLatestDrinks();
      const topDrinksRaw = await getTopDrinks();

      const topDrinks = topDrinksRaw.map(({ drinkUUID }) => ({
        uuid: drinkUUID,
      }));

      return { latestDrinks, topDrinks };
    },
    { staleTime: Infinity },
  );

  return {
    isNew: existsDrinkWithUUID(data?.latestDrinks),
    isHot: existsDrinkWithUUID(data?.topDrinks),
  };
}
