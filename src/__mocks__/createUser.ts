import * as AuthContext from '$contexts/AuthContext';
import { User } from '$services/api/users';

interface CreateUserData
  extends Partial<Omit<AuthContext.AuthContextData, 'user'>> {
  user: Partial<User>;
}

const defaultData = { user: { role: 'USER' } };

export function createUser(data: CreateUserData = defaultData) {
  jest.spyOn(AuthContext, 'useAuth').mockImplementationOnce(() => data as any); // eslint-disable-line @typescript-eslint/no-explicit-any
}
