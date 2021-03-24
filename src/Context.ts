const contextSignifier = Symbol('OrderedValues Context signifier')

export type Node<T> = T | Context<T>

export interface Context<T> {
  readonly [contextSignifier]: undefined
  readonly nodes: Node<T>[]

  parent: Context<T> | null

  registerChange: React.Dispatch<unknown>
}

export function createContext<T>(
  registerChange: React.Dispatch<unknown>,
): Context<T> {
  return {
    [contextSignifier]: undefined,
    nodes: [],
    parent: null,
    registerChange,
  }
}

export function isContext<T>(node: Node<T>): node is Context<T> {
  return contextSignifier in node
}
