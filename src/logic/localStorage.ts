const previousUrlKey = "previous_url";

export function getPreviousUrl() {
  return localStorage.getItem(previousUrlKey);
}

export function setPreviousUrl(v: string) {
  localStorage.setItem(previousUrlKey, v);
}

export function removePreviousUrl() {
  localStorage.removeItem(previousUrlKey);
}
