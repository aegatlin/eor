type Tuple<T> = [null, T] | [Error, null]
export function eor<T>(f: (...args) => T, ...args): Tuple<T>
export function eor<T>(p: Promise<T>): Promise<Tuple<T>>
export function eor(forp, ...args) {
  if (typeof forp !== 'function') {
    return forp.then(data => [null, data]).catch(e => [e, null])
  }

  try {
    return [null, forp(...args)]
  } catch (e) {
    return [e, null]
  }
}
