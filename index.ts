// The order of the function overloads is important! Do not change.
export function eor<R>(fp: () => Promise<R>): Promise<[null, R] | [any, null]>
export function eor<R>(f: () => R): [null, R] | [any, null]
export function eor<R>(p: Promise<R>): Promise<[null, R] | [any, null]>
export function eor<R>(
  x: (() => R) | (() => Promise<R>) | Promise<R>
): ([null, R] | [any, null]) | Promise<[null, R] | [any, null]> {
  if (x instanceof Promise) return rora(x)

  try {
    const y = x()
    if (y instanceof Promise) return rora(y)
    return [null, y]
  } catch (e) {
    return [e, null]
  }
}

// The order of the function overloads is important! Do not change.
export function nor<R>(fp: () => Promise<R>): Promise<R | null>
export function nor<R>(f: () => R): R | null
export function nor<R>(p: Promise<R>): Promise<R | null>
export function nor<R>(
  x: (() => R) | (() => Promise<R>) | Promise<R>
): (R | null) | Promise<R | null> {
  if (x instanceof Promise) return rorn(x)

  try {
    const y = x()
    if (y instanceof Promise) return rorn(y)
    return y
  } catch {
    return null
  }
}

const rorn = <R>(p: Promise<R>): Promise<R | null> =>
  p.then((r) => r).catch(() => null)
const rora = async <R>(p: Promise<R>): Promise<[null, R] | [any, null]> => {
  try {
    const r = await p
    return [null, r]
  } catch (e) {
    return [e, null]
  }
}
