import { Context, isContext } from './Context'

export function firstValue<T>(
  context: Context<T>,
  startIndex: number,
): T | null {
  while (startIndex < context.nodes.length) {
    const node = context.nodes[startIndex]
    const result = isContext(node) ? firstValue(node, 0) : node
    if (result !== null && result !== undefined) return result
    ++startIndex
  }
  return null
}

export function lastValue<T>(context: Context<T>, length: number): T | null {
  while (--length >= 0) {
    const node = context.nodes[length]
    const result = isContext(node) ? lastValue(node, node.nodes.length) : node
    if (result !== null && result !== undefined) return result
  }
  return null
}

export function firstValueAfterReference<T>(
  context: Context<T>,
  reference: T,
): T | null | undefined {
  for (let i = 0; i < context.nodes.length; i++) {
    const node = context.nodes[i]
    if (isContext(node)) {
      const result = firstValueAfterReference(node, reference)
      if (result === undefined) continue
      if (result !== null) return result
    } else if (node !== reference) {
      continue
    }
    return firstValue(context, i + 1)
  }
  return undefined
}

export function firstValueBeforeReference<T>(
  context: Context<T>,
  reference: T,
): T | null | undefined {
  for (let i = context.nodes.length - 1; i >= 0; i--) {
    const node = context.nodes[i]
    if (isContext(node)) {
      const result = firstValueBeforeReference(node, reference)
      if (result === undefined) continue
      if (result !== null) return result
    } else if (node !== reference) {
      continue
    }
    return lastValue(context, i)
  }
  return undefined
}
