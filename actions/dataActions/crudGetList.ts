import { Record, PaginationPayload, SortPayload } from '../../core/types';
import { GET_LIST } from '../../core';
import { FETCH_END, FETCH_ERROR } from '../fetchActions';
import { NotificationSideEffect } from '../../sideEffect';

export const crudGetList = (
  resource: string,
  pagination: PaginationPayload,
  sort: SortPayload,
  filter: object
): CrudGetListAction => ({
  type: CRUD_GET_LIST,
  payload: { pagination, sort, filter },
  meta: {
    resource,
    fetch: GET_LIST,
    onFailure: {
      notification: {
        body: 'notification.http_error',
        level: 'warning',
      },
    },
  },
});

interface RequestPayload {
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: object;
}

export const CRUD_GET_LIST = 'CRUD_GET_LIST';
export interface CrudGetListAction {
  readonly type: typeof CRUD_GET_LIST;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
    fetch: typeof GET_LIST;
    onFailure: {
      notification: NotificationSideEffect;
    };
  };
}

export const CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
export interface CrudGetListLoadingAction {
  readonly type: typeof CRUD_GET_LIST_LOADING;
  readonly payload: RequestPayload;
  readonly meta: {
    resource: string;
  };
}

export const CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';
export interface CrudGetListFailureAction {
  readonly type: typeof CRUD_GET_LIST_FAILURE;
  readonly error: string | object;
  readonly payload: string;
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    notification: NotificationSideEffect;
    fetchResponse: typeof GET_LIST;
    fetchStatus: typeof FETCH_ERROR;
  };
}

export const CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';
export interface CrudGetListSuccessAction {
  readonly type: typeof CRUD_GET_LIST_SUCCESS;
  readonly payload: {
    data: Record[];
    total: number;
  };
  readonly requestPayload: RequestPayload;
  readonly meta: {
    resource: string;
    fetchResponse: typeof GET_LIST;
    fetchStatus: typeof FETCH_END;
  };
}
