import { ApisauceInstance, create, ApisauceConfig, ResponseTransform } from 'apisauce';
import { isNull, isUndefined } from 'underscore';

import { ApiConfig, DEFAULT_API_CONFIG } from '../models';
/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  static apisauce: ApisauceInstance;

  /**
   * Sets up the API.  This will be called during the boot up
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup(accessToken: string | null = null, config: ApiConfig = DEFAULT_API_CONFIG) {
    // construct the apisauce instance
    const apiConfig: ApisauceConfig = {
      baseURL: config.baseUrl,
      headers: {
        Accept: 'application/json',
      },
    };

    if (!isNull(accessToken) && !isUndefined(accessToken)) {
      apiConfig.headers.Authorization = `Bearer ${accessToken}`;
    }

    Api.apisauce = create(apiConfig);
  }

  destroy() {
    if (Api.apisauce) {
      Api.apisauce.deleteHeader('Authorization');
    }
  }

  addResponseTransform(transformation: ResponseTransform) {
    Api.apisauce.addResponseTransform(response => {
      transformation(response);
    });
  }
}
