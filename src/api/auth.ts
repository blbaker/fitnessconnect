import { ApiResponse } from 'apisauce';
import { decamelizeKeys, camelizeKeys } from 'humps';

import { Api } from './api';
import {
  GetLoginUrlResult,
  GetLoginUrlResponse,
  getGeneralApiProblem,
  LoginResult,
  LoginResponse,
} from '../models';

/**
 * Manages all requests to the Auth API.
 */
export class AuthApi extends Api {
  /**
   * Login user with Email
   */
  async loginWithEmail(email: string, password: string): Promise<LoginResult> {
    const data = decamelizeKeys({ username: email, password });

    // make the api call
    const response: ApiResponse<LoginResponse> = camelizeKeys(
      await Api.apisauce.post(`/auth/signin/`, data),
    ) as any;

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

  async getLoginUrl(origin: string, identityProvider?: string): Promise<GetLoginUrlResult> {
    let url = `/auth/login?redirect_url=${origin}/auth/token&redirect=false`;
    if (identityProvider) {
      url = url + `&identity_provider=${identityProvider}`;
    }

    // make the api call
    const response: ApiResponse<GetLoginUrlResponse> = camelizeKeys(await Api.apisauce.get(url));

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

  async getLogoutUrl(origin: string): Promise<GetLoginUrlResult> {
    // make the api call
    const response: ApiResponse<GetLoginUrlResponse> = camelizeKeys(
      await Api.apisauce.get(`/auth/logout?logout_uri=${origin}/auth/logout&redirect=false`),
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
