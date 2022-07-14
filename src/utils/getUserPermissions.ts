export function getUserPermissions(role = 'GUEST') {
  const isGuest = role.includes('GUEST');
  const isAdmin = role.includes('ADMIN');
  const isBarmen = role.includes('BARMEN');
  const isWaiter = role.includes('WAITER');
  const isUser = role.includes('USER');
  const isStaff = isAdmin || isBarmen || isWaiter;

  return {
    isGuest,
    isAdmin,
    isBarmen,
    isWaiter,
    isStaff,
    isUser,
  };
}
