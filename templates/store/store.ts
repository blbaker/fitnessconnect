import { types, getEnv, getRoot } from 'mobx-state-tree';

export const TemplateNameModel = types
  .model('TemplateName')
  .props({})
  .views((self) => ({
    get environment() {
      return getEnv(self);
    },
    get rootStore() {
      return getRoot(self);
    },
  }))
  .actions((self) => ({}));
