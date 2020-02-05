import { GeneralApiProblem } from './api';

export interface ConfigModel {
  language: string;
  environment: EnvironmentModel;
  availableSiteConfigs: any;
  translations: any;
}

export interface SiteConfigModel {
  app_features?: any; // associative array of features
  assetBaseUrl?: string;
  basePath?: string;
  country?: string;
  defaultPreferredLanguage?: string;
  ga?: string;
  id?: string;
  languages?: any; // associate array of languages
  translationsUrl?: string;
}

export interface EnvironmentModel {
  content_id?: string;
  default_sbu?: string;
  scripts?: string[];
  site_config?: EnvironmentSiteConfigModel;
}

export interface EnvironmentSiteConfigModel {
  languages?: string;
}

export interface Translations {
  [key: string]: string;
}

export type GetTranslationsResponse = Translations;
export type GetTranslationsResult = { kind: 'ok'; data: Translations } | GeneralApiProblem;

export type GetSiteConfigResponse = SiteConfigModel;
export type GetSiteConfigResult = { kind: 'ok'; data: GetSiteConfigResponse } | GeneralApiProblem;

export type GetEnvironmentResponse = EnvironmentModel;
export type GetEnvironmentResult = { kind: 'ok'; data: GetEnvironmentResponse } | GeneralApiProblem;
