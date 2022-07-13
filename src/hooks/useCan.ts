import { useAuth } from '$contexts/AuthContext';
import { validateUserPermisssions } from '$utils/validateUserPermissions';

interface UseCanParams {
  roles?: string[];
}

export function useCan({ roles }: UseCanParams) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return false;
  }

  return validateUserPermisssions({ user: user!, roles });
}
