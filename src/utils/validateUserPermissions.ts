interface ValidateUserPermisssions {
  user: { role: string };
  roles?: string[];
}

export function validateUserPermisssions({
  user,
  roles = [],
}: ValidateUserPermisssions) {
  const userRoles = user.role.split(',');

  return roles.some((role) => userRoles.includes(role));
}
