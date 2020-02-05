import { types, getEnv, applySnapshot, Instance, getRoot } from 'mobx-state-tree';
import { createContext, useContext } from 'react';

import { clear } from '../../libs/storage';
import { MobxEnvironment } from '../../core/mobx-environment';
import { ROOT_STATE_STORAGE_KEY, ACCESS_TOKEN_KEY } from '../../core/mobx-constants';
import { AuthStoreModel, ConfigStoreModel, NavigationStoreModel, UserStoreModel } from './';

export const RootStoreModel = types
  .model('RootStore')
  .props({
    userStore: types.optional(UserStoreModel, {}),
    authStore: types.optional(AuthStoreModel, {}),
    configStore: types.optional(ConfigStoreModel, {}),
    navigationStore: types.optional(NavigationStoreModel, {}),
  })
  .views(self => ({
    get environment() {
      return getEnv(self) as MobxEnvironment;
    },
    get rootStore() {
      return getRoot(self);
    },
  }))
  .actions(self => ({
    reset: () => {
      clear([ACCESS_TOKEN_KEY, ROOT_STATE_STORAGE_KEY]);
      self.environment.api.destroy();
      applySnapshot(self, {});
    },
  }));

export type RootInstance = Instance<typeof RootStoreModel>;
const RootStoreContext = createContext<null | RootInstance>(null);

export const Provider = RootStoreContext.Provider;
export function useMst() {
  const store = useContext(RootStoreContext);
  if (store === null) {
    throw new Error('Store cannot be null, please add a context provider');
  }
  return store as RootInstance;
}
