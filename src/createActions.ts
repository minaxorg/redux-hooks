function isPromise (obj: any) {
  return (
    !!obj &&
    (typeof obj === 'object' || typeof obj === 'function') &&
    typeof obj.then === 'function'
  )
}

export default (actions: any, dispatch: any) => {
  const res: any = {}
  Object.keys(actions).map((key) => {
    res[key] = (...args: any) => {
      const val = actions[key](...args)
      if (isPromise(val)) {
        return new Promise((resolve) => {
          val.then((v: any) => {
            dispatch({
              payload: v,
              type: key
            })
            resolve(v)
          })
        })
      } else {
        dispatch({
          payload: val,
          type: key
        })
        return val
      }
    }
  })
  return res
}
