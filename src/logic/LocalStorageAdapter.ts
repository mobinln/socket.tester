export default class LocalStorageAdapter {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  get value() {
    return localStorage.getItem(this.key);
  }

  set value(newValue: string | null | undefined) {
    if (newValue) {
      localStorage.setItem(this.key, newValue);
    } else {
      localStorage.removeItem(this.key);
    }
  }
}
