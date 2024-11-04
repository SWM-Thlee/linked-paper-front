import { atomWithStorage } from "jotai/utils";
import { RegisteredFilters } from "../types/registered-filter";

function isStorageUnsupported() {
  return (
    typeof window === "undefined" ||
    typeof window.addEventListener === "undefined"
  );
}

const parse = RegisteredFilters.safeParse;

export const STORAGE_KEY = "LINKED_PAPER_FILTER_STORAGE";

export const filterAtom = atomWithStorage<RegisteredFilters>(STORAGE_KEY, [], {
  getItem(key, initialValue) {
    if (isStorageUnsupported()) {
      return initialValue;
    }

    const valueInLocalStorage = parse(localStorage.getItem(key));
    const valueInSessionStorage = parse(sessionStorage.getItem(key));

    return [
      ...(valueInLocalStorage.data ?? []),
      ...(valueInSessionStorage.data ?? []),
    ];
  },

  setItem(key, value) {
    if (isStorageUnsupported()) {
      return;
    }

    const validatedValue = parse(value);

    if (!validatedValue.success) {
      throw new Error("Error from Updating Filter: Invalid filter value.");
    }

    const valueToLocalStorage = validatedValue.data.filter(
      (filter) => filter.persist,
    );
    const valueToSessionStorage = validatedValue.data.filter(
      (filter) => !filter.persist,
    );

    localStorage.setItem(key, JSON.stringify(valueToLocalStorage));
    sessionStorage.setItem(key, JSON.stringify(valueToSessionStorage));
  },

  removeItem(key) {
    if (isStorageUnsupported()) {
      return;
    }

    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },

  // Storage로부터 변경이 일어난 경우
  subscribe(key, callback, initialValue) {
    if (isStorageUnsupported()) {
      return () => {};
    }

    const listener = (event: StorageEvent) => {
      if (
        (event.storageArea === localStorage ||
          event.storageArea === sessionStorage) &&
        event.key === key
      ) {
        const value = parse(JSON.parse(event.newValue ?? ""));
        callback(value.data ?? initialValue);
      }
    };

    window.addEventListener("storage", listener);

    return () => window.removeEventListener("storage", listener);
  },
});
