import createReducerKey from './createReducerKey'
import { connect, Provider, StoreContext } from './store'

/**
 * <T> interface of Store
 * <N> interface of Actions
 */
export interface ReduxComponentProps<T = {}, N = {}> {
  state: T
  actions: N
}

export {
  createReducerKey,
  connect,
  Provider,
  StoreContext
}
