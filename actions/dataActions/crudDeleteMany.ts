import { Identifier, Record } from '../../core/types';
import { DELETE_MANY } from '../../core';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
import { NotificationSideEffect, RefreshSideEffect } from '../../sideEffect';

export const crudDeleteMany = (
  resource: string,
  ids: Identifier[],
  basePath: string,
  refresh: RefreshSideEffect = true
): CrudDeleteManyAction => ({
  type: CRUD_DELETE_MANY,
  payload: { ids },
  meta: {
    resource,
    fetch: DELETE_MANY,
    onSuccess: {
      notification: {
        body: 'notification.deleted',
        level: 'info',
        messageArgs: {
          smart_count: ids.length,
        },
      },
      basePath,
      refresh,
      unselectAll: true,
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
  ids: Identifier[];
}

export const CRUD_DELETE_MANY = 'CRUD_DELETE_MANY';
export interface CrudDeleteManyAction {
  readonly type: typeof CRUD_DELETE_MANY;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
    fetch: typeof DELETE_MANY;
    onSuccess: {
      notification: NotificationSideEffect;
      refresh: RefreshSideEffect;
      basePath: string;
      unselectAll: boolean;
    };
    onFailure: {
      notification: NotificationSideEffect;
    };
  };
}

export const CRUD_DELETE_MANY_LOADING = 'CRUD_DELETE_MANY_LOADING';
export interface CrudDeleteManyLoadingAction {
  readonly type: typeof CRUD_DELETE_MANY_LOADING;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
  };
}

export const CRUD_DELETE_MANY_FAILURE = 'CRUD_DELETE_MANY_FAILURE';
export interface CrudDeleteMAnyFailureAction {
  readonly type: typeof CRUD_DELETE_MANY_FAILURE;
  readonly error: string | object;
  readonly payload: string;
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    notification: NotificationSideEffect;
    fetchResponse: typeof DELETE_MANY;
    fetchStatus: typeof FETCH_ERROR;
  };
}

export const CRUD_DELETE_MANY_SUCCESS = 'CRUD_DELETE_MANY_SUCCESS';
export interface CrudDeleteManySuccessAction {
  readonly type: typeof CRUD_DELETE_MANY_SUCCESS;
  readonly payload: {
    data: Record[];
  };
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    notification: NotificationSideEffect;
    refresh: RefreshSideEffect;
    basePath: string;
    unselectAll: boolean;
    fetchResponse: typeof DELETE_MANY;
    fetchStatus: typeof FETCH_END;
  };
}
