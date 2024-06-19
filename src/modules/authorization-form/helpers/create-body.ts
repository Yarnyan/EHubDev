export const createBody = (email: string, login: string, password: string, userType?: boolean) => {
  const commonBody = 'Email=' + encodeURIComponent(email) +
  '&Password=' + encodeURIComponent(password) +
  '&Login=' + encodeURIComponent(login)
  if (userType === undefined) {
    return commonBody
  }
  return commonBody + '&userType=' + encodeURIComponent(userType ? 1 : 0)
}