export default function createReducerKey<T> (p: T): { [key in keyof T]: key } {
  const res: any = {}
  Object.keys(p).map((key: string) => {
    res[key] = key
  })
  return res
}
