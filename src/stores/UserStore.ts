import { types, getEnv, flow, applySnapshot } from 'mobx-state-tree';
import { RequestStatusModel, RequestStatus } from '../libs/helpers';
import { Environment } from '../core/environment';
import { GetMeResult } from '../models';

const UserProfile = types.model({
  firstName: types.string,
  lastName: types.string,
  email: types.string,
  birthdate: types.string,
  height: types.number,
  weight: types.number,
  gender: types.string,
  username: types.string,
  location: types.string,
  watchedTutorials: types.number,
  createdAt: types.optional(types.string, ''),
  updatedAt: types.optional(types.string, ''),
  id: types.optional(types.string, ''),
  role: types.optional(types.string, 'admin'),
});

const TermsAndConditions = types.model({
  version: types.string,
  createdAt: types.optional(types.string, ''),
  updatedAt: types.optional(types.string, ''),
});

export const UserStoreModel = types
  .model('UserStore')
  .props({
    /**
     * The status of the API request
     */
    status: RequestStatusModel,
    idToken: types.optional(types.string, ''),
    refreshToken: types.optional(types.string, ''),
    id: types.maybeNull(types.string),
    createdAt: types.maybeNull(types.string),
    updatedAt: types.maybeNull(types.string),
    profile: types.maybeNull(UserProfile),
    termsAndConditions: types.array(TermsAndConditions),
    firstName: types.maybeNull(types.string),
    lastName: types.maybeNull(types.string),
    email: types.optional(types.string, ''),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get getUser() {
      return self;
    },
  }))
  .actions((self) => ({
    setStatus(value: RequestStatus) {
      self.status = value;
    },
  }))
  .actions((self) => ({
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
