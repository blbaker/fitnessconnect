import { ApiResponse } from 'apisauce';
import { Api } from './api';
import {
  getGeneralApiProblem,
  GetTranslationsResult,
  GetTranslationsResponse,
  GetSiteConfigResult,
  GetSiteConfigResponse,
  GetEnvironmentResult,
  GetEnvironmentResponse,
} from '../models';

/**
 * Manages all requests to the Config API.
 */
export class ConfigApi extends Api {
  /**
   * Get translations for language
   */
  async getTranslations(lang?: string): Promise<GetTranslationsResult> {
    const response: ApiResponse<GetTranslationsResponse> = await Api.apisauce.get(
      `/site-config/translations/`,
      {
        params: {
          content_type: 'object',
          amount: 0,
          lang: lang,
        },
      },
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
   * Get site config
   */
  async getSiteConfig(): Promise<GetSiteConfigResult> {
    const response: ApiResponse<GetSiteConfigResponse> = await Api.apisauce.get(
      `/site-config/configs/`,
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
   * Get environment config
   */
  async getEnvironmentConfig(): Promise<GetEnvironmentResult> {
    const response: ApiResponse<GetEnvironmentResponse> = await Api.apisauce.get(
      `/site-config/environment/`,
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
