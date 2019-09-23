type Func<T> = (...args: any[]) => T
type Tuple<T> = [Error | null, T | null]

export const eorf = <T>(func: Func<T>, ...args: any[]): Tuple<T> => {
  try {
    const data: T = func(...args)
    return [null, data]
  } catch (err) {
    return [err, null]
  }
}

export const eorp = async <T>(promise: Promise<T>): Promise<Tuple<T>> => {
  try {
    const data: T = await promise
    return [null, data]
  } catch (err) {
    return [err, null]
  }
}
