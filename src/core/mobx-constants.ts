import { RootStore } from '../core/stores/store.types';

/**
 * The key we'll be saving our state within local storage.
 */
export const ROOT_STATE_STORAGE_KEY = 'root';
export const ACCESS_TOKEN_KEY = 'accessToken';

/**
 * When the user isn't authorized, we need to clear the stores and navigate to a safe page
 */
export function cleanUpWhenUnauthorized(response: any, rootStore: RootStore) {
  if (response.status === 401) {
    // Reset store
    rootStore.reset();
  }
}
