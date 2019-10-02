type Func<T> = (...args: any[]) => T
type Tuple<T> = [null, T] | [Error, null]

export function eor<T>(f: Func<T>, ...args: any[]): Tuple<T>
export function eor<T>(p: Promise<T>): Promise<Tuple<T>>
export function eor(forp, ...args) {
  try {
    if (typeof forp === 'function') return [forp(...args), null]
    return forp.then(data => [data, null])
  } catch (e) {
    return [e, null]
  }
}
