import {
  connect,
  createReducer,
  getStoreContext,
  InjectProps,
  Provider,
  StoreContext,
} from './store'

import createReducerKey from './createReducerKey'

/**
 * <T> interface of Store
 * <N> interface of Actions
 */
export interface ReduxComponentProps<T = {}, N = {}> {
  state: T
  actions: N
}

export {
  connect,
  createReducer,
  createReducerKey,
  getStoreContext,
  InjectProps,
  Provider,
  StoreContext,
}
