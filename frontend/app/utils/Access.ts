export function setAccess(access: string) {
    sessionStorage.setItem('userAccess', access);
}

export function getAccess() {
    return sessionStorage.getItem('userAccess');
}

export function logout() {
    sessionStorage.removeItem('userAccess');
    sessionStorage.removeItem('userData');
}

export function getUserData() {
    const stored = sessionStorage.getItem("userData");
    if (stored) return JSON.parse(stored);
    return null;
}

export function setUserData(userData: object) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}