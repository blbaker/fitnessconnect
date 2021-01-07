import { GeneralApiProblem } from './api';
import { JwtToken } from './service';

export interface UserProfile {
  user_email: string;
  user_first_name: string;
  stripe_customer_id?: string;
}

export interface User {
  id: string;
  user_first_name: string;
  lastName: string;
  user_email: string;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
  termsAndConditions: TermsAndCondition[];
  stripe_customer_id?: string;
}

export interface TermsAndCondition {
  version: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SaveUserProfileResponse = JwtToken | null;
export type SaveUserProfileResult =
  | { kind: 'ok'; data: SaveUserProfileResponse }
  | GeneralApiProblem;

export type SaveTermsAndConditionsResponse = TermsAndCondition[];
export type SaveTermsAndConditionsResult =
  | { kind: 'ok'; data: SaveTermsAndConditionsResponse }
  | GeneralApiProblem;

export type GetMeResponse = User;
export type GetMeResult = { kind: 'ok'; data: GetMeResponse } | GeneralApiProblem;
