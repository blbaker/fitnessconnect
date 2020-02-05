import { GeneralApiProblem } from './api';

export interface UserProfile {
  birthdate: string;
  createdAt?: string;
  email: string;
  firstName: string;
  gender: string;
  height: number;
  id?: string;
  lastName: string;
  location: string;
  updatedAt?: string;
  username: string;
  watchedTutorials: number;
  weight: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  profile: UserProfile;
  termsAndConditions: TermsAndCondition[];
}

export interface TermsAndCondition {
  version: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SaveUserProfileResponse = UserProfile | null;
export type SaveUserProfileResult =
  | { kind: 'ok'; data: SaveUserProfileResponse }
  | GeneralApiProblem;

export type SaveTermsAndConditionsResponse = TermsAndCondition[];
export type SaveTermsAndConditionsResult =
  | { kind: 'ok'; data: SaveTermsAndConditionsResponse }
  | GeneralApiProblem;

export type GetMeResponse = User;
export type GetMeResult = { kind: 'ok'; data: GetMeResponse } | GeneralApiProblem;
