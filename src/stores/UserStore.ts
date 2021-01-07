import { types, getEnv, flow, applySnapshot } from 'mobx-state-tree';
import jwt_decode from 'jwt-decode';

import { RequestStatusModel, RequestStatus } from '../libs/helpers';
import { Environment } from '../core/environment';
import { GetMeResult, JwtToken, SaveUserProfileResult, UserProfile } from '../models';

export enum SignUpStatus {
  NEEDS_FITBIT = 'NEEDS_FITBIT',
  NEEDS_FIT = 'NEEDS_FIT',
  NEEDS_PROFILE = 'NEEDS_PROFILE',
  COMPLETED = 'COMPLETED',
}

export const UserStoreModel = types
  .model('UserStore')
  .props({
    /**
     * The status of the API request
     */
    status: RequestStatusModel,
    user_first_name: types.optional(types.string, ''),
    user_email: types.optional(types.string, ''),
    fitbit_id: types.string,
    steps_synced: types.number,
    last_synced: types.number,
    last_run: types.number,
    paused: types.optional(types.string, 'false'),
    fitbit_needs_reconnecting: types.optional(types.string, 'false'),
    fit_needs_reconnecting: types.optional(types.string, 'false'),
    user_account_status: types.string,
    stripe_customer_id: types.optional(types.string, ''),
    user_timezone: types.optional(types.string, ''),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get getUser() {
      return self;
    },
    get signUpStatus() {
      console.log(self.user_email, self.user_first_name);
      if (self.fitbit_needs_reconnecting === 'true' || !self.fitbit_id) {
        return SignUpStatus.NEEDS_FITBIT;
      } else if (self.fit_needs_reconnecting === 'true') {
        return SignUpStatus.NEEDS_FIT;
      } else if (!self.user_email || !self.user_first_name) {
        return SignUpStatus.NEEDS_PROFILE;
      }
      return SignUpStatus.COMPLETED;
    },
    get timezone() {
      return self.user_timezone;
    },
  }))
  .actions((self) => ({
    setStatus(value: RequestStatus) {
      self.status = value;
    },
  }))
  .actions((self) => ({
    setUser(jwtToken: JwtToken) {
      const user = jwt_decode(jwtToken);
      applySnapshot(self, user);
    },
  }))
  .actions((self) => ({
    updateUserProfile: flow(function* (user: UserProfile) {
      try {
        const response: SaveUserProfileResult = yield self.environment.userApi.updateUserProfile(
          user,
        );
        if (response.kind === 'ok') {
          self.setUser(response.data);
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
    updateUser: flow(function* () {
      try {
        const response: GetMeResult = yield self.environment.userApi.getMe();
        if (response.kind === 'ok') {
          applySnapshot(self, { ...self, ...response.data });
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
  }));

type UserStoreType = typeof UserStoreModel.Type;
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = typeof UserStoreModel.SnapshotType;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
