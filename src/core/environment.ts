import { Api, AuthApi, UserApi, ConfigApi, MetadataApi } from '../api';

/**
 * The environment is a place where services and shared dependencies between
 * models live.  They are made available to every model via dependency injection.
 */
export class Environment {
  /**
   * Our apis
   */
  api: Api;
  authApi: AuthApi;
  userApi: UserApi;
  configApi: ConfigApi;
  metadataApi: MetadataApi;
}
