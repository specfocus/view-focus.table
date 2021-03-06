import { Record } from '../../core/types';
import { CREATE } from '../../core';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
import {
  NotificationSideEffect,
  RedirectionSideEffect,
} from '../../sideEffect';

export const crudCreate = (
  resource: string,
  data: any,
  basePath: string,
  redirectTo: RedirectionSideEffect = 'edit'
): CrudCreateAction => ({
  type: CRUD_CREATE,
  payload: { data },
  meta: {
    resource,
    fetch: CREATE,
    onSuccess: {
      notification: {
        body: 'notification.created',
        level: 'info',
        messageArgs: {
          smart_count: 1,
        },
      },
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
  data: any;
}

export const CRUD_CREATE = 'CRUD_CREATE';
export interface CrudCreateAction {
  readonly type: typeof CRUD_CREATE;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
    fetch: typeof CREATE;
    onSuccess: {
      notification: NotificationSideEffect;
      redirectTo: RedirectionSideEffect;
      basePath: string;
    };
    onFailure: {
      notification: NotificationSideEffect;
    };
  };
}

export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export interface CrudCreateLoadingAction {
  readonly type: typeof CRUD_CREATE_LOADING;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
  };
}

export const CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';
export interface CrudCreateFailureAction {
  readonly type: typeof CRUD_CREATE_FAILURE;
  readonly error: string | object;
  readonly payload: string;
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    notification: NotificationSideEffect;
    fetchResponse: typeof CREATE;
    fetchStatus: typeof FETCH_ERROR;
  };
}

export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';
export interface CrudCreateSuccessAction {
  readonly type: typeof CRUD_CREATE_SUCCESS;
  readonly payload: {
    data: Record;
  };
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    notification: NotificationSideEffect;
    redirectTo: RedirectionSideEffect;
    basePath: string;
    fetchResponse: typeof CREATE;
    fetchStatus: typeof FETCH_END;
  };
}
