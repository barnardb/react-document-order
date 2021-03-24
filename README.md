# react-document-order

> Allows React components to contribute to a list that is maintained in the document order of those components. Can be used for example to construct forms with dynamic nested components with rich linking behaviours between neighbouring controls in the sequencial document order rather than in control mount order. Works with standard React for the Web, and with React Native.

[![NPM](https://img.shields.io/npm/v/react-document-order.svg)](https://www.npmjs.com/package/react-document-order)


## Installation

```bash
npm install --save react-document-order
```


## Usage

Start by calling `createOrderedValues()` to create a document-ordered collection.

```tsx
import { RefObject } from 'react'
import { createOrderedValues } from 'react-document-order'

const MyCollection = createOrderedValues<RefObject<HTMLElement>>()
```

The `OrderedValues` it returns provides the interface for the library.

```tsx
import React from 'react'

export interface OrderedValues<T> {
  Provider: React.FunctionComponent<{}>
  useRegister: (value: T) => void

  useValueAfter: (reference: T) => T | null | undefined
  useValueBefore: (reference: T) => T | null | undefined
  useFirst: () => T | null
  useLast: () => T | null
}
```

Use a `Provider` around your overall collection.

```tsx
default export function ReadmeExample() {
  return (
    <MyCollection.Provider>
      <MyFormContent/>
    </MyCollection.Provider>
  )
}
```

The library assumes that controls are always added at the end of their nearest `Provider` ancestor,
so also put a `Provider` around any section where items might get dynamically added to your collection.

```tsx
import { useState } from 'react'

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
```

Add elements to your collection by calling `register()`.

```tsx
import { useRef } from 'react'

function MyInput({ label, onChange }: { label: string, onChange?: (value: string) => void }) {
  const ref = useRef<HTMLInputElement>(null)
  MyCollection.useRegister(ref)
  return (
    <input
      placeholder={label}
      onChange={onChange && (e => onChange(e.target.value))}
      ref={ref}
      {...useUpDownBehaviour(ref)}
    />
  )
}
```

Then you can use the other functions on `OrderedValues` to your advantage.

```tsx
import { SyntheticEvent } from 'react'

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
```


## Examples

The [`ReadmeExample`](example/src/ReadmeExample.tsx) is simply the code from the previous section.

The [`TrivialExample`](example/src/TrivialExample.tsx) is a minimalistic demonstration that collections plain strings, as opposed to the HTML element refs used in the other examples.

[`ToDoList`](example/src/ToDoList.tsx) shows a fully dynamic hierarchical demo (with appaling an appaling user experience—decent UX is left as an exercise for the reader).

They are all displayed in the example app, which you can run from the root directory like this:

```bash
yarn build && cd example && yarn install && yarn start
```


## Alternatives

The DOM provides a [`compareDocumentPosition()`](https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition) method that allows you to understand where two mounted elements
stand with respect to one another in the document. This could be used to provide a simpler API, by dispensing
with the restriction that elements can only by added at the end of a `Provider` context, thus making everything
work with a single Provider. This would be a DOM-only solution though, so it wouldn't work for React Native.
As a React Native use case was the motivator for this library, this approach wasn't taken.

Are there other libraries in existence or implementation approaches we could take?
Let me know so I can explore them and list them here as appropriate.


## Invitation to Contribute

This library arose out of a strong urge to have a clean implementation of field-to-field linking behaviour
in a React Native application, and I need to get back to implementing that application. Meanwhile, the
implementation currently has some shortcomings, and there are some obvious operations to implement that
I don't currently have a need for and aren't yet implemented. There are also some API improvements that could be made.

Your GitHub tickets and pull requests are welcome :)
