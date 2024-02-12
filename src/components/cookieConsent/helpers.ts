const cookieConsent = "caravarvelCookieConsent";

export const hasCookieConsent = () => {
  if (
    document.cookie.split("; ").find(row => row.startsWith(`${cookieConsent}`))
  )
    return true;
};

const buildCookie = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 30);
  const expirationDate = currentDate.toUTCString();

  return `${cookieConsent}=true;expires=${expirationDate};samesite=Strict;Secure;path=/`;
};

export const setCookieConsent = () => {
  document.cookie = buildCookie();
};
