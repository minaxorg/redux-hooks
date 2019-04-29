import React, { createContext, useReducer } from 'react'

import createActions from './createActions'

const StoreContext: React.Context<{ state: any, actions: any }> = createContext(undefined) as any

const Provider = (
  props: { reducer: any; actions: any; store: any; children: any; }
): React.ComponentElement<any, any> => {
  const store = useReducer(props.reducer, props.store)
  return (
    <StoreContext.Provider
      value={{
        actions: createActions(props.actions, store[1]),
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
