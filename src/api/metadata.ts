import { ApiResponse } from 'apisauce';
import { camelizeKeys } from 'humps';

import { Api } from './api';

import { GetTotalStepsResult, GetTotalStepsResponse, getGeneralApiProblem } from '../models';

/**
 * Manages all requests to the Metadata API.
 */
export class MetadataApi extends Api {
  /**
   * Get total steps
   */
  async getTotalSteps(): Promise<GetTotalStepsResult> {
    // make the api call
    const response: ApiResponse<GetTotalStepsResponse> = camelizeKeys(
      await Api.apisauce.get('/metadata/totalSteps'),
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
