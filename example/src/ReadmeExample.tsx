/**
 * Implements the example shown in the [README.md]{@link ../../README.md}.
 * 
 * The imports are pulled to the top to satisfy the powers that be.
 */

import { RefObject } from 'react'
import { createOrderedValues } from 'react-document-order'
import React from 'react'
import { useState } from 'react'
import { useRef } from 'react'
import { SyntheticEvent } from 'react'

// Start by calling `createOrderedValues()` to create a document-ordered collection.

const MyCollection = createOrderedValues<RefObject<HTMLElement>>()

// The `OrderedValues` it returns provides the interface for the library.

export interface OrderedValues<T> {
  Provider: React.FunctionComponent<{}>
  useRegister: (value: T) => void

  useValueAfter: (reference: T) => T | null | undefined
  useValueBefore: (reference: T) => T | null | undefined
  useFirst: () => T | null
  useLast: () => T | null
}

// Use a `Provider` around your overall collection.

export default function ReadmeExample() {
  return (
    <MyCollection.Provider>
      <MyFormContent />
    </MyCollection.Provider>
  )
}

// The library assumes that controls are always added at the end of their nearest `Provider` ancestor,
// so also put a `Provider` around any section where items might get dynamically added to your collection.

function MyFormContent() {
  const [email, setEmail] = useState("")
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <MyInput label="Name" />
      <MyInput label="Email Address" onChange={setEmail} />
      <MyCollection.Provider>
        {email.endsWith("@example.com") && <MyInput label="Position at Example Corp." />}
      </MyCollection.Provider>
      <MyInput label="Favourite Fruit" />
    </div>
  )
}

// Add elements to your collection by calling `register()`.

function MyInput({ label, onChange }: { label: string, onChange?: (value: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  MyCollection.useRegister(ref)
  return (
    <input
      placeholder={label}
      style={{maxWidth: "20em", margin: "0.2em"}}
      onChange={onChange && (e => onChange(e.target.value))}
      ref={ref}
      {...useUpDownBehaviour(ref)}
    />
  )
}

// Then you can use the other functions on `OrderedValues` to your advantage.

const useUpDownBehaviour = (ref: RefObject<HTMLElement>) => {
  const previous = MyCollection.useValueBefore(ref)
  const next = MyCollection.useValueAfter(ref)
  return {
    onKeyDownCapture: (e: SyntheticEvent<HTMLElement, KeyboardEvent>) => {
      if (e.nativeEvent.key === "ArrowUp") {
        e.preventDefault();
        previous?.current?.focus()
      } else if (e.nativeEvent.key === "ArrowDown") {
        e.preventDefault();
        next?.current?.focus()
      }
    }
  }
}
