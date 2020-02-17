import { types, getEnv, getRoot, flow, applySnapshot, getSnapshot } from 'mobx-state-tree';
import q from 'q';

import { RequestStatusModel, RequestStatus } from '../../libs/helpers';
import { MobxEnvironment } from '../core/../mobx-environment';
import { RootStore } from './store.types';
import { GetTranslationsResult } from '../../models';

export const ConfigStoreModel = types
  .model({
    /**
     * The status of the API request
     */
    status: RequestStatusModel,
    allTranslations: types.map(types.frozen()),
    currentLanguage: types.optional(types.string, 'en-US'),
    fallbackLanguages: types.optional(types.array(types.string), ['en-WLD']),
    enabledFeatures: types.map(types.frozen()),
  })
  .views(self => ({
    get environment() {
      return getEnv(self) as MobxEnvironment;
    },
    get rootStore(): RootStore {
      return getRoot(self);
    },
    get translations() {
      return getSnapshot(self.allTranslations);
    },
    get features() {
      return getSnapshot(self.enabledFeatures);
    },
  }))
  .actions(self => ({
    setStatus(value: RequestStatus) {
      self.status = value;
    },
    setCurrentLanguage(language: string) {
      self.currentLanguage = language;
    },
    loadTranslations: flow(function*() {
      const translations: GetTranslationsResult = yield self.environment.configApi.getTranslations();
      if (translations.kind === 'ok') {
        Object.keys(translations.data).forEach((languageKey: string) => {
          const languageTranslations = translations.data[languageKey];
          Object.keys(languageTranslations).forEach((translationKey: string) => {
            languageTranslations[translationKey] = languageTranslations[translationKey].value;
          });
        });
        return translations.data;
      } else {
        return {};
      }
    }),
    loadEnabledFeatures: flow(function*() {
      // TODO Load this from the backend
      yield new Promise((resolve, reject) => {
        setTimeout(() => {
          applySnapshot(self.enabledFeatures, {
            cyberobicsWidget: true,
            otherThirdPartyWidget: false,
          });
          resolve();
        }, 500);
      });
    }),
  }))
  .actions(self => ({
    load: flow(function*() {
      self.setStatus(RequestStatus.PENDING);
      yield q.all([self.loadTranslations(), self.loadEnabledFeatures()]).spread(translations => {
        applySnapshot(self.allTranslations, translations);
      });
      self.setStatus(RequestStatus.DONE);
    }),
  }))
  .actions(self => ({
    afterCreate: () => {
      self.load();
    },
  }));
