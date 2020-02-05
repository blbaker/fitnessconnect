import { types } from 'mobx-state-tree';

export enum RequestStatus {
  IDLE = 'IDLE',
  PENDING = 'PENDING',
  DONE = 'DONE',
  ERROR = 'ERROR',
}

export const RequestStatusModel = types.optional(
  types.enumeration([
    RequestStatus.IDLE,
    RequestStatus.PENDING,
    RequestStatus.DONE,
    RequestStatus.ERROR,
  ]),
  RequestStatus.IDLE,
);
