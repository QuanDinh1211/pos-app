export const hasPermission = (
  userPermissions: string[],
  permission: string,
) => {
  return userPermissions.includes(permission);
};
