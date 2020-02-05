import { ApiResponse } from 'apisauce';

export type GeneralApiProblem =
  /**
   * Times up.
   */
  | { kind: 'timeout'; temporary: true }
  /**
   * Cannot connect to the server for some reason.
   */
  | { kind: 'cannot-connect'; temporary: true }
  /**
   * The server experienced a problem. Any 5xx error.
   */
  | { kind: 'server'; error: {} }
  /**
   * We're not allowed because we haven't identified ourself. This is 401.
   */
  | { kind: 'unauthorized' }
  /**
   * We don't have access to perform that request. This is 403.
   */
  | { kind: 'forbidden' }
  /**
   * Unable to find that resource.  This is a 404.
   */
  | { kind: 'not-found' }
  /**
   * All other 4xx series errors.
   */
  | { kind: 'rejected'; error: {} }
  /**
   * Something truly unexpected happened. Most likely can try again. This is a catch all.
   */
  | { kind: 'unknown'; temporary: true }
  /**
   * The data we received is not in the expected format.
   */
  | { kind: 'bad-data' }
  /**
   * Request has been cancelled
   */
  | { kind: 'cancelled' };

/**
 * Attempts to get a common cause of problems from an api response.
 *
 * @param response The api response.
 */
export function getGeneralApiProblem(response: ApiResponse<any>): GeneralApiProblem | void {
  switch (response.problem) {
    case 'CONNECTION_ERROR':
      return { kind: 'cannot-connect', temporary: true };
    case 'NETWORK_ERROR':
      return { kind: 'cannot-connect', temporary: true };
    case 'TIMEOUT_ERROR':
      return { kind: 'timeout', temporary: true };
    case 'SERVER_ERROR':
      return { kind: 'server', error: response.data };
    case 'UNKNOWN_ERROR':
      return { kind: 'unknown', temporary: true };
    case 'CLIENT_ERROR':
      switch (response.status) {
        case 401:
          return { kind: 'unauthorized' };
        case 403:
          return { kind: 'forbidden' };
        default:
          return { kind: 'rejected', error: response.data };
      }
    case 'CANCEL_ERROR':
      return;
    default:
      return;
  }
}

export interface ApiConfig {
  /**
   * The Base URL of the api.
   */
  baseUrl?: string;
  timeout?: number;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  baseUrl: process.env.REACT_APP_API_URL,
};
