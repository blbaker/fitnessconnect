import { types, getEnv, getRoot, flow, applySnapshot } from 'mobx-state-tree';

import { GetTotalStepsResult } from '../models';
import { RequestStatusModel, RequestStatus } from '../libs/helpers';
import { Environment } from '../core/environment';
import { RootStore } from './store.types';

export const MetadataStoreModel = types
  .model({
    /**
     * The status of the API request
     */
    status: RequestStatusModel,
    allTotalSteps: types.maybe(types.number),
  })
  .views((self) => ({
    get environment() {
      return getEnv(self) as Environment;
    },
    get rootStore(): RootStore {
      return getRoot(self);
    },
    get totalSteps() {
      return self.allTotalSteps;
    },
  }))
  .actions((self) => ({
    setStatus(value: RequestStatus) {
      self.status = value;
    },
  }))
  .actions((self) => ({
    getTotalSteps: flow(function* () {
      self.setStatus(RequestStatus.PENDING);
      try {
        const response: GetTotalStepsResult = yield self.environment.metadataApi.getTotalSteps();
        if (response.kind === 'ok') {
          self.allTotalSteps = response.data;
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
