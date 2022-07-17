import { useQuery } from 'react-query';
import { getHotAndNewDrinks } from '$services/api/drinks';

export function useDrinksStatus(uuid: string) {
  function existsDrinkWithUUID(drinks?: Array<{ uuid: string }>) {
    return drinks?.some((drink) => drink.uuid === uuid) || false;
  }

  const { data } = useQuery('drinks-status', getHotAndNewDrinks, {
    staleTime: Infinity,
  });

  return {
    isNew: existsDrinkWithUUID(data?.latestDrinks),
    isHot: existsDrinkWithUUID(data?.topDrinks),
  };
}
