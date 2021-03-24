import React, { useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import { Context, createContext } from './Context'
import {
  firstValue,
  firstValueAfterReference,
  firstValueBeforeReference,
  lastValue,
} from './operations'

export interface OrderedValues<T> {
  Provider: React.FunctionComponent<{}>
  useRegister: (value: T) => void

  useValueAfter: (reference: T) => T | null | undefined
  useValueBefore: (reference: T) => T | null | undefined
  useFirst: () => T | null
  useLast: () => T | null
}

function nonNull<T>(context: Context<T> | null): Context<T> {
  if (!context)
    throw new Error(
      "OrderedValues hooks can only be used within one of the OrderedValues's <Context/>s",
    )
  return context
}

function registerChangeOnRoot(context: Context<unknown>): void {
  context.parent
    ? registerChangeOnRoot(context.parent)
    : context.registerChange(undefined)
}

export function createOrderedValues<T>(): Readonly<
  OrderedValues<NonNullable<T>>
> {
  const reactContext = React.createContext<Context<NonNullable<T>> | null>(null)
  const changeIndicatorReactContext = React.createContext<unknown>(null)

  function useRoot(): Context<NonNullable<T>> {
    let context = nonNull(useContext(reactContext))
    while (context.parent) context = context.parent
    return context
  }

  return {
    Provider: function OrderedValuesProvider({ children }) {
      const [changeIndicator, registerChange] = useReducer(
        (counter: number) => ++counter,
        0,
      )

      const parent = useContext(reactContext)
      const context = useMemo<Context<NonNullable<T>>>(
        () => createContext(registerChange),
        [],
      )

      // Add context to parent before children are mounted
      useMemo(() => {
        if (!parent) return
        context.parent = parent
        parent.nodes.push(context)
      }, [parent])

      useLayoutEffect(() => {
        if (!parent) return
        registerChangeOnRoot(context)
        return () => {
          // Remove context from parent
          const i = parent.nodes.indexOf(context)
          i > -1 && parent.nodes.splice(i, 1)
          if (context.parent === parent) context.parent = null
        }
      }, [parent])

      return (
        <reactContext.Provider value={context}>
          {parent ? (
            children
          ) : (
            <changeIndicatorReactContext.Provider value={changeIndicator}>
              {children}
            </changeIndicatorReactContext.Provider>
          )}
        </reactContext.Provider>
      )
    },

    useRegister: function useRegister(t: NonNullable<T>): void {
      const context = nonNull(useContext(reactContext))
      useMemo(() => {
        // Register ourself with the context
        context.nodes.push(t)
      }, [context, t])
      useLayoutEffect(() => {
        registerChangeOnRoot(context)
        return () => {
          // Remove ourself from the context
          for (let i = context.nodes.length - 1; i >= 0; --i)
            if (context.nodes[i] === t) {
              context.nodes.splice(i, 1)
              registerChangeOnRoot(context)
              return
            }
        }
      }, [context, t])
    },

    useValueAfter: function useValueAfter(
      reference: NonNullable<T>,
    ): NonNullable<T> | null | undefined {
      useContext(changeIndicatorReactContext)
      return firstValueAfterReference(useRoot(), reference)
    },

    useValueBefore: function useValueBefore(
      reference: NonNullable<T>,
    ): NonNullable<T> | null | undefined {
      useContext(changeIndicatorReactContext)
      return firstValueBeforeReference(useRoot(), reference)
    },

    useFirst: function useFirst(): NonNullable<T> | null {
      useContext(changeIndicatorReactContext)
      return firstValue(useRoot(), 0)
    },

    useLast: function useLast(): NonNullable<T> | null {
      useContext(changeIndicatorReactContext)
      const root = useRoot()
      return lastValue(root, root.nodes.length)
    },
  }
}
