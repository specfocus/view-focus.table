import { Identifier, Record } from '../../core/types';
import { UPDATE } from '../../core';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
import {
  NotificationSideEffect,
  RedirectionSideEffect,
  RefreshSideEffect,
} from '../../sideEffect';

export const crudUpdate = (
  resource: string,
  id: Identifier,
  data: any,
  previousData: any,
  basePath: string,
  redirectTo: RedirectionSideEffect = 'show',
  refresh: RefreshSideEffect = true
): CrudUpdateAction => ({
  type: CRUD_UPDATE,
  payload: { id, data, previousData },
  meta: {
    resource,
    fetch: UPDATE,
    onSuccess: {
      notification: {
        body: 'notification.updated',
        level: 'info',
        messageArgs: {
          smart_count: 1,
        },
      },
      refresh,
      redirectTo,
      basePath,
    },
    onFailure: {
      notification: {
        body: 'notification.http_error',
        level: 'warning',
      },
    },
  },
});

interface RequestPayload {
  id: Identifier;
  data: any;
  previousData?: any;
}

export const CRUD_UPDATE = 'CRUD_UPDATE';
export interface CrudUpdateAction {
  readonly type: typeof CRUD_UPDATE;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
    fetch: typeof UPDATE;
    onSuccess: {
      notification: NotificationSideEffect;
      redirectTo: RedirectionSideEffect;
      refresh: RefreshSideEffect;
      basePath: string;
    };
    onFailure: {
      notification: NotificationSideEffect;
    };
  };
}

export const CRUD_UPDATE_LOADING = 'CRUD_UPDATE_LOADING';
export interface CrudUpdateLoadingAction {
  readonly type: typeof CRUD_UPDATE_LOADING;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
  };
}

export const CRUD_UPDATE_FAILURE = 'CRUD_UPDATE_FAILURE';
export interface CrudUpdateFailureAction {
  readonly type: typeof CRUD_UPDATE_FAILURE;
  readonly error: string | object;
  readonly payload: string;
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    notification: NotificationSideEffect;
    fetchResponse: typeof UPDATE;
    fetchStatus: typeof FETCH_ERROR;
  };
}

export const CRUD_UPDATE_SUCCESS = 'CRUD_UPDATE_SUCCESS';
export interface CrudUpdateSuccessAction {
  readonly type: typeof CRUD_UPDATE_SUCCESS;
  readonly payload: {
    data: Record;
  };
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    notification: NotificationSideEffect;
    redirectTo: RedirectionSideEffect;
    refresh: RefreshSideEffect;
    basePath: string;
    fetchResponse: typeof UPDATE;
    fetchStatus: typeof FETCH_END;
  };
}
