import { Api, AuthApi, UserApi, ConfigApi, MetadataApi, ServiceApi, StripeApi } from '../api';

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
  configApi: ConfigApi;
  metadataApi: MetadataApi;
  serviceApi: ServiceApi;
  userApi: UserApi;
  stripeApi: StripeApi;
}
