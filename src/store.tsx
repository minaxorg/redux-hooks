import React, { createContext, useReducer } from 'react'

import createActions from './createActions'

const StoreContext: React.Context<{ state: any, actions: any }> = createContext(undefined) as any

const injectLoadingInStore = (store: any) => {
  return {
    ...store,
    loading: {
      global: false,
      effects: {}
    }
  }
}

class ReducerWithLoading {
  reducer: any
  static instance: any
  constructor (reducer: any) {
    this.reducer = reducer
  }
  getInstance () {
    if (!ReducerWithLoading.instance) {
      ReducerWithLoading.instance = (state: any, action: any) => {
        switch (action.type) {
          case '@@loading/start':
            return {
              ...state,
              loading: {
                global: true,
                effects: {
                  ...state.loading.effects,
                  [action.payload]: true
                }
              }
            }
          case '@@loading/end':
            const effectsStatus = {
              ...state.loading.effects,
              [action.payload]: false
            }
            // 所有的key都为false
            const allFalse = Object.keys(effectsStatus).every(key => !effectsStatus[key])
            return {
              ...state,
              loading: {
                global: !allFalse,
                effects: effectsStatus
              }
            }
          default:
            return this.reducer(state, action)
        }
      }
    }
    return ReducerWithLoading.instance
  }
}

export interface State { [key: string]: any }
export interface Action { error?: boolean; type: string; payload?: any }

const Provider = (
  props: {
    reducer: (
      state: any,
      action: Action
    ) => State;
    actions: any;
    store: State;
    children: any;
    additions?: string[]
  }
): React.ComponentElement<any, any> => {
  const haveLoading = props.additions && props.additions.find(i => i === 'loading')

  const store = useReducer(
    haveLoading ? new ReducerWithLoading(props.reducer).getInstance() : props.reducer,
    haveLoading ? injectLoadingInStore(props.store) : props.store
  )
  return (
    <StoreContext.Provider
      value={{
        actions: createActions(props.actions, store[1], props.additions),
        state: store[0]
      }}
    >
      {props.children}
    </StoreContext.Provider>
  )
}

const connect = (Cpt: any) => {
  return class T extends React.Component {
    render () {
      return (
        <StoreContext.Consumer>
          {(v) => <Cpt {...v} {...this.props} />}
        </StoreContext.Consumer>
      )
    }
  }
}

export {
  connect,
  Provider,
  StoreContext
}
