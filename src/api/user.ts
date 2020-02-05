import { ApiResponse } from 'apisauce';
import { decamelizeKeys, camelizeKeys } from 'humps';

import { Api } from './api';

import {
  UserProfile,
  SaveUserProfileResponse,
  SaveUserProfileResult,
  SaveTermsAndConditionsResult,
  SaveTermsAndConditionsResponse,
  getGeneralApiProblem,
  GetMeResult,
  GetMeResponse,
  TermsAndCondition,
} from '../models';

/**
 * Manages all requests to the User API.
 */
export class UserApi extends Api {
  /**
   * Get current user
   */
  async getMe(): Promise<GetMeResult> {
    // make the api call
    const response: ApiResponse<GetMeResponse> = camelizeKeys(await Api.apisauce.get('/me'));

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
   * Save current user's profile
   */
  async saveUserProfile(userProfile: UserProfile): Promise<SaveUserProfileResult> {
    const data = decamelizeKeys(userProfile);

    // make the api call
    const response: ApiResponse<SaveUserProfileResponse> = camelizeKeys(
      await Api.apisauce.post('/me/profile', data),
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
   * Update current user's profile
   */
  async updateUserProfile(userProfile: UserProfile): Promise<SaveUserProfileResult> {
    const data = decamelizeKeys(userProfile);

    // make the api call
    const response: ApiResponse<SaveUserProfileResponse> = camelizeKeys(
      await Api.apisauce.put('/me/profile', data),
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
   * Save current user's terms and conditions agreement
   */
  async saveTermsAndConditions(
    termsAndConditions: TermsAndCondition,
  ): Promise<SaveTermsAndConditionsResult> {
    const data = decamelizeKeys(termsAndConditions);

    // make the api call
    const response: ApiResponse<SaveTermsAndConditionsResponse> = camelizeKeys(
      await Api.apisauce.put('/me/terms-and-conditions', data),
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
