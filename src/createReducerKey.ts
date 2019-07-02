const createReducerKey = <T>(p: T): { [key in keyof T]: key } => {
  const res: any = {}
  Object.keys(p).forEach((key: string) => {
    res[key] = key
  })
  return res
}

export default createReducerKey