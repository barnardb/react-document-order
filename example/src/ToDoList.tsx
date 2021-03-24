import React, { RefObject, SyntheticEvent, useRef, useState } from 'react'
import { createOrderedValues } from 'react-document-order'

const ControlOrder = createOrderedValues<RefObject<HTMLElement>>()

const useUpDownBehaviour = (ref: RefObject<HTMLElement>) => {
  const first = ControlOrder.useFirst()
  const previous = ControlOrder.useValueBefore(ref)
  const next = ControlOrder.useValueAfter(ref)
  const last = ControlOrder.useLast()
  return {
    onKeyDownCapture: (e: SyntheticEvent<HTMLElement, KeyboardEvent>) => {
      if (e.nativeEvent.key === "ArrowUp") {
        e.preventDefault();
        (e.nativeEvent.metaKey ? first : previous)?.current?.focus()
      } else if (e.nativeEvent.key === "ArrowDown") {
        e.preventDefault();
        (e.nativeEvent.metaKey ? last : next)?.current?.focus()
      }
    }
  }
}

const Item = ({ onRemove }: { onRemove: () => void }) => {
  const ref = useRef<HTMLInputElement>(null)
  ControlOrder.useRegister(ref)
  return <div>
    <div style={{ flexDirection: "row" }}>
      <input ref={ref} {...useUpDownBehaviour(ref)} />
      <button onClick={onRemove}>x</button>
    </div>
    <div style={{ marginLeft: "5px", borderLeft: "5px solid lightgray", paddingLeft: "5px" }}>
      <List addLabel="Add sub-item" />
    </div>
  </div>
}

const AddButton = ({ label, onClick }: { label: string, onClick: () => void }) => {
  const ref = useRef<HTMLButtonElement>(null)
  ControlOrder.useRegister(ref)
  return <button ref={ref} onClick={onClick} {...useUpDownBehaviour(ref)}>{label}</button>
}

const List = ({ addLabel }: { addLabel: string }) => {
  const [{ ids, nextId }, setState] = useState({ ids: [] as ReadonlyArray<number>, nextId: 0 })
  return (
    <div style={{ flexDirection: "column" }}>
      <ControlOrder.Provider>
        {ids.map((id, i) =>
          <div key={id} style={{ flexDirection: "row" }}>
            <Item onRemove={() => setState({ ids: [...ids.slice(0, i), ...ids.slice(i + 1)], nextId })} />
          </div>
        )}
      </ControlOrder.Provider>
      <AddButton label={addLabel} onClick={() => setState({ ids: [...ids, nextId], nextId: nextId + 1 })} />
    </div>
  )
}

export default function ToDoList() {
  return (
    <ControlOrder.Provider>
      <p>
        Squint hard enough, and it's a hierarchical to-do list UI.
      </p>
      <p>
        Anyway, hit a few add buttons in various orders, and then see how you can use the arrow kets to
        navigate up and down among the text inputs and add-buttons in document order.
        Use the meta key (command key on MacOS) to move to the top or bottom of the controls in the list.
      </p>
      <List addLabel="Add top-level item" />
    </ControlOrder.Provider>
  )
}
