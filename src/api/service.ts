import { ApiResponse } from 'apisauce';
import { camelizeKeys } from 'humps';

import { Api } from './api';

import {
  ServiceLoginResult,
  ServiceLoginResponse,
  getGeneralApiProblem,
  GetAuthorizationUrlResult,
} from '../models';

/**
 * Manages all requests to the different Service APIs.
 */
export class ServiceApi extends Api {
  /**
   * Get total steps
   */
  async login(service: string, code: string): Promise<ServiceLoginResult> {
    // make the api call
    const response: ApiResponse<ServiceLoginResponse> = camelizeKeys(
      await Api.apisauce.post(`/${service}/login`, { code }),
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }

  /**
   * Get service authorization URL
   */
  async getAuthorizationUrl(service: string): Promise<GetAuthorizationUrlResult> {
    // make the api call
    const response: ApiResponse<ServiceLoginResponse> = camelizeKeys(
      await Api.apisauce.get(`/${service}/authorizationUrl`),
    );

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response);
      if (problem) return problem;
    }

    // transform the data into the format we are expecting
    try {
      return { kind: 'ok', data: response.data };
    } catch {
      return { kind: 'bad-data' };
    }
  }
}
