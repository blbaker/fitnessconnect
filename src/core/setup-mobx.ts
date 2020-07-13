import makeInspectable from 'mobx-devtools-mst';
import { onSnapshot } from 'mobx-state-tree';
import { createBrowserHistory } from 'history';

import { Api, AuthApi, UserApi, ConfigApi, MetadataApi } from '../api';
import { Environment } from './environment';
import { loadString, load, save } from '../libs/storage';
import { RootStoreModel } from '../stores/RootStore';
import { RootStore } from '../stores/store.types';
import { ROOT_STATE_STORAGE_KEY, ACCESS_TOKEN_KEY, cleanUpWhenUnauthorized } from './constants';
import { syncHistoryWithStore } from '../stores';

export type GetRootStore = () => RootStore;

/**
 * Setup the root state.
 */
export function setupRootStore(): { rootStore: RootStore; history: any } {
  let rootStore: RootStore;

  // Prepare the environment that will be associated with the RootStore.
  const mobxEnvironment = createEnvironment();

  try {
    /**
     * Hydrate state
     */
    let initialState = {};
    const stateFromStorage = load(ROOT_STATE_STORAGE_KEY);
    if (RootStoreModel.is(stateFromStorage)) {
      initialState = stateFromStorage;
    }
    rootStore = RootStoreModel.create(initialState, mobxEnvironment);
  } catch (error) {
    /**
     * If there's any problems loading, then let's at least fallback to an empty state instead of crashing.
     */
    console.error(error);
    rootStore = RootStoreModel.create({}, mobxEnvironment);
  }

  makeInspectable(rootStore);
  mobxEnvironment.api.addResponseTransform((response) =>
    cleanUpWhenUnauthorized(response, rootStore),
  );

  // track changes & save to storage
  onSnapshot(rootStore, (snapshot) => save(ROOT_STATE_STORAGE_KEY, snapshot));

  // Hook up router model to browser history object
  const history = syncHistoryWithStore(createBrowserHistory(), rootStore.navigationStore);

  return { rootStore, history };
}

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
function createEnvironment() {
  const environment = new Environment();

  // Create each API service
  environment.api = new Api();
  environment.authApi = new AuthApi();
  environment.userApi = new UserApi();
  environment.configApi = new ConfigApi();
  environment.metadataApi = new MetadataApi();

  try {
    // Load accessToken from storage
    const accessToken = loadString(ACCESS_TOKEN_KEY) || null;

    // Allow each service to setup
    environment.api.setup(accessToken);
  } catch (error) {
    console.error(error);
  }

  return environment;
}
