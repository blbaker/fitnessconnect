import { GeneralApiProblem } from './api';

export type JwtToken = string;
export type AuthorizationUrl = string;

export type ServiceLoginResponse = JwtToken;
export type ServiceLoginResult = { kind: 'ok'; data: JwtToken } | GeneralApiProblem;

export type GetAuthorizationUrlResponse = AuthorizationUrl;
export type GetAuthorizationUrlResult = { kind: 'ok'; data: AuthorizationUrl } | GeneralApiProblem;
