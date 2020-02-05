import { GeneralApiProblem } from './api';

export enum SignUpError {
  UsernameExistsException = 'SIGNUP_SIGNUP-FORM_USER-EXISTS',
  InvalidPasswordException = 'SIGNUP_SIGNUP-FORM_INVALID-PASSWORD',
}

export enum ConfirmSignupError {
  UserNotFoundException = 'CONFIRM-SIGNUP_CONFIRM-SIGNUP-FORM_USER-NOT-FOUND',
  NotAuthorizedException = 'CONFIRM-SIGNUP_CONFIRM-SIGNUP-FORM_INCORRECT-CONFIRMATION-CODE',
}

export enum SignInError {
  NotAuthorizedException = 'SIGNIN_SIGNIN-FORM_INCORRECT-USERNAME-OR-PASSWORD',
  UserNotFoundException = 'SIGNIN_SIGNIN-FORM_INCORRECT-USERNAME-OR-PASSWORD',
}

export interface AuthModel {
  idToken?: string;
  refreshToken?: string;
}

export interface Login {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  refreshToken: string;
  idToken: string;
  code: string;
}

export type LoginResponse = Login;
export type LoginResult = { kind: 'ok'; data: LoginResponse } | GeneralApiProblem;

export type GetLoginUrlResponse = string;
export type GetLoginUrlResult = { kind: 'ok'; data: GetLoginUrlResponse } | GeneralApiProblem;
