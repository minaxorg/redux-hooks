const isPromise = (obj: any) => {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

const createActions = (actions: any, dispatch: any, additions?: string[]) => {
  const haveLoading = additions && additions.find(i => i === 'loading')
  const res: any = {}
  Object.keys(actions).forEach((key) => {
    res[key] = (...args: any) => {
      const val = actions[key](...args)
      if (isPromise(val)) {
        return new Promise((resolve) => {
          if (haveLoading) {
            dispatch({
              type: '@@loading/start',
              payload: key
            })
          }
          val.then((v: any) => {
            dispatch({
              payload: v,
              type: key
            })
            if (haveLoading) {
              dispatch({
                type: '@@loading/end',
                payload: key
              })
            }
            resolve({ payload: v, type: key })
          }).catch((err: any) => {
            dispatch({
              payload: err,
              type: key,
              error: true
            })
            if (haveLoading) {
              dispatch({
                type: '@@loading/end',
                payload: key
              })
            }
            resolve({ payload: err, type: key, error: true })
          })
        })
      } else {
        dispatch({
          payload: val,
          type: key
        })
        return { payload: val, type: key }
      }
    }
  })
  return res
}

export default createActions
