import { types, getEnv, getRoot, flow, getParent } from 'mobx-state-tree';
import { isNull, isUndefined } from 'underscore';

import { LoginResult } from '../../models';
import { RequestStatusModel, RequestStatus } from '../../libs/helpers';
import { MobxEnvironment } from '../../core/mobx-environment';
import { RootStore } from './store.types';
import { cleanUpWhenUnauthorized, ACCESS_TOKEN_KEY } from '../core/../mobx-constants';
import { saveString } from '../../libs/storage';
import { UserStore } from './UserStore';

export const AuthStoreModel = types
  .model({
    /**
     * The status of the API request
     */
    status: RequestStatusModel,
    idToken: types.maybe(types.string),
    refreshToken: types.maybe(types.string),
  })
  .views(self => ({
    get environment() {
      return getEnv(self) as MobxEnvironment;
    },
    get getUserToken() {
      return self.idToken;
    },
    get rootStore(): RootStore {
      return getRoot(self);
    },
    get isLoggedIn() {
      return !isNull(self.idToken) && !isUndefined(self.idToken);
    },
  }))
  .actions(self => ({
    setStatus(value: RequestStatus) {
      self.status = value;
    },
    updateUserToken(idToken: string) {
      // Save the idToken to localStorage so we can use it on RootStore setup
      saveString(ACCESS_TOKEN_KEY, idToken);

      // Reinitialize the API to include the idToken in each request
      self.environment.api.setup(idToken);
      self.environment.api.addResponseTransform(response =>
        cleanUpWhenUnauthorized(response, self.rootStore),
      );
      self.idToken = idToken;
    },
    getUserStore(): UserStore {
      return (getParent(self) as RootStore).userStore;
    },
  }))
  .actions(self => ({
    loginWithEmail: flow(function*(email: string, password: string) {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: LoginResult = yield self.environment.authApi.loginWithEmail(
          email,
          password,
        );
        if (response.kind === 'ok') {
          console.log(response);
          self.updateUserToken(response.data.idToken);
          self.getUserStore().updateUser();
          self.setStatus(RequestStatus.DONE);
        } else {
          self.setStatus(RequestStatus.ERROR);
          throw new Error(JSON.stringify(response));
        }
      } catch (error) {
        self.setStatus(RequestStatus.ERROR);
        throw new Error(error.message || error);
      }
    }),
    logout: () => {
      self.rootStore.reset();
    },
  }));
