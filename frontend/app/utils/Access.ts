export function setAccess(access: string) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('userAccess', access);
  }
}

export function getAccess() {
  if (typeof window !== 'undefined') {
    return sessionStorage.getItem('userAccess');
  }
  return null;
}

export function logout() {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem('userAccess');
    sessionStorage.removeItem('userData');
  }
}

export function getUserData() {
  if (typeof window !== 'undefined') {
    const stored = sessionStorage.getItem("userData");
    if (stored) return JSON.parse(stored);
  }
  return null;
}

export function setUserData(userData: object) {
  if (typeof window !== 'undefined') {
    sessionStorage.setItem('userData', JSON.stringify(userData));
  }
}
