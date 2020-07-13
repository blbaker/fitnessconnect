import { GeneralApiProblem } from './api';

export type GetTotalStepsResponse = number;
export type GetTotalStepsResult = { kind: 'ok'; data: number } | GeneralApiProblem;
