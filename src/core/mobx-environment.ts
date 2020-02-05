import { Api, AuthApi, UserApi, ConfigApi } from '../api';

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class MobxEnvironment {
  /**
   * Our apis
   */
  api: Api;
  authApi: AuthApi;
  userApi: UserApi;
  configApi: ConfigApi;
}
